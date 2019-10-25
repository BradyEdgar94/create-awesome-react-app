const Git = require('nodegit')

export default async function cloneCMS (options) {
  function handleGitUrl (template) {
    let url = 'https://github.com/BradyEdgar94/wordpress-headless-cms-next.git'
    switch (template) {
      case 'next':
        url = 'https://github.com/BradyEdgar94/wordpress-headless-cms-next.git'
        break
      default :
        url = 'https://github.com/BradyEdgar94/wordpress-headless-cms-next.git'
        break
    }

    return url
  }

  await Git.Clone(
    handleGitUrl(options.template.toLowerCase()),
    `${options.targetDirectory}/api`
  )
    .catch(err => {
      if (err) {
        throw err
      }
    })

    return
}
