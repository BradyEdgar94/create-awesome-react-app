const Git = require('nodegit')

export default async function cloneTemplate (options) {
  function handleGitUrl (template) {
    let url = 'https://github.com/BradyEdgar94/react-nextjs-boilerplate.git'

    switch (template) {
      case 'nextjs':
        url = 'https://github.com/BradyEdgar94/react-nextjs-boilerplate.git'
        break
      default :
        url = 'https://github.com/BradyEdgar94/react-nextjs-boilerplate.git'
        break
    }

    return url
  }

  await Git.Clone(
    handleGitUrl(options.template.toLowerCase()),
    `${options.targetDirectory}/frontend`
  )
    .catch(err => {
      if (err) {
        throw err
      }
    })

    return
}
