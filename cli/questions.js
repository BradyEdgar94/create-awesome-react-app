import inquirer from 'inquirer'

export async function promoptForMissingOptions (options) {
  const defaultTemplate = 'nextjs'
  const defaultCMS = 'wordpress'

  if (options.skipPrompts) {
    return {
      ...options,
      template: options.template || defaultTemplate,
      cms: options.cms || defaultCMS
    }
  }

  const questions = []
  if (!options.template) {
    questions.push({
      type: 'list',
      name: 'template',
      message: 'Please choose which framework to use for the frontend',
      choices: ['nextjs'],
      default: defaultTemplate,
    })
  }

  questions.push({
    type: 'list',
    name: 'cms',
    message: 'Please choose which framework to use for the headless CMS',
    choices: ['wordpress'],
    default: defaultCMS,
  })

  if (!options.git) {
    questions.push({
      type: 'confirm',
      name: 'git',
      message: 'Do you want git?',
      default: false,
    })
  }

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    template: options.template || answers.template,
    git: options.git || answers.git,
    cms: options.cms || answers.cms,
  }
}

export async function promoptForCMSConfiguration (options) {

  const questions = []

  questions.push({
    type: 'input',
    name: 'cmsUrl',
    message: 'Please enter the url for the CMS',
    default: 'http://api.ferox.local',
  })

  questions.push({
    type: 'input',
    name: 'databaseHost',
    message: 'Please enter the MYSQL host',
    default: '127.0.0.1',
  })

  questions.push({
    type: 'input',
    name: 'databaseUser',
    message: 'Please enter the MYSQL user',
    default: 'root',
  })

  questions.push({
    type: 'input',
    name: 'databasePassword',
    message: 'Please enter a database password',
    default: 'root',
  })

  questions.push({
    type: 'input',
    name: 'databaseName',
    message: 'Please enter a database name',
    default: 'forex_db',
  })

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    databaseUser: options.databaseUser || answers.databaseUser,
    databaseHost: options.databaseHost || answers.databaseHost,
    databasePassword: options.databasePassword || answers.databasePassword,
    databaseName: options.databaseName || answers.databaseName,
    cmsUrl: options.cmsUrl || answers.cmsUrl,
  }
}


export async function promoptForMAMPUpdate (options) {
  const questions = []

  questions.push({
    type: 'comfirm',
    name: 'mampUpdated',
    message: `Add ${options.cmsUrl} to MAMP PRO`,
    default: 'done'
  })

  questions.push({
    type: 'comfirm',
    name: 'runScript',
    message: `Now start the React app by entering the '/frontend' directory and running the 'npm run dev' command, you can also run tests using Jest with the 'npm run test' command`,
    default: 'done'
  })

  const answers = await inquirer.prompt(questions)

  return {
    ...options,
    mampUpdated: options.mampUpdated || answers.mampUpdated,
  }
}