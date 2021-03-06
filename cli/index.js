import arg from 'arg'
import createTemplate from './createTemplate'
import createCMS from './createCMS'
import { promoptForMissingOptions, promoptForCMSConfiguration, promoptForMAMPUpdate } from './questions'

function parseArgumentsIntoOptions (rawArgs) {
  const args = arg(
    {
      '--git': Boolean,
      '--yes': Boolean,
      '--install': Boolean,
      '-g': '--git',
      '-y': '--yes',
      '-i': '--install'
    }, {
      argv: rawArgs.slice(2),
    }
  )

  return {
    skipPrompts: args['--yes'] || false,
    git: args['--git'] || false,
    project: args._[0] || undefined,
    runInstall: args['--install'] || true,
    template: args['--template'] || undefined,
  }
}

export async function cli (args) {
  let options = parseArgumentsIntoOptions(args)
  options = await promoptForMissingOptions(options)
  await createTemplate(options)
  options = await promoptForCMSConfiguration(options)
  await createCMS(options)
  options = await promoptForMAMPUpdate(options)
}
