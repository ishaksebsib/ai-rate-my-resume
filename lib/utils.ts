import { AxiosError } from "axios";
import { type ClassValue, clsx } from "clsx";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const handleAxiosError = (
  error: AxiosError | any,
  fallBackMessage: string,
): string => {
  let message = fallBackMessage;

  if (error.response) {
    message = error.response.data.detail;
    if (message) {
      return message;
    }
  } else if (error.request) {
    message = "No response received from server";
  }

  return message;
};
