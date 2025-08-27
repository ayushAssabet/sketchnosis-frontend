import React from "react";
import { ArrowLeft, Calendar, Shield, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PageHeader from "../../_partials/PageHeader";

export default function PolicyContent() {
    return (
        <div className="max-w-md mx-auto bg-gray-50 min-h-screen">
            <PageHeader>Privacy Policy</PageHeader>

            <div className="p-6 space-y-6">
                <Card className="border-0 shadow-sm">
                    <CardContent className="p-4">
                        <div className="flex items-start gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                                <Shield className="w-4 h-4 text-primary" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-primary text-sm mb-3">
                                    Privacy & Data Handling:
                                </h3>
                                <ul className="space-y-2">
                                    <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        Your participation and personal
                                        information will be handled in
                                        accordance with applicable privacy and
                                        health information protection standards.
                                    </li>
                                    <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        Content may contain health-related
                                        information intended solely for your
                                        personal awareness and education.
                                    </li>
                                    <li className="text-sm text-gray-700 leading-relaxed flex items-start">
                                        <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                                        We will not disclose your personal
                                        health information without your consent,
                                        except as required by law.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
