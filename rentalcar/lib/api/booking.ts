import { api } from "../axios";

export interface BookingRequest {
  name: string;
  email: string;
  comment: string;
}

export const createBookingRequest = async (
  carId: string,
  bookingData: BookingRequest,
) => {
  const { data } = await api.post(
    `/cars/${carId}/booking-requests`,
    bookingData,
  );

  return data;
};
