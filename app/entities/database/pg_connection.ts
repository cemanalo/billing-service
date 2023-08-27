import { Client, Configuration } from 'ts-postgres'
import DBConnection from './connection'

export default class PgConnection implements DBConnection {
  constructor() {}

  async connect(): Promise<Client> {
    const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_DATABASE } = process.env
    const config: Configuration = {
      host: DB_HOST,
      user: DB_USERNAME,
      password: DB_PASSWORD,
      database: DB_DATABASE,
    }
    const client = new Client(config)
    await client.connect()

    return client
  }
}
