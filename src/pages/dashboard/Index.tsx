
import { products, categories } from "@/data/products";
import DashboardCard from "@/components/dashboard/home/DashboardCard";
import CategoryDistributionChart from "@/components/dashboard/home/CategoryDistributionChart";
import CategoryVisitsChart from "@/components/dashboard/home/CategoryVisitsChart";
import DashboardActions from "@/components/dashboard/home/DashboardActions";

const Index = () => {
  // Generate random analytics data for demonstration
  const generateRandomVisits = () => Math.floor(Math.random() * 500) + 100;

  // Mock analytics data
  const categoryData = categories.map(category => {
    const count = products.filter(p => p.category === category).length;
    return {
      name: category,
      value: count,
      visits: generateRandomVisits()
    };
  });

  // Colors for pie chart
  const COLORS = ["#5CB176", "#8FCFA9", "#B2DDC3", "#D0EADA", "#EDF7F0", "#3A8B56", "#2B7745", "#1C6435"];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard title="Total Products" value={products.length} />
        <DashboardCard title="Categories" value={categories.length} />
        <DashboardCard title="Total Visitors" value="2,547" />
        <DashboardCard title="Avg. Session Duration" value="3m 24s" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryDistributionChart data={categoryData} colors={COLORS} />
        <CategoryVisitsChart data={categoryData} />
      </div>

      <div className="mt-8">
        <DashboardActions />
      </div>
    </>
  );
};

export default Index;
