import {
  deliveryAddress,
  ORDER_FORM_WITH_DIFFERENT_SLAS_BETWEEN_LOGISTICS_INFO,
  ORDER_FORM_WITH_DUPLICATED_SLAS_WITH_DIFFERENT_DELIVERY_IDS,
  ORDER_FORM_WITH_EMPTY_LOGISTICS_INFO,
  ORDER_FORM_WITH_EMPTY_SHIPPING_DATA,
  ORDER_FORM_WITH_PICKUPS,
  ORDER_FORM_WITH_SCHEDULED_DELIVERY,
  ORDER_FORM_WITH_SCHEDULED_DELIVERY_AND_PICKUPS,
  ORDER_FORM_WITH_UNAVAILABLE_ITEM_LOGISTICS_INFO,
  clients,
} from '../__fixtures__/shipping'
import { getShippingInfo } from '../utils/shipping'

describe('Shipping Resolvers', () => {
  describe('getShippingInfo', () => {
    it('should get shipping info handling empty shippingData', async () => {
      const expectedResult = {
        availableAddresses: [],
        countries: [],
        deliveryOptions: [],
        selectedAddress: undefined,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_EMPTY_SHIPPING_DATA,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info handling empty logisticsInfo', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_EMPTY_LOGISTICS_INFO,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info removing pickup point SLAs', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 100,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({ clients, orderForm: ORDER_FORM_WITH_PICKUPS })
      ).toEqual(expectedResult)
    })

    it('should get shipping info removing scheduled delivery SLAs', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 100,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_SCHEDULED_DELIVERY,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info removing scheduled delivery and pickup SLAs', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 100,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_SCHEDULED_DELIVERY_AND_PICKUPS,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info removing SLAs which does not exist in all logisticsInfo', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 200,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_DIFFERENT_SLAS_BETWEEN_LOGISTICS_INFO,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info removing duplicated SLAs which have different delivery ids', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 200,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_DUPLICATED_SLAS_WITH_DIFFERENT_DELIVERY_IDS,
        })
      ).toEqual(expectedResult)
    })

    it('should get shipping info without empty deliveryOptions', async () => {
      const expectedResult = {
        availableAddresses: [deliveryAddress],
        countries: ['BRA', 'GBR'],
        deliveryOptions: [
          {
            estimate: '1db',
            id: 'delivery-SLA',
            isSelected: true,
            price: 100,
          },
        ],
        selectedAddress: deliveryAddress,
      }

      expect(
        await getShippingInfo({
          clients,
          orderForm: ORDER_FORM_WITH_UNAVAILABLE_ITEM_LOGISTICS_INFO,
        })
      ).toEqual(expectedResult)
    })
  })
})
