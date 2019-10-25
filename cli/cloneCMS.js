import clone from 'git-clone'

export default function cloneCMS (options) {
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

  return new Promise((resolve, reject) => {
    clone(
      handleGitUrl(options.template.toLowerCase()),
      `${options.targetDirectory}/api`
    )

    resolve(true)
  })
}
