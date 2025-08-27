import {
    BarChart,
    Bar,
    LineChart,
    Line,
    XAxis,
    YAxis,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
} from "recharts";

const PatientStatusDistribution = ({ pieData }) => {
    // Custom tooltip component
    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const data = payload[0];
            return (
                <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
                    <p className="font-medium text-gray-900">{data.name}</p>
                    <p className="text-sm text-gray-600">
                        <span className="font-semibold">{data.value}</span> patients
                        <span className="ml-1">({((data.value / pieData.reduce((sum, item) => sum + item.value, 0)) * 100).toFixed(1)}%)</span>
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="bg-white px-2 py-4 rounded-lg shadow-sm h-full">
            <div className="text-sm text-gray-900 font-semibold text-center mb-4">
                Patient Status Distribution
            </div>
            <div className="flex justify-center mb-4">
                <div className="w-full aspect-square max-w-xs">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                innerRadius="40%"
                                outerRadius="80%"
                                dataKey="value"
                                startAngle={90}
                                endAngle={450}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell
                                        key={`cell-${index}`}
                                        fill={entry.color}
                                    />
                                ))}
                            </Pie>
                            <Tooltip content={<CustomTooltip active={''} payload={''} />} />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            <div className="space-y-1 px-4">
                <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">Completed Campaign</span>
                </div>
                <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">Consent Accepted</span>
                </div>
                <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                        Added (No Consent Yet)
                    </span>
                </div>
                <div className="flex items-center text-xs">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    <span className="text-gray-700">
                        Active (Receiving Illustrations)
                    </span>
                </div>
            </div>
        </div>
    );
};

export default PatientStatusDistribution;