
import { Button } from "@/components/ui/button";

interface ProductFormActionsProps {
  onCancel: () => void;
  isSubmitting: boolean;
}

export const ProductFormActions = ({ onCancel, isSubmitting }: ProductFormActionsProps) => {
  return (
    <div className="flex justify-end gap-3">
      <Button type="button" variant="outline" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" disabled={isSubmitting} className="bg-ugreen-500 hover:bg-ugreen-600">
        {isSubmitting ? "Saving..." : "Save Product"}
      </Button>
    </div>
  );
};
