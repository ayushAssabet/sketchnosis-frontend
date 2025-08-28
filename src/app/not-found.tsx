"use client";

import Link from "next/link";
import React from "react";
import { SearchX, ArrowLeft } from "lucide-react";
import { appRoutes } from "@/lib/routes";
import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";

const NotFoundPage: React.FC = () => {
    const searchParams = useSearchParams();
    const user = !!searchParams.get('user');
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4 text-center">
            <SearchX className="w-16 h-16 text-gray-500 mb-4" />
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
                404 - Page Not Found
            </h1>
            <p className="text-gray-600 mb-6">
                The page you are looking for doesn’t exist or has been moved.
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

export default NotFoundPage;
