import { toast } from "vue3-toastify";

export const useNotify = () => {
  const notifySuccess = (message: string) => {
    toast.success(message);
  };

  const notifyError = (message: string) => {
    toast.error(message);
  };

  return {
    notifySuccess,
    notifyError,
  };
};
