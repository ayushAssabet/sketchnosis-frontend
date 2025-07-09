import SplashScreen from "@/components/elements/SplashScreen";
import ChagePasswordForm from "./ChangePasswordForm";

export default function ChangePasswordContent() {
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
