import BillingDTO from "../../entities/dto/billing_dto";
import BillingRepository, { BillingRepositoryImpl } from "../../entities/repositories/billing_repository";
import getLogger from "../../utils/logger";
import BaseInteractor from "../base_interactor";

type AddBillingInput = BillingDTO
type AddBillingOutput = {
  status: 'success' | 'failed'
}

export default class AddBillingInteractor implements BaseInteractor<AddBillingInput, Promise<AddBillingOutput>> {
  private logger = getLogger()

  constructor(private billingRepository?: BillingRepository) {
    this.billingRepository = billingRepository || new BillingRepositoryImpl()
  }

  async execute(billing: AddBillingInput): Promise<AddBillingOutput> {
    try {
      this.logger.info('AddBillingInteractor:execute', billing)
      const result = await this.billingRepository.insert(billing)
      // temporary logic
      if (result.includes('INSERT')) {
        return {
          status: 'success'
        }
      }
      return {
        status: 'failed'
      }
    } catch (err) {
      this.logger.error('AddBillingInteractor:execute:error inserting billing info', err)
    }
  }
}
