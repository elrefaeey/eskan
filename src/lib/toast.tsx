import toast from "react-hot-toast";
import { CheckCircle2, XCircle } from "lucide-react";

interface ToastOptions {
  duration?: number;
  position?:
    | "top-center"
    | "top-right"
    | "top-left"
    | "bottom-center"
    | "bottom-right"
    | "bottom-left";
}

export const showSuccessToast = (message: string, options?: ToastOptions) => {
  toast.success(message, {
    duration: options?.duration || 4000,
    position: options?.position || "top-center",
    icon: <CheckCircle2 className="h-6 w-6" />,
    style: {
      background: "#10b981",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      padding: "16px 24px",
      borderRadius: "12px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#10b981",
    },
  });
};

export const showErrorToast = (message: string, options?: ToastOptions) => {
  toast.error(message, {
    duration: options?.duration || 4000,
    position: options?.position || "top-center",
    icon: <XCircle className="h-6 w-6" />,
    style: {
      background: "#ef4444",
      color: "#fff",
      fontSize: "16px",
      fontWeight: "600",
      padding: "16px 24px",
      borderRadius: "12px",
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    },
    iconTheme: {
      primary: "#fff",
      secondary: "#ef4444",
    },
  });
};
