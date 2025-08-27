"use client";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { TriangleAlert } from "lucide-react";
import { useState, useEffect } from "react";

export const useScreenModal = (breakpoint = 576) => {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // const checkScreen = () => {
        //     if (window.innerWidth > breakpoint) {
        //         setShowModal(true);
        //     } else {
        //         setShowModal(false);
        //     }
        // };

        // checkScreen(); // run on mount
        // window.addEventListener("resize", checkScreen);
        // return () => window.removeEventListener("resize", checkScreen);
    }, [breakpoint]);

    const closeModal = () => setShowModal(false);

    // The modal UI (conditionally rendered)
    const ScreenModal = () => (
        <Dialog open={showModal} onOpenChange={() => {}}>
            <DialogContent>
                <div className="bg-white rounded-lg mx-4 p-6 relative">
                    <div className="flex justify-center mb-4">
                        <TriangleAlert className="w-14 h-14 fill-red-500 text-white" />
                    </div>

                    {/* Modal content */}
                    <div className="text-center">
                        <h2 className="text-red-500">Device Restricted</h2>
                        <p className="text-gray-700 text-sm">
                            You cannot view this content other than in mobile
                            phones.
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );

    return { ScreenModal, showModal, closeModal };
};
