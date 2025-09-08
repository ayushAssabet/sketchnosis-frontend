import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { ArrowLeft, ChevronLeft } from "lucide-react";

const CommonContainer: React.FC<{
    children: React.ReactNode;
    title: string;
    showBackButton?: boolean;
    className?: string;
}> = ({ children, title, showBackButton = true, className = "" }) => {
    const router = useRouter();

    return (
        <section
            id={title}
            className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6"
        >
            <div
                className={`
                bg-white/80 backdrop-blur-sm 
                w-full rounded-3xl 
                min-h-[85vh]
                py-4 px-6
                shadow-xl shadow-black/5
                border border-white/20
                max-w-7xl mx-auto 
                relative
                ${className}
            `}
            >
                {/* Header with back button and title */}
                <div className="flex items-center gap-4 mb-6 pb-4 border-b border-gray-100">
                    {showBackButton && (
                        <Button
                            variant="outline"
                            size="sm"
                            className="
                                h-10 w-10 !p-0 !px-0
                                rounded-full 
                                hover:from-gray-200 hover:to-gray-100                                
                                transition-all duration-200
                                group
                                
                            "
                            onClick={() => router.back()}
                        >
                            <ChevronLeft
                                className="w-8 h-8 text-gray-500 group-hover:text-gray-800 transition-colors"
                                size={32}
                            />
                        </Button>
                    )}

                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 capitalize">
                            {title?.replaceAll("-", " ").replace("section", "")}
                        </h1>
                    </div>
                </div>

                <div className="relative">{children}</div>
            </div>
        </section>
    );
};

export default CommonContainer;
