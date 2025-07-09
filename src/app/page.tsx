import SplashScreen from "@/components/elements/SplashScreen";
import LoginForm from "./auth/login/_partials/LoginForm";
import Image from "next/image";

export default function Home() {
    return (
        <>
            <title>SKECHNOSIS | LOGIN</title>
            <SplashScreen
                title="Welcome to Sketchnosis"
                description="These illustrations are used in medical education, surgical planning, patient communication, and research publications."
            >
                <LoginForm />
            </SplashScreen>
            {/* <Image 
                src={'http://192.168.1.92:3000/v1/clinics/viewlogo?logoUrl=clinic-logos%2F6a9a5ca1-149f-4c8b-82c6-b8cd1af84887.png'}
                fill
                alt="lgo"
            /> */}

        </>
    );
}
