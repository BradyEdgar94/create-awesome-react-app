import chalk from 'chalk'
import fs from 'fs'

export async function createDatabase (options) {
  const sql = fs.readFileSync(`${options.targetDirectory}/api/default.sql`).toString()

  let connection = {
    client: 'mysql',
    connection: {
      host: options.databaseHost,
      user: options.databaseUser,
      password: options.databasePassword,
      multipleStatements: true
    }
  }

  let knex = require('knex')(connection)

  knex.raw(`CREATE DATABASE ${options.databaseName}`)
    .then(() => {
      knex.destroy()

      connection.connection.database = options.databaseName
      knex = require('knex')(connection)

      knex.raw(sql)
      .then(() => knex.raw(`UPDATE wp_options SET option_value = replace(option_value, 'http://api.rmc.local', '${options.cmsUrl}') WHERE option_name = 'home' OR option_name = 'siteurl'`))
      .then(() => knex.raw(`UPDATE wp_posts SET guid = replace(guid, 'http://api.rmc.local', '${options.cmsUrl}');`))
      .then(() => knex.raw(`UPDATE wp_posts SET post_content = replace(post_content, 'http://api.rmc.local', '${options.cmsUrl}');`))
      .then(() => knex.raw(`UPDATE wp_postmeta SET meta_value = replace(meta_value,'http://api.rmc.local', '${options.cmsUrl}');`))
      .then(() => knex.destroy())
    })
}
