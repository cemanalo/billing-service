import { BillingModel } from '../database/models/billing_model'

export default class BillingDTO {
  constructor(
    public accountId: number,
    public periodCoveredFrom: Date,
    public periodCoveredTo: Date,
    public connectionType: string,
    public meterId: number,
    public previousReading: number,
    public presentReading: number,
    public consumption: number,
    public currentMonthBillCent: number,
    public dueDate: Date,
    public id?: number,
  ) {}

  static mapDataModelToEntity(dataModel: BillingModel): BillingDTO {
    const {
      billing_id,
      fk_account_id,
      period_covered_from,
      period_covered_to,
      connection_type,
      meter_id,
      previous_reading,
      present_reading,
      consumption,
      current_month_bill_cent,
      due_date,
    } = dataModel

    return new BillingDTO(
      fk_account_id,
      period_covered_from,
      period_covered_to,
      connection_type,
      meter_id,
      previous_reading,
      present_reading,
      consumption,
      current_month_bill_cent,
      due_date,
      billing_id,
    )
  }
}
