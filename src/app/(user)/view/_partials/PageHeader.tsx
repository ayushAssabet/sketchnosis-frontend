"use client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PageHeader: React.FC<{
    children: React.ReactNode;
    hasBackLink?: boolean;
}> = ({ children, hasBackLink = true }) => {
    const router = useRouter();

    return (
        <div className="bg-primary text-white p-4">
            <div className="flex items-center gap-3 w-full">
                {hasBackLink && (
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-full bg-white/20 hover:bg-white/30 text-white p-0"
                        onClick={() => router.back()}
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                )}
                <h1 className="text-xl font-semibold text-center w-full">
                    {children}
                </h1>
            </div>
        </div>
    );
};

export default PageHeader;
