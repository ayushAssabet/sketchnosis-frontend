"use client";

import React, { useEffect, useState } from "react";
import { FileSearch, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const IllustrationPreviewDialog = ({ row }: { row: any }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // React-based image viewing function
    const viewImageReact = async (url: string): Promise<string | null> => {
        try {
            setIsLoading(true);
            const response = await fetch(url, {
                headers: {
                    Accept: "image/*",
                },
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            return URL.createObjectURL(blob);
        } catch (error) {
            console.error("Error loading image:", error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        let active = true;
        let blobUrl: string | null = null;

        const loadImage = async () => {
            if (row.original?.fileUrl) {
                const url = `${process.env.NEXT_PUBLIC_BACKEND_HOST}/v1/illustration/view-illustration?url=${row.original.fileUrl}`;
                blobUrl = await viewImageReact(url);
                if (active && blobUrl) {
                    setImageUrl(blobUrl);
                }
            }
        };

        loadImage();

        return () => {
            active = false;
            if (blobUrl) {
                URL.revokeObjectURL(blobUrl);
            }
        };
    }, [row.original?.fileUrl]);

    // Handle escape key to close
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    return (
        <>
            {/* Thumbnail Trigger */}
            {
                !isLoading && 
                <Button
                    variant="ghost"
                    className="!px-2 cursor-not-allowed text-grey-50"
                    onClick={handleOpen}
                >
                    <FileSearch className="text-yellow-500"/>
                </Button>
            }

            {/* Full Screen Lightbox Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300"
                    onClick={handleBackdropClick}
                >
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 z-60 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-all duration-200 hover:scale-110"
                        aria-label="Close"
                    >
                        <X size={24} />
                    </button>

                    {/* Main Content Container */}
                    <div className="w-full h-full flex flex-col items-center justify-center max-w-7xl mx-auto">
                        {/* Image Container */}
                        <div className="relative flex-1 flex items-center justify-center w-full">
                            <div className="relative w-fit">
                                {imageUrl && (
                                    <img
                                        src={imageUrl}
                                        alt={
                                            row.original?.title ||
                                            "Illustration"
                                        }
                                        className="max-w-full max-h-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500"
                                        style={{
                                            maxHeight: "calc(100vh - 200px)",
                                        }}
                                    />
                                )}
                                <div className="w-full absolute -bottom-28 px-4">
                                    <div className="">
                                        {/* Title */}
                                        <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                                            {row.original?.title ||
                                                "Medical Illustration"}
                                        </h1>

                                        {/* Categories */}
                                        {row.original?.areaOfConcerns &&
                                            row.original.areaOfConcerns.length >
                                                0 && (
                                                <div className="flex gap-3 mb-6 flex-wrap">
                                                    {row.original.areaOfConcerns.map(
                                                        (
                                                            category: Record<
                                                                string,
                                                                any
                                                            >,
                                                            index: number
                                                        ) => (
                                                            <Badge>
                                                                {category?.name}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                </div>
                            </div>
                            {/* Information Panel */}
                        </div>

                        {/* Navigation hint */}
                        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
                            Press ESC  to close
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
