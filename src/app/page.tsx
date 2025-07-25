import SplashScreen from "@/components/elements/SplashScreen";
import LoginForm from "./auth/login/_partials/LoginForm";

export default function Home() {
    return (
        <>
            <SplashScreen
                title="Welcome to Sketchnosis"
                description="These illustrations are used in medical education, surgical planning, patient communication, and research publications."
            >
                <LoginForm />
            </SplashScreen>
        </>
    );
}
