import chalk from 'chalk'
import fs from 'fs'
import ncp from 'ncp'
import path from 'path'
import { promisify } from 'util'
import { URL } from 'url'
import execa from 'execa'
import Listr from 'listr'
import { projectInstall } from 'pkg-install'
import { createDatabase } from './sql'
import npm from 'npm-programmatic'
import cloneTemplate from './cloneTemplate'

const access = promisify(fs.access)

async function copyTemplateFiles (options) {
    return await cloneTemplate(options)
}

async function initGit (options) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  })

  if (result.failed) {
    return Promise.reject(new Error('Failed to initialize git'))
  }

  return true
}

export default async function createProject (options) {
  options = {
    ...options,
    targetDirectory: options.targetDirectory || process.cwd(),
  }

  try {
    await access(`${options.targetDirectory}`, fs.constants.R_OK)
  } catch (err) {
    console.error('%s Invalid template name', chalk.red.bold('ERROR'))
    process.exit(1)
  }

  console.log('Copying template files');

  const tasks = new Listr([
    {
      title: 'Copy frontend project files',
      task: () => copyTemplateFiles(options)
    },
    {
      title: 'initialize git',
      task: () => initGit(options),
      enabled: () => options.git
    },
    {
      title: 'Install dependencies',
      task: () => npm.install(`${options.targetDirectory}/frontend`, {
        cwd: `${options.targetDirectory}/frontend`,
        save: true
      }),
      skip: () =>!options.runInstall
        ? 'Pass --install to automatically install dependencies'
        : undefined
    }
  ])

  await tasks.run()
  console.log('%s Project frontend is created', chalk.green.bold('DONE'))

  return true
}
