import chalk from 'chalk'
import fs from 'fs'
import path from 'path'
import { URL } from 'url'
import ncp from 'ncp'
import { promisify } from 'util'
import Listr from 'listr'
import { createDatabase } from './sql'
import appConfig from './app.config.js'
import cloneCMS from './cloneCMS'
import { deleteFolderRecursive } from './helpers'

const access = promisify(fs.access)

function copyAPIFiles (options) {
  if (fs.existsSync(`${options.targetDirectory}${options.project ? `/${options.project}` : ''}/api`)){
    deleteFolderRecursive(`${options.targetDirectory}${options.project ? `/${options.project}` : ''}/api`)
  }

  return cloneCMS(options)
}

export default async function createCMS (options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  try {
    await access(`${options.targetDirectory}`, fs.constants.R_OK)
  } catch (err) {
    console.error(`%s Error creating database: ${err}`, chalk.red.bold('ERROR'))
    process.exit(1)
  }

  console.log('Creating database');

  const tasks = new Listr([
    {
      title: 'Copy headless API files',
      task: () => copyAPIFiles(options)
    },
    {
      title: 'Create MYSQL database',
      task: () => createDatabase(options)
    },
    {
      title: 'Configure API',
      task: () => htaccessFile(options)
    },
    {
      title: 'Configure app',
      task: () => configureProject(options)
    }
  ])

  await tasks.run()

  return true
}

async function configureProject (options) {
  return fs.writeFile(
    `${options.targetDirectory}${options.project ? `/${options.project}` : ''}/app/app.config.json`,
    JSON.stringify(appConfig(options), null, 4),
    'utf8',
    err => err ? console.log(`%s Issue writing the app.config.json file:  ${err}`, chalk.red.bold('ERROR')) : ''
  )
}

async function htaccessFile (options) {
  const markup = `
    # BEGIN WordPress
    <IfModule mod_rewrite.c>
    RewriteEngine On
    RewriteBase /
    RewriteRule ^index\.php$ - [L]
    RewriteCond %{REQUEST_FILENAME} !-f
    RewriteCond %{REQUEST_FILENAME} !-d
    RewriteRule . /index.php [L]
    </IfModule>

    SetEnv DB_NAME ${options.databaseName}
    SetEnv DB_USER ${options.databaseUser}
    SetEnv DB_PASSWORD ${options.databasePassword}
    SetEnv DB_HOST ${options.databaseHost}

    # END WordPress
  `

  fs.writeFile(
    `${options.targetDirectory}${options.project ? `/${options.project}` : ''}/api/.htaccess`,
    markup,
    'utf8',
    err => err ? console.log(`%s Issue writing the .htaccess file:  ${err}`, chalk.red.bold('ERROR')) : ''
  )

  console.error(
    `%s Success! now add ${options.cmsUrl} to MAMP PRO and then visit ${options.cmsUrl}/wp-admin`,
    chalk.green.bold('DONE')
  )
}
