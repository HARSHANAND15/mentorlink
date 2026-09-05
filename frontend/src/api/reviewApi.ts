import axiosInstance from './axiosInstance'

export const createReviewApi = async (
  mentorId: string,
  data: { rating: number; comment: string },
) => {
  const response = await axiosInstance.post(`/reviews/${mentorId}`, data)
  return response.data.data || response.data
}
