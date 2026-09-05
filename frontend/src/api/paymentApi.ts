import axiosInstance from './axiosInstance'
import type { PaymentOrder } from '../types/payment.types'

export const createPaymentOrderApi = async (bookingId: string): Promise<PaymentOrder> => {
  const response = await axiosInstance.post('/payments/order', { bookingId })
  return response.data.data || response.data
}
