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
import { deleteFolderRecursive } from './helpers'

const access = promisify(fs.access)

async function createProjectFolder (options) {
  const project = options.project ? options.project.toLowerCase() : false

  try {
    if (project && !fs.existsSync(project)){
      fs.mkdirSync(project)
    } else if (fs.existsSync(project)) {
      throw err
    }
  } catch (err) {
    console.error(`%s Project ${project} already exist`, chalk.red.bold('ERROR'))
    process.exit(1)
  }

  return project
}

async function copyTemplateFiles (options) {
    if (fs.existsSync(`${options.targetDirectory}${options.project ? `/${options.project}` : ''}/app`)){
      deleteFolderRecursive(`${options.targetDirectory}${options.project ? `/${options.project}` : ''}/app`)
    }

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
    console.error(`%s Cannot write to ${options.targetDirectory}`, chalk.red.bold('ERROR'))
    process.exit(1)
  }

  const tasks = new Listr([
    {
      title: 'Create project',
      task: () => createProjectFolder(options)
    },
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
      task: () => npm.install(`${options.targetDirectory}${options.project ? `/${options.project}` : ''}/app`, {
        cwd: `${options.targetDirectory}${options.project ? `/${options.project}` : ''}/app`,
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
