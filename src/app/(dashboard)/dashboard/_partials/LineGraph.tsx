import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
} from "recharts";

interface LineGraphProps {
  data: { month: any; [key: string]: number }[];
  dataKey: string;
  strokeColor?: string;
  yDomain?: [number, number];
}

const LineGraph: React.FC<LineGraphProps> = ({
  data,
  dataKey,
  strokeColor = "#3b82f6",
  yDomain = [0, "auto"],
}) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#6b7280" }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 10, fill: "#6b7280" }}
          domain={yDomain}
        />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={strokeColor}
          strokeWidth={2}
          dot={{
            fill: strokeColor,
            strokeWidth: 2,
            r: 3,
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default LineGraph;
