
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, TooltipProps } from 'recharts';

interface TrendsChartProps {
  data: {
    date: string;
    feedbacks: number;
    rewards: number;
  }[];
  title: string;
}

const TrendsChart: React.FC<TrendsChartProps> = ({ data, title }) => {
  const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-card p-3 border border-border/40 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-white">{label}</p>
          <p className="text-sm text-tellnearn-yellow">
            Feedbacks: {payload[0].value}
          </p>
          <p className="text-sm text-green-500">
            Rewards: ${payload[1].value}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="bg-secondary border-border/40">
      <CardHeader>
        <CardTitle className="text-white">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{ top: 5, right: 10, left: 0, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#333" />
              <XAxis 
                dataKey="date" 
                stroke="#888" 
                tick={{ fill: '#888' }}
                tickLine={{ stroke: '#888' }}
              />
              <YAxis 
                stroke="#888" 
                tick={{ fill: '#888' }}
                tickLine={{ stroke: '#888' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line 
                type="monotone" 
                dataKey="feedbacks" 
                stroke="#FFD60A" 
                strokeWidth={2} 
                dot={{ fill: '#FFD60A', r: 4 }}
                activeDot={{ r: 6 }}
              />
              <Line 
                type="monotone" 
                dataKey="rewards" 
                stroke="#10B981" 
                strokeWidth={2} 
                dot={{ fill: '#10B981', r: 4 }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrendsChart;
