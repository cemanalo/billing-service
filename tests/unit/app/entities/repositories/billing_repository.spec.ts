import DBConnection from '../../../../../app/entities/database/connection'
import { BillingRepositoryImpl } from '../../../../../app/entities/repositories/billing_repository'
import BillingDTO from '../../../../../app/entities/dto/billing_dto'

const mockConnect = jest.fn()
const mockQuery = jest.fn()
const mockDbConnection: DBConnection = {
  connect: mockConnect,
}

describe('entities>billing repository', () => {
  const billingDto = new BillingDTO(
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

  beforeAll(() => {
    mockConnect.mockResolvedValue({
      query: mockQuery,
      end: jest.fn(),
    })
  })

  afterAll(() => {
    mockConnect.mockReset()
  })

  describe('succes', () => {
    let billingRepository: BillingRepositoryImpl

    beforeAll(() => {
      mockQuery.mockResolvedValue({
        status: 'success',
      })
      billingRepository = new BillingRepositoryImpl(mockDbConnection)
    })

    afterAll(() => {
      mockQuery.mockClear()
    })

    it('should return a success transaction', async () => {
      const result = await billingRepository.insert(billingDto)

      expect(result).toBe('success')
    })
  })

  describe('fail', () => {
    let billingRepository: BillingRepositoryImpl
    beforeAll(() => {
      mockQuery.mockRejectedValue('failed to insert billing')
      billingRepository = new BillingRepositoryImpl(mockDbConnection)
    })

    it('should throw error', async () => {
      await billingRepository.insert(billingDto).catch((e) => {
        expect(e).toBe('failed to insert billing')
      })
    })
  })
})
