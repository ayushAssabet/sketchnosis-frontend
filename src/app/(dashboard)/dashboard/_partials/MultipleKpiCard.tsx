import { LucideIcon } from "lucide-react";

const MultipleKPICard: React.FC<{
  title: string;
  color: string;
  stats: {
    active: number;
    total: number;
    draft?: number;
    pending?: number;
  };
  icon: LucideIcon;
}> = ({ title, color, icon: Icon, stats }) => {
  // Enhanced color mapping with better visual harmony
  const colorMap: Record<string, { bg: string; text: string; progress: string; icon: string }> = {
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      progress: "bg-blue-200",
      icon: "bg-blue-100 text-blue-600"
    },
    green: {
      bg: "bg-green-50",
      text: "text-green-700",
      progress: "bg-green-200",
      icon: "bg-green-100 text-green-600"
    },
    red: {
      bg: "bg-red-50",
      text: "text-red-700",
      progress: "bg-red-200",
      icon: "bg-red-100 text-red-600"
    },
    yellow: {
      bg: "bg-yellow-50",
      text: "text-yellow-700",
      progress: "bg-yellow-200",
      icon: "bg-yellow-100 text-yellow-600"
    },
  };

  const colors = colorMap[color] || colorMap.blue;
  const isDraftOrPending = stats?.draft ? 'Draft' : 'Pending'
  const draftOrPending = stats.draft ?? stats.pending ?? 0;
  const activePercentage = stats.total > 0 ? (stats.active / stats.total) * 100 : 0;
  const draftPercentage = stats.total > 0 ? (draftOrPending / stats.total) * 100 : 0;

  return (
    <article className={`px-6 py-8 bg-white rounded-2xl border border-[#E4E4E7] ${colors.bg}`}>
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wide">{title}</h3>
          <p className="text-3xl font-bold text-gray-900 mt-1">{stats.total}</p>
        </div>
        <div className={`p-3 rounded-lg ${colors.icon}`}>
          <Icon size={20} />
        </div>
      </div>

      {/* Progress bars for visual representation */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Active: {stats.active}</span>
          <span>{isDraftOrPending}: {draftOrPending}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full ${colors.progress}`}
            style={{ width: `${activePercentage}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
          <p className={`text-xl font-semibold ${colors.text}`}>{stats.active}</p>
          <p className="text-xs text-gray-500 mt-1">Active</p>
        </div>
        <div className="text-center p-3 bg-white rounded-lg border border-gray-100 shadow-xs">
          <p className="text-xl font-semibold text-amber-600">{draftOrPending}</p>
          <p className="text-xs text-gray-500 mt-1">{stats?.draft ? 'Draft' : 'Pending'}</p>
        </div>
      </div>
    </article>
  );
};

export default MultipleKPICard;