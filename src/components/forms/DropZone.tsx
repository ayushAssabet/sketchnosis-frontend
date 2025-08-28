import React, { useCallback, useState, useEffect, useRef } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, FileImage, AlertCircle } from "lucide-react";
import clsx from "clsx";
import { viewImage } from "@/helpers/viewImage.helper";
import { BACKEND_HOST } from "@/utils/constants";

interface AppDropZonePropsInterface {
    label?: string;
    handleFileChange: (key: string, file: File | null) => void;
    name: string;
    maxSize?: number; // in bytes
    multiple?: boolean;
    disabled?: boolean;
    error?: string;
    required?: boolean;
    variant?: "dashboard" | "app";
    currentFile?: File | null;
    currentUrl?: string;
    isUpdateMode?: boolean;
}

const AppDropZone: React.FC<AppDropZonePropsInterface> = ({
    label,
    handleFileChange,
    name,
    maxSize = 5 * 1024 * 1024, // 5MB default
    multiple = false,
    disabled = false,
    error,
    required = false,
    variant = "app",
    currentFile,
    currentUrl,
    isUpdateMode = false,
}) => {
    const [dragError, setDragError] = useState<string>("");
    const [previewUrl, setPreviewUrl] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const abortControllerRef = useRef<AbortController | null>(null);

    // Handle drop
    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            setDragError("");

            if (rejectedFiles.length > 0) {
                const rejection = rejectedFiles[0];
                if (rejection.errors[0]?.code === "file-too-large") {
                    setDragError(
                        `File too large. Maximum size is ${formatFileSize(
                            maxSize
                        )}`
                    );
                } else if (rejection.errors[0]?.code === "file-invalid-type") {
                    setDragError("Only JPEG and PNG images are allowed");
                } else {
                    setDragError("File upload failed");
                }
                return;
            }

            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                handleFileChange(name, file);

                // Clean up previous preview URL
                if (previewUrl) {
                    URL.revokeObjectURL(previewUrl);
                }

                // Create new preview URL
                const newPreviewUrl = URL.createObjectURL(file);
                setPreviewUrl(newPreviewUrl);
            }
        },
        [handleFileChange, name, maxSize, previewUrl]
    );

    const { getRootProps, getInputProps, isDragActive, isDragReject } =
        useDropzone({
            onDrop,
            accept: {
                "image/jpeg": [".jpg", ".jpeg"],
                "image/png": [".png"],
            },
            maxSize,
            multiple,
            disabled,
        });

    const formatFileSize = (bytes: number) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    const removeFile = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleFileChange(name, null);
        setDragError("");

        // Clean up preview URL
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            setPreviewUrl("");
        }
    };

    const getFileName = (url: string) => {
        try {
            const urlObj = new URL(url);
            const pathname = urlObj.pathname;
            return pathname.split("/").pop() || "image";
        } catch {
            return "image";
        }
    };

    const displayError = error || dragError;
    const hasContent = currentFile || (isUpdateMode && currentUrl);

    console.log(currentFile, currentUrl);

    // Load currentUrl blob if in update mode
    useEffect(() => {
        const loadImage = async () => {
            console.log("load called");
            console.log(isUpdateMode, currentUrl);
            // Only load if we have currentUrl, we're in update mode, no current file, and no existing preview
            if (isUpdateMode && currentUrl) {
                setIsLoading(true);
                console.log("condition matched");

                try {
                    // Check if NEXT_PUBLIC_BACKEND_HOST is defined

                    const url = `${BACKEND_HOST}/v1/illustration/view-illustration?url=${currentUrl}`;
                    const blobUrl = await viewImage(url);

                    console.log(blobUrl, "blob");

                    if (blobUrl) {
                        setPreviewUrl(blobUrl);
                    }
                } catch (error: any) {
                    if (!abortControllerRef.current.signal.aborted) {
                        console.error("Failed to load image:", error);
                        setDragError("Failed to load existing image");
                    }
                } finally {
                    setIsLoading(false);
                }
            }
        };

        loadImage();

        // Cleanup function
        return () => {
            if (abortControllerRef.current) {
                abortControllerRef.current.abort();
            }
        };
    }, [currentUrl]);

    // Cleanup preview URL on unmount
    useEffect(() => {
        return () => {
            if (previewUrl && previewUrl.startsWith("blob:")) {
                URL.revokeObjectURL(previewUrl);
            }
        };
    }, [previewUrl]);

    return (
        <div className="flex flex-col gap-2">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-medium font-medium text-gray-700"
                >
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            <div
                {...getRootProps()}
                className={clsx(
                    "relative border-2 border-dashed rounded-lg transition-colors cursor-pointer text-sm",
                    "hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary",
                    isDragActive &&
                        !isDragReject &&
                        "border-primary bg-primary/5",
                    isDragReject && "border-red-500 bg-red-50",
                    displayError && "border-red-500 bg-red-50",
                    disabled && "opacity-50 cursor-not-allowed bg-gray-50",
                    !isDragActive &&
                        !isDragReject &&
                        !displayError &&
                        "border-gray-300 bg-gray-50",
                    variant === "dashboard" ? "p-4 !bg-white" : "p-6"
                )}
            >
                <input {...getInputProps()} id={name} />

                {hasContent ? (
                    <div className="space-y-4">
                        {/* File Info Display */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <FileImage className="w-8 h-8 text-primary" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900">
                                        {currentFile
                                            ? currentFile.name
                                            : getFileName(currentUrl || "")}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {currentFile
                                            ? formatFileSize(currentFile.size)
                                            : "Existing file"}
                                    </p>
                                </div>
                            </div>
                            {!disabled && (
                                <button
                                    type="button"
                                    onClick={removeFile}
                                    className="flex items-center cursor-pointer justify-center w-6 h-6 rounded-full bg-red-100 hover:bg-red-200 text-red-600 transition-colors"
                                    aria-label="Remove file"
                                >
                                    <X size={14} />
                                </button>
                            )}
                        </div>

                        {/* Image Preview */}
                        {isLoading && (
                            <div className="flex justify-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                            </div>
                        )}

                        {previewUrl && !isLoading && (
                            <div className="flex justify-center">
                                <div className="relative max-w-xs">
                                    <img
                                        src={previewUrl}
                                        alt="Preview"
                                        className="max-h-32 max-w-full rounded-lg border border-gray-200 object-contain"
                                        onError={() => {
                                            console.error(
                                                "Failed to display image preview"
                                            );
                                            setDragError(
                                                "Failed to display image preview"
                                            );
                                            setPreviewUrl("");
                                        }}
                                    />
                                </div>
                            </div>
                        )}

                        {!disabled && (
                            <div className="text-center">
                                <p className="text-xs text-gray-500">
                                    Drop a new file here or click to replace
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="flex justify-center mb-4">
                            <Upload
                                className={clsx(
                                    "text-gray-400",
                                    variant === "dashboard"
                                        ? "w-8 h-8"
                                        : "w-12 h-12"
                                )}
                            />
                        </div>
                        <div className="space-y-2 text-xs">
                            <p
                                className={clsx(
                                    "font-medium",
                                    variant === "dashboard"
                                        ? "text-sm"
                                        : "text-base",
                                    isDragActive
                                        ? "text-primary"
                                        : "text-gray-700"
                                )}
                            >
                                {isDragActive
                                    ? "Drop files here"
                                    : "Browse or drag files to upload"}
                            </p>
                            <p
                                className={clsx(
                                    "text-gray-500",
                                    variant === "dashboard"
                                        ? "text-xs"
                                        : "text-sm"
                                )}
                            >
                                JPEG, PNG up to {formatFileSize(maxSize)}
                            </p>
                        </div>
                    </div>
                )}
            </div>

            {displayError && (
                <div className="flex items-center gap-2 mt-1">
                    <AlertCircle size={16} className="text-red-500" />
                    <p className="text-sm text-red-600" role="alert">
                        {displayError}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AppDropZone;
