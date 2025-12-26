import { useToastStore } from "@/store/toastStore";
import { AxiosError, isAxiosError } from "axios";
export const handleUnAuthenticatedError = async (
  error: AxiosError<any, any>
) => {
  if (error === null) {
    return Promise.reject(
      new Error("Unrecoverable error!! occured, Try again")
    );
  }

  if (!isAxiosError(error)) {
    return Promise.reject(error);
  }

  const response = error.response;
  const errorMessage = response?.data;

  const statusCode = response?.status;
  if (!response) {
    return Promise.reject(error);
  }
  const { showToast } = useToastStore.getState();
  showToast({
    variant: "error",
    message: errorMessage,
  });
  return Promise.reject(error);
};

export const defaultPayload = {};
