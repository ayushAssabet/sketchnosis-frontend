"use client";
import SplashScreen from "@/components/elements/SplashScreen";
import ResetPasswordForm from "./ResetPasswordForm";

export default function ResetPasswordContent() {
    return (
        <>
            <SplashScreen
                title="Reset Your Password"
                description="To reset your account credentials, please enter your email. This will verify it's you and we will send reset email to your mail."
            >
                <ResetPasswordForm />
            </SplashScreen>
        </>
    );
}
