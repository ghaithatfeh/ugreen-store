
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryDistributionChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  colors: string[];
}

const CategoryDistributionChart = ({ data, colors }: CategoryDistributionChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Category Distribution</CardTitle>
        <CardDescription>
          Number of products in each category
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px] flex items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryDistributionChart;
