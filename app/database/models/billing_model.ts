export type BillingModel = {
  billing_id: number
  fk_account_id: number
  period_covered_from: Date
  period_covered_to: Date
  connection_type: string
  meter_id: number
  previous_reading: number
  present_reading: number
  consumption: number
  current_month_bill_cent: number
  due_date: Date
}
