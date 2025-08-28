"use client";

import Link from "next/link";
import React from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const ForbiddenPage: React.FC = () => {
    const searchParams = useSearchParams();
    const user = !!searchParams.get('user');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                403 - Forbidden
            </h1>
            <p className="text-gray-600 mb-6">
                You do not have permission to access this page.
            </p>
            {user ? (
                <p>Please close the tab</p>
            ) : (
                <Link href={appRoutes.DASHBOARD_INDEX_PAGE}>
                    <Button>
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Dashboard
                    </Button>
                </Link>
            )}
        </div>
    );
};

export default ForbiddenPage;
