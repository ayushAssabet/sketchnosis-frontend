"use client";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import React, { useState, useEffect } from "react";
import PageHeader from "../../_partials/PageHeader";
import Image from "next/image";
import { appImages } from "@/helpers/image.helper";
import { useScreenModal } from "@/features/restrictDevice/useRestrictDevice";
import { useViewCampaign } from "@/features/viewCampaign/useViewCampaign";
import { useGetInvitation } from "@/features/invitation/useGetInvitation";
import Link from "next/link";
import { appRoutes } from "@/lib/routes";

const HealthCampaign = ({ id }: { id: string }) => {
    const [showModal, setShowModal] = useState(false);
    const [isTouchDevice, setIsTouchDevice] = useState(false);
    const { data } = useViewCampaign(id);
    const { ScreenModal } = useScreenModal(576);

    console.log(data);

    useEffect(() => {
        // Detect if device supports touch
        const touch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
        setIsTouchDevice(touch);

        const handleClickOrTouch = () => {
            setShowModal(true);
        };

        if (touch) {
            // mobile/tablet → listen for touch
            document.addEventListener("touchstart", handleClickOrTouch);
        } else {
            // desktop → listen for click
            document.addEventListener("click", handleClickOrTouch);
        }

        return () => {
            if (touch) {
                document.removeEventListener("touchstart", handleClickOrTouch);
            } else {
                document.removeEventListener("click", handleClickOrTouch);
            }
        };
    }, []);

    return (
        <div className="h-screen flex flex-col bg-white max-w-md mx-auto">
            {/* Header */}
            <div className="sticky top-0 z-1">
                <PageHeader hasBackLink={false}>
                    {data?.data?.patientCampaign?.campaign?.name}
                </PageHeader>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 p-6 space-y-6">
                <div className="relative">
                    <Image
                        src={data?.data?.illustrationSignedUrl}
                        width={100}
                        height={100}
                        className="w-full aspect-auto object-fill"
                        alt="illustration alternate"
                        loading="lazy"
                    />
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `url(${appImages.waterMark})`,
                        }}
                    ></div>
                </div>
                <div className="mt-20">
                    <p className="text-xs text-gray-600 leading-relaxed">
                        I have read and understood the above{" "}
                        <Link
                            href={appRoutes.POLICY}
                            className="text-primary underline cursor-pointer"
                        >
                            Privacy Policy
                        </Link>
                        , and{" "}
                        <Link
                            href={appRoutes.TERMS}
                            className="text-primary underline cursor-pointer"
                        >
                            Terms & Conditions
                        </Link>{" "}
                        and I agree to participate in the campaign under these
                        conditions.
                    </p>
                </div>
                <Dialog
                    open={showModal}
                    onOpenChange={() => setShowModal((prev: boolean) => !prev)}
                >
                    <DialogContent className="p-0">
                        <div className="bg-white rounded-lg mx-4 p-6 relative">
                            <div className="flex justify-center mb-4">
                                <TriangleAlert className="w-14 h-14 fill-red-500 text-white" />
                            </div>

                            {/* Modal content */}
                            <div className="text-center">
                                <h2 className="text-red-500 font-semibold text-lg mb-2">
                                    Unusual user behavior detected!
                                </h2>
                                <p className="text-gray-700 text-sm">
                                    You are not authorized to download this
                                    illustration. Please do not scroll or do not
                                    pinch to zoom
                                </p>
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>

            <ScreenModal />
        </div>
    );
};

export default HealthCampaign;
