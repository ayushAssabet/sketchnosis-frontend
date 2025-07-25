import Swal from "sweetalert2";

export const useToast = () => {
    const Toast = Swal.mixin({
        toast: true,
        position: "bottom-right",
        iconColor: "white",
        customClass: {
            popup: "colored-toast",
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
    });
    function showToast({
        variant,
        title,
        description,
    }: {
        variant: "success" | "destructive" | "warning";
        title?: string;
        description?: string;
    }) {
        const config = {
            title: title,
            text: description,
            confirmButtonText: "OK",
            allowOutsideClick: true,
            allowEscapeKey: true,
        };

        switch (variant) {
            case "success":
                Toast.fire({
                    ...config,
                    icon: "success",
                    iconColor: "white",
                    color: "white",
                    background: "#10b981", // green background
                    confirmButtonColor: "#10b981",
                });
                break;
            case "warning":
                Toast.fire({
                    ...config,
                    icon: "warning",
                    iconColor: "white",
                    color: "white",
                    background: "#f59e0b", // amber background
                    confirmButtonColor: "#f59e0b",
                });
                break;
            case "destructive":
                Toast.fire({
                    ...config,
                    icon: "error",
                    iconColor: "white",
                    color: "white",
                    background: "#ef4444", // red background
                    confirmButtonColor: "#ef4444",
                });
                break;
            default:
                Toast.fire({
                    ...config,
                    icon: "info",
                    iconColor: "white",
                    background: "#3b82f6", // blue background
                    confirmButtonColor: "#3b82f6",
                });
        }
    }

    return { showToast };
};
