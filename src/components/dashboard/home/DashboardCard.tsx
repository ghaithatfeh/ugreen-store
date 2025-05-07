
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  value: string | number;
}

const DashboardCard = ({ title, value }: DashboardCardProps) => {
  return (
    <Card>
      <CardHeader className="py-4">
        <CardTitle className="text-sm font-medium text-gray-500">{title}</CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-3xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );
};

export default DashboardCard;
