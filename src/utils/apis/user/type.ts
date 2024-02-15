import * as z from "zod";
const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const userSchema = z.object({
  full_name: z.string().min(1, { message: "Enter your name" }),
  phone_number: z.string().min(1, { message: "Enter your name" }),
  email: z.string().email("Enter a valid email").min(1, { message: "Enter email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" })
    .optional()
    .or(z.literal("")),
  image: z
    .any()
    .refine((files) => files[0].size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png formats are supported"
    )
    .optional()
    .or(z.literal("")),
  role: z.string().optional(),
});
export type IUserType = z.infer<typeof userSchema>;
export interface GetTours {
  id: number;
  city_id: number;
  user_id: number;
  tour_name: string;
  description: string;
  image: string;
  thumbnail: string;
  address: string;
  latitude: number;
  longitude: number;
  created_at: string;
  updated_at: string;
  city: CityRes;
}

export interface CityRes {
  id: number;
  city_name: string;
  image: string;
  thumbnail: string;
}

export interface GetCity {
  id: 16;
  city_name: string;
  description: string;
  image: string;
  thumbnail: string;
  created_at: string;
  updated_at: string;
}

export interface GetPackages {
  id: number;
  tour_id: 1;
  package_name: string;
  price: 20000;
  jumlah_tiket: 3;
  benefits: IBenefits[];
}

export interface IBenefits {
  id: number;
  package_id: number;
  benefit: string;
}

export interface ResBooking {
  id: string;
  gross_amount: number;
  status: string;
  tour: {
    tour_name: string;
  };
}

export interface getBookingDetail {
  booking_id: string;
  full_name: string;
  greeting: string;
  booking_date: string;
  va_number: string;
  bank: string;
  gross_amount: number;
  quantity: number;
  tour: {
    tour_name: string;
    address: string;
    image: string;
  };
  package: {
    package_name: string;
  };
  voucher: {
    voucher_name: string;
  };
}

export interface GetVoucher {
  id: number;
  name: string;
  code: string;
  description: string;
  discount_value: number;
  expired_voucher: string;
}

export const bookingSchema = z.object({
  tour_id: z.number({ required_error: "tour id is required" }),
  package_id: z.number({ required_error: "package id tiket is required" }),
  voucher_id: z.number({ required_error: "voucher is required" }).optional(),
  bank: z.string().min(1, { message: "Enter your bank " }),
  phone_number: z.string().min(1, { message: "Enter your phone number" }),
  greeting: z.string().min(1, { message: "choose greetings" }),
  full_name: z.string().min(1, { message: "choose greetings" }),
  email: z.string().min(1, { message: "choose greetings" }),
  quantity: z.number({ required_error: "quantity is required" }),
});
export type IBookingType = z.infer<typeof bookingSchema>;