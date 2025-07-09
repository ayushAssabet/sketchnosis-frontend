import { appImages } from "@/helpers/image.helper";
import Image from "next/image";

interface SplashScreenPropsInterface { 
    children : React.ReactNode
    title : string , 
    description : string
}

const SplashScreen: React.FC<SplashScreenPropsInterface> = ({ 
    children,
    title , 
    description 
}) => {
  return (
    <div className="h-screen grid grid-cols-2">
      <div
        className="h-full bg-cover bg-center bg-no-repeat relative z-[-2] flex items-center justify-center"
        style={{ backgroundImage: `url(${appImages.loginBg})` }}
      >
        <div className="overlay bg-primary inset-0 absolute opacity-90 z-[-1]"></div>
        <div className="splash-intro-container space-y-11 z-10 max-w-[495px] text-white">
          <Image src={appImages.brandLogo} alt="Logo" width={230} height={75} className="object-cover"/>
          <div className="splash-intro space-y-3">
            <h2 className="text-6xl font-bold">{title}</h2>
            <p>
              {description}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center h-full min-w-[530px] w-full px-6">
        {children}
      </div>
    </div>
  );
};

export default SplashScreen;
