// components/HealthConditionBarChart.tsx
import { calculateBarChartScale, transformHealthConditionData } from "@/helpers/data.helper";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  CartesianGrid
} from "recharts";

interface HealthConditionBarChartProps {
  data: Array<{ campaignId: string; campaignName: string; patientCount: number }>;
  color?: string;
  title?: string;
  height?: number;
  showGrid?: boolean;
  showTooltip?: boolean;
  maxItems?: number;
}

const HealthConditionBarChart: React.FC<HealthConditionBarChartProps> = ({
  data,
  color = "#3b82f6",
  title,
  height = 300,
  showGrid = true,
  showTooltip = true,
  maxItems = 8
}) => {
  // Transform the data
  const chartData = transformHealthConditionData(data, maxItems);
  
  // Calculate appropriate scale
  const { domainMax, ticks } = calculateBarChartScale(chartData);

  // Custom tick formatter for XAxis to handle long names
  const formatXAxisTick = (value: string, index: number) => {
    if (value.length <= 15) return value;
    
    // For longer names, split into two lines or truncate
    const words = value.split(' ');
    if (words.length > 1) {
      // Try to split into two roughly equal lines
      const midPoint = Math.ceil(words.length / 2);
      const line1 = words.slice(0, midPoint).join(' ');
      const line2 = words.slice(midPoint).join(' ');
      
      return (
        <tspan>
          <tspan x="0" dy="-0.5em">{line1}</tspan>
          <tspan x="0" dy="1.2em">{line2}</tspan>
        </tspan>
      );
    }
    
    // If it's one long word, truncate it
    return value.length > 20 ? `${value.substring(0, 17)}...` : value;
  };

  // Calculate bar size based on data length
  const getBarSize = (dataLength: number): number => {
    if (dataLength === 1) return 60; // Fixed width for single bar
    if (dataLength === 2) return 80; // Slightly wider for two bars
    if (dataLength <= 4) return 40;  // Medium width for few bars
    return undefined; // Default (automatic) for many bars
  };

  const barSize = getBarSize(chartData.length);

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>}
      
      {chartData.length === 0 ? (
        <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg">
          <p className="text-gray-500">No campaign data available</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <BarChart
            data={chartData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: chartData.some(item => item.condition.length > 15) ? 40 : 5,
            }}
            // Add these properties to control bar spacing
            barCategoryGap={chartData.length === 1 ? "40%" : "20%"}
          >
            {showGrid && <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={true} vertical={false} />}
            <XAxis
              dataKey="condition"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              tickFormatter={formatXAxisTick as any}
              interval={0}
              height={chartData.some(item => item.condition.length > 15) ? 60 : undefined}
              // Center the single bar
              type="category"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: "#6b7280" }}
              domain={[0, domainMax]}
              ticks={ticks}
            />
            {showTooltip && (
              <Tooltip
                formatter={(value) => [`${value} patients`, 'Count']}
                labelFormatter={(label) => `Campaign: ${label}`}
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '6px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
            )}
            <Bar
              dataKey="campaigns"
              fill={color}
              radius={[2, 2, 0, 0]}
              maxBarSize={barSize}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default HealthConditionBarChart;