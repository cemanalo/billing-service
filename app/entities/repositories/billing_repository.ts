import { Client } from 'ts-postgres'
import getLogger from '../../utils/logger'

import DatabaseConnection from '../database/connection'
import BillingDTO from '../dto/billing_dto'


export default abstract class BillingRepository {
  abstract insert(billing: BillingDTO): Promise<string>
}

export class BillingRepositoryImpl extends BillingRepository {
  constructor(private dbConn = new DatabaseConnection()) {
    super()
  }

  async insert(billing: BillingDTO): Promise<string> {
    const logger = getLogger()

    logger.info('inserting billing info to database')
    const {
      accountId,
      periodCoveredFrom,
      periodCoveredTo,
      connectionType,
      meterId,
      previousReading,
      presentReading,
      consumption,
      currentMonthBillCent,
      dueDate,
    } = billing

    let client: Client

    try {
      client = await this.dbConn.connect()
      const query = await client.query(
        `
        INSERT INTO billing
          (
            fk_account_id,
            period_covered_from,
            period_covered_to,
            connection_type,
            meter_id,
            previous_reading,
            present_reading,
            consumption,
            current_month_bill_cent,
            due_date
          )
        VALUES
          (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10
          )
      `,
        [
          accountId,
          periodCoveredFrom,
          periodCoveredTo,
          connectionType,
          meterId,
          previousReading,
          presentReading,
          consumption,
          currentMonthBillCent,
          dueDate,
        ],
      )

      return query.status
    } catch(err) {
      logger.error([`Error inserting billing info`, err])
      throw err
    }
    finally {
      logger.info('client end')
      if (client) {
        await client.end()
      }
    }
  }
}
