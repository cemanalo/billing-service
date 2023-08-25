import DatabaseConnection from '../database/connection'
import BillingEntity from '../entities/billing_entity'

export default class BillingRepository {
  constructor(private dbConn = new DatabaseConnection()) {}

  async insert(billing: BillingEntity) {
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
    const client = await this.dbConn.connect()

    try {
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
      return query
    } finally {
      await client.end()
    }
  }
}
