import BillingDTO from './entities/dto/billing_dto'
import BillingRepository, { BillingRepositoryImpl } from './entities/repositories/billing_repository'

async function test() {
  const repo = new BillingRepositoryImpl()
  const billing = new BillingDTO(
    111111,
    new Date(),
    new Date(),
    'Residential',
    2222222,
    90,
    95,
    5,
    175,
    new Date(),
  )
  console.log('test')
    const result = await repo.insert(billing)

    console.log(result)
}

test()
