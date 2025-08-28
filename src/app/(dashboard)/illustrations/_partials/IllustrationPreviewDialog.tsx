"use client";

import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

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
          'Accept': 'image/*',
        },
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const blob = await response.blob();
      return URL.createObjectURL(blob);
    } catch (error) {
      console.error('Error loading image:', error);
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
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
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
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={row.original?.title || "Illustration"}
          className="w-12 h-12 rounded-md object-cover cursor-pointer hover:opacity-90 transition-all duration-200 hover:scale-105 hover:shadow-lg"
          onClick={handleOpen}
        />
      ) : (
        <div className="w-12 h-12 rounded-md bg-gray-200 animate-pulse cursor-wait">
          {isLoading && (
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </div>
      )}

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
              {imageUrl && (
                <img
                  src={imageUrl}
                  alt={row.original?.title || "Illustration"}
                  className="max-w-full max-h-full object-contain drop-shadow-2xl animate-in zoom-in-95 duration-500"
                  style={{ maxHeight: 'calc(100vh - 200px)' }}
                />
              )}
                {/* Information Panel */}
                <div className="w-full absolute rounded-2xl p-6 mt-6 border border-white/20">
                <div className="text-center">
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">
                    {row.original?.title || "Medical Illustration"}
                    </h1>

                    {/* Categories */}
                    {row.original?.areaOfConcerns && row.original.areaOfConcerns.length > 0 && (
                    <div className="flex gap-3 mb-6 flex-wrap justify-center">
                        {row.original.areaOfConcerns.map(
                        (category: Record<string, any>, index: number) => (
                            <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-sm rounded-full text-sm font-medium text-white border border-white/30 hover:border-white/50 transition-all duration-200 shadow-lg"
                            >
                            {category?.name}
                            </span>
                        )
                        )}
                    </div>
                    )}

                    {/* Description */}
                    {row.original?.description && (
                    <p className="text-white/90 text-lg leading-relaxed mb-4 max-w-3xl mx-auto">
                        {row.original.description}
                    </p>
                    )}

                    {/* Date */}
                    <div className="text-white/70 text-sm font-medium">
                    Added on {new Date(row.original?.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    })}
                    </div>
                </div>
                </div>
            </div>


            {/* Navigation hint */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/50 text-sm">
              Press ESC or click outside to close
            </div>
          </div>
        </div>
      )}
    </>
  );
};