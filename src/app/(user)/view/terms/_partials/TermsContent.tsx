import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "../../_partials/PageHeader";
import { Calendar, Lock, Shield } from "lucide-react";

export default function TermsAndConditions() {
    return (
        <div className="max-w-md mx-auto max-h-screen overflow-y-scroll">
            {/* Header */}
            <PageHeader>Terms & Conditions</PageHeader>

            {/* Content */}
            <div className="p-6 space-y-6">
                <p className="text-sm text-gray-700 leading-relaxed">
                    By participating in this campaign, you acknowledge and agree
                    to the following:
                </p>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary text-sm mb-3">
                            Daily Content Delivery:
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                You will receive SMS messages containing
                                illustrations with a secure link to view a
                                health-related tip or illustration.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Shield className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary text-sm mb-3">
                            Access Restrictions:
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Each illustration or tip will be available for
                                24 hours from the time of delivery.
                            </li>
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Content can only be accessed through the
                                provided secure browser link.
                            </li>
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Screenshots, screen recordings, downloads, or
                                any other method of copying or reproducing the
                                content are strictly prohibited and is a act of
                                serious offence.
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Lock className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                        <h3 className="font-semibold text-primary text-sm mb-3">
                            Confidentiality & Non-Sharing:
                        </h3>
                        <ul className="space-y-2">
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                All campaign materials are provided for your
                                personal use only.
                            </li>
                            <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                Sharing, forwarding, or otherwise distributing
                                the content to any other individual or platform
                                is not permitted.
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
