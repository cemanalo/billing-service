import BillingEntity from './entities/billing_entity'
import BillingRepository from './repositories/billing_repository'

async function test() {
  const repo = new BillingRepository()
  const billing = new BillingEntity(
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
  const result = await repo.insert(billing)

  console.log(result)
}

test()
