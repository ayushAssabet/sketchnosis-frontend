import SplashScreen from "@/components/elements/SplashScreen";
import LoginForm from "./_partials/LoginForm";
import { pageTitleHelper } from "@/helpers/pageTitle.helper";

export const metadata = {
  title: 'LOGIN',
}

export default function Home() {
    return (
        <>
            {
                pageTitleHelper('Login')
            }
            <SplashScreen
                title="Welcome to Sketchnosis"
                description="These illustrations are used in medical education, surgical planning, patient communication, and research publications."
            >
                <LoginForm />
            </SplashScreen>

        </>
    );
}
