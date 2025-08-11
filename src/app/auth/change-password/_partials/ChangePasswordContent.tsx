"use client";
import SplashScreen from "@/components/elements/SplashScreen";
import ChagePasswordForm from "./ChangePasswordForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { appRoutes } from "@/lib/routes";

export default function ChangePasswordContent() {

    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const title = searchParams.get('title')

    useEffect(() => {
        if (!token) router.replace(appRoutes.CHANGE_PASSWORD_INDEX_PAGE);
    }, []);

    return (
        <>
            <SplashScreen
                title={title ?? "Set Your Password"}
                description={
                    title 
                        ? 'To change credentail of your account, please create a password. This will replace your existing credentail and give you access to your dashboard.'
                        : "To activate your account, please create a secure password. This will complete your registration and give you access to your dashboard."
                }
            >
                <ChagePasswordForm token={token} title={title}/>
            </SplashScreen>
        </>
    );
}
