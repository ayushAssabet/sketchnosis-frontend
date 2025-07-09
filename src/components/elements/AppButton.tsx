import React from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, X, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AppButtonProps {
    // Loading state
    isLoading?: boolean;
    loadingText?: string;

    // Success state
    isSuccess?: boolean;
    successText?: string;
    successDuration?: number;

    // Error state
    isError?: boolean;
    errorText?: string;

    // Icon support
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;

    // Full width option
    fullWidth?: boolean;

    // Confirmation dialog
    requireConfirmation?: boolean;
    confirmationText?: string;

    // Auto reset states
    autoResetState?: boolean;
    resetDelay?: number;

    // Custom loading spinner
    customLoader?: React.ReactNode;

    // Tooltip
    tooltip?: string;

    // Badge/notification
    badge?: number | string;
    badgeVariant?: "default" | "destructive" | "success" | "warning";

    className?: string;
    disabled?: boolean;
    onClick?: (e: any) => void;
    children?: React.ReactNode;

    variant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    size?: "default" | "sm" | "lg" | "icon";

    type?: "button" | "submit" | "reset";
}

const AppButton: React.FC<AppButtonProps> = ({
    children,
    isLoading = false,
    loadingText,
    isSuccess = false,
    successText,
    successDuration = 2000,
    isError = false,
    errorText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    requireConfirmation = false,
    confirmationText = "Are you sure?",
    autoResetState = true,
    resetDelay = 2000,
    customLoader,
    tooltip,
    badge,
    type = "button",
    variant = "default",
    badgeVariant = "default",
    className,
    disabled,
    onClick,
    ...props
}) => {
    const [showConfirmation, setShowConfirmation] = React.useState(false);
    const [internalSuccess, setInternalSuccess] = React.useState(false);
    const [internalError, setInternalError] = React.useState(false);

    // Auto reset success/error states
    React.useEffect(() => {
        if (autoResetState && (isSuccess || internalSuccess)) {
            const timer = setTimeout(() => {
                setInternalSuccess(false);
            }, successDuration);
            return () => clearTimeout(timer);
        }
    }, [isSuccess, internalSuccess, autoResetState, successDuration]);

    React.useEffect(() => {
        if (autoResetState && (isError || internalError)) {
            const timer = setTimeout(() => {
                setInternalError(false);
            }, resetDelay);
            return () => clearTimeout(timer);
        }
    }, [isError, internalError, autoResetState, resetDelay]);

    // Determine current state
    const currentSuccess = isSuccess || internalSuccess;
    const currentError = isError || internalError;
    const currentLoading = isLoading && !currentSuccess && !currentError;

    // Handle click with confirmation
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (requireConfirmation && !showConfirmation) {
            e.preventDefault();
            setShowConfirmation(true);
            return;
        }

        if (showConfirmation) {
            setShowConfirmation(false);
        }

        onClick?.(e);
    };

    // Cancel confirmation
    const handleCancel = (e: React.MouseEvent) => {
        e.stopPropagation();
        setShowConfirmation(false);
    };

    // Get button content based on state
    const getButtonContent = () => {
        if (currentLoading) {
            return (
                <>
                    {customLoader || (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    )}
                    {loadingText && <span className="ml-2">{loadingText}</span>}
                </>
            );
        }

        if (currentSuccess) {
            return (
                <>
                    <Check className="w-4 h-4" />
                    {successText && <span className="ml-2">{successText}</span>}
                </>
            );
        }

        if (currentError) {
            return (
                <>
                    <AlertCircle className="w-4 h-4" />
                    {errorText && <span className="ml-2">{errorText}</span>}
                </>
            );
        }

        if (showConfirmation) {
            return (
                <div className="flex items-center space-x-2">
                    <span className="text-sm">{confirmationText}</span>
                    <button
                        onClick={handleCancel}
                        className="p-1 hover:bg-white/20 rounded"
                        type="button"
                    >
                        <X className="w-3 h-3" />
                    </button>
                </div>
            );
        }

        return (
            <>
                {leftIcon && <span className="mr-2">{leftIcon}</span>}
                {children}
                {rightIcon && <span className="ml-2">{rightIcon}</span>}
            </>
        );
    };

    // Get button variant based on state
    const getVariant = () => {
        if (currentSuccess) return "default";
        if (currentError) return "destructive";
        if (showConfirmation) return "destructive";
        return variant || "default";
    };

    // Badge styles
    const getBadgeStyles = () => {
        const baseStyles =
            "absolute -top-2 -right-2 px-2 py-1 text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center";

        switch (badgeVariant) {
            case "destructive":
                return `${baseStyles} bg-red-500 text-white`;
            case "success":
                return `${baseStyles} bg-green-500 text-white`;
            case "warning":
                return `${baseStyles} bg-yellow-500 text-black`;
            default:
                return `${baseStyles} bg-blue-500 text-white`;
        }
    };

    const buttonElement = (
        <div className="relative inline-block w-full">
            <Button
                {...props}
                type={type}
                variant={getVariant()}
                className={cn(
                    "relative transition-all duration-200",
                    fullWidth && "w-full",
                    currentLoading && "cursor-not-allowed",
                    currentSuccess && "bg-green-500 hover:bg-green-600",
                    currentError && "bg-red-500 hover:bg-red-600",
                    showConfirmation && "bg-red-500 hover:bg-red-600",
                    className
                )}
                disabled={disabled || currentLoading}
                onClick={handleClick}
            >
                {getButtonContent()}
            </Button>

            {/* Badge */}
            {badge && <div className={getBadgeStyles()}>{badge}</div>}
        </div>
    );

    // Wrap with tooltip if provided
    if (tooltip) {
        return (
            <div className="relative group">
                {buttonElement}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 text-xs bg-gray-800 text-white rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    {tooltip}
                </div>
            </div>
        );
    }

    return buttonElement;
};

export default AppButton;
