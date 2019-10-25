import clone from 'git-clone'

export default function cloneTemplate (options) {
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

  clone(
    handleGitUrl(options.template.toLowerCase()),
    `${options.targetDirectory}/app`
  )

  return
}
