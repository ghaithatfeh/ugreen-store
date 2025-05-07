
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface CategoryVisitsChartProps {
  data: Array<{
    name: string;
    visits: number;
  }>;
}

const CategoryVisitsChart = ({ data }: CategoryVisitsChartProps) => {
  return (
    <Card className="col-span-1">
      <CardHeader>
        <CardTitle>Category Visits</CardTitle>
        <CardDescription>
          Number of visits per category
        </CardDescription>
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="visits" fill="#5CB176" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default CategoryVisitsChart;
