
import { Button } from "@/components/ui/button";
import { FileSpreadsheet } from "lucide-react";

const DashboardActions = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <Button variant="outline">
        <FileSpreadsheet className="mr-2 h-4 w-4" />
        Export Reports
      </Button>
    </div>
  );
};

export default DashboardActions;
