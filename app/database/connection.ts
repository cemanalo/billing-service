import { Client, Configuration } from 'ts-postgres'

export default class DatabaseConnection {
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
