"use client";

import React from "react";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, AlertTriangle, X } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteButtonWithConfirmDialogProps {
    title?: string;
    description?: string;
    onConfirm: () => void;
    triggerText?: string;
    triggerVariant?:
        | "default"
        | "destructive"
        | "outline"
        | "secondary"
        | "ghost"
        | "link";
    triggerSize?: "default" | "sm" | "lg" | "icon";
    disabled?: boolean;
    loading?: boolean;
    showIcon?: boolean;
    isRedirect? : string | undefined
}

const DeleteButtonWithConfirmDialog = ({
    title = "Are you sure you want to delete?",
    description = "This action cannot be undone. This will permanently delete the item and remove all associated data.",
    onConfirm,
    triggerText,
    triggerVariant = "ghost",
    triggerSize = "default",
    disabled = false,
    loading = false,
    showIcon = true,
    isRedirect,
}: DeleteButtonWithConfirmDialogProps) => {
    
    const router = useRouter();

    const handleConfirm = () => {
        onConfirm();
        if(isRedirect){
            router.replace(isRedirect)
        }
    };



    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    variant={triggerVariant}
                    size={triggerSize}
                    disabled={disabled || loading}
                    className={`
            ${
                triggerVariant === "ghost"
                    ? "text-red-600 hover:text-red-700 hover:bg-red-50 transition-colors duration-200"
                    : triggerVariant === "destructive"
                    ? "bg-red-600 hover:bg-red-700 text-white"
                    : "text-red-600 hover:text-red-700"
            }
            ${triggerSize === "icon" ? "h-9 w-9" : ""}
            ${
                disabled || loading
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
            }
            relative overflow-hidden group
          `}
                >
                    {loading ? (
                        <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                    ) : (
                        <>
                            {showIcon && (
                                <Trash2
                                    className={
                                        triggerText ? "mr-2 h-4 w-4" : "h-4 w-4"
                                    }
                                />
                            )}
                            {triggerText}
                        </>
                    )}

                    {/* Subtle hover effect */}
                    <div className="absolute inset-0 bg-red-100 opacity-0 group-hover:opacity-20 transition-opacity duration-200" />
                </Button>
            </AlertDialogTrigger>

            <AlertDialogContent className="max-w-md mx-4 rounded-xl border-0 shadow-2xl bg-white overflow-hidden">
                {/* Header with gradient background */}
                <div className="relative bg-gradient-to-r from-red-500 to-red-600 px-6 py-4 -mx-6 -mt-6 mb-4">
                    <div className="absolute inset-0 bg-red-600 opacity-90"></div>
                    <div className="relative flex items-center space-x-3">
                        <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm">
                            <AlertTriangle
                                className="h-6 w-6 text-white"
                                strokeWidth={2.5}
                            />
                        </div>
                        <div>
                            <AlertDialogTitle className="text-xl font-semibold text-white leading-6">
                                {title}
                            </AlertDialogTitle>
                        </div>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-white/5 rounded-full translate-y-8 -translate-x-8"></div>
                </div>

                <AlertDialogHeader className="space-y-3">
                    <AlertDialogDescription className="text-gray-600 text-base leading-relaxed">
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>

                <AlertDialogFooter className="mt-6 space-x-3">
                    <AlertDialogCancel className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 border-0 rounded-lg py-2.5 px-4 font-medium transition-colors duration-200">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={handleConfirm}
                        className="flex-1 bg-red-600 hover:bg-red-700 text-white border-0 rounded-lg py-2.5 px-4 font-medium transition-all duration-200 transform hover:scale-105 focus:scale-105 shadow-lg hover:shadow-xl"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>

                <AlertDialogCancel className="absolute top-3 right-3 h-8 w-8 rounded-full bg-white/20 hover:bg-white/30 border-0 p-0 text-white hover:text-white transition-colors duration-200">
                    <X className="h-4 w-4" />
                </AlertDialogCancel>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteButtonWithConfirmDialog;
