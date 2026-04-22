import { AxiosError } from "axios";

export const getApiErrorStatus = (error) => {
  if (error instanceof AxiosError) {
    return error.response?.status || null;
  }
  return null;
};

export const getApiErrorMessage = (error, fallbackMessage) => {
  if (error instanceof AxiosError) {
    return error.response?.data?.message || fallbackMessage;
  }
  return fallbackMessage;
};
