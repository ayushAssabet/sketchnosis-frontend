"use client";
import SplashScreen from "@/components/elements/SplashScreen";
import ChagePasswordForm from "./ChangePasswordForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { appRoutes } from "@/lib/routes";

export default function ChangePasswordContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) router.replace(appRoutes.CHANGE_PASSWORD_INDEX_PAGE);
    }, []);

    return (
        <>
            <SplashScreen
                title="Set Your Password"
                description="To activate your account, please create a secure password. This will complete your registration and give you access to your dashboard."
            >
                <ChagePasswordForm />
            </SplashScreen>
        </>
    );
}
