import { toast as sonnerToast } from "sonner";

interface ToastOptions {
  id?: string | number;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export const toast = {
  success: (message: string, options?: ToastOptions) => {
    if (options?.id) {
      return sonnerToast.success(message, {
        id: options.id,
        description: options?.description,
        action: options?.action,
      });
    }
    return sonnerToast.success(message, {
      description: options?.description,
      action: options?.action,
    });
  },
  error: (message: string, options?: ToastOptions) => {
    if (options?.id) {
      return sonnerToast.error(message, {
        id: options.id,
        description: options?.description,
        action: options?.action,
      });
    }
    return sonnerToast.error(message, {
      description: options?.description,
      action: options?.action,
    });
  },
  loading: (message: string, options?: ToastOptions) => {
    if (options?.id) {
      return sonnerToast.loading(message, {
        id: options.id,
        description: options?.description,
        action: options?.action,
      });
    }
    return sonnerToast.loading(message, {
      description: options?.description,
      action: options?.action,
    });
  },
  info: (message: string, options?: ToastOptions) => {
    return sonnerToast.info(message, {
      id: options?.id,
      description: options?.description,
      action: options?.action,
    });
  },
  warning: (message: string, options?: ToastOptions) => {
    return sonnerToast.warning(message, {
      id: options?.id,
      description: options?.description,
      action: options?.action,
    });
  },
  dismiss: (id?: string | number) => {
    return sonnerToast.dismiss(id);
  },
};
