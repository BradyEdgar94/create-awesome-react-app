export default ({ cmsUrl }) => ({
  API_HOSTS: {
    development: cmsUrl,
    staging: "[API STAGING DOMAIN]",
    production: "[API PRODUCTION DOMAIN]"
  },
  SEO: {
    title: "Hello World",
    desction: "Hello World",
    image: "/public/images/share.png"
  }
})
