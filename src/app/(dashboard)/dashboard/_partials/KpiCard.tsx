import { stat } from "fs";
import { LucideIcon } from "lucide-react";

const KPICard: React.FC<{
    title: string;
    color: string;
    stats: string;
    icon: LucideIcon;
}> = ({ title, color, icon: Icon, stats }) => {
    const colorMap: Record<string, string> = {
        blue: "bg-blue-50 text-blue-500",
        green: "bg-green-50 text-green-500",
        red: "bg-red-50 text-red-500",
        yellow: "bg-yellow-50 text-yellow-500",
        pink : 'bg-pink-50 text-pink-500'
    };
    return (
        <article className="px-4 py-8 bg-white rounded-2xl border border-[#E4E4E7]">
            <div className="kpi-intro content-center flex flex-col items-center space-y-2">
                <div
                    className={`icon-holder ${colorMap[color]} w-fit p-4 rounded-2xl mb-1`}
                >
                    <Icon className={`text-${color}-500`} />
                </div>
                <p className="text-4xl">{stats}</p>
                <h3 className="text-[#71717A]">{title}</h3>
            </div>
        </article>
    );
};

export default KPICard;
