
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/dashboard/product-form/ProductForm";
import { ProductFormData } from "@/types/product";

interface CreateProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
}

export const CreateProductDialog = ({ 
  isOpen, 
  onOpenChange, 
  onSubmit,
  onCancel, 
  isSubmitting 
}: CreateProductDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Create New Product</DialogTitle>
        </DialogHeader>
        <ProductForm
          onSubmit={onSubmit}
          onCancel={onCancel}
          isSubmitting={isSubmitting}
        />
      </DialogContent>
    </Dialog>
  );
};
