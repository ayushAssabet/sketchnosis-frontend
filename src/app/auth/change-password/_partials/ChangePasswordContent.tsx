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
    const title = searchParams.get("title");
    const isAdmin = searchParams.get("isAdmin") === "true" ? true : false;

    useEffect(() => {
        if (!token) router.replace(appRoutes.CHANGE_PASSWORD_INDEX_PAGE);
    }, []);

    return (
        <>
            <SplashScreen
                title={title ?? "Set Your Password"}
                description={
                    title
                        ? "To change credential of your account, please create a password. This will replace your existing credential and give you access to your dashboard."
                        : "To activate your account, please create a secure password. This will complete your registration and give you access to your dashboard."
                }
            >
                <ChagePasswordForm
                    token={token}
                    title={title}
                    isAdmin={isAdmin}
                />
            </SplashScreen>
        </>
    );
}
