
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ProductWithDetails } from "@/types/product";

interface DeleteProductDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  product: ProductWithDetails | null;
  onConfirm: () => Promise<void>;
}

export const DeleteProductDialog = ({ 
  isOpen, 
  onOpenChange, 
  product, 
  onConfirm 
}: DeleteProductDialogProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Product</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete <strong>{product?.name}</strong>?</p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">Cancel</Button>
          </DialogClose>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={onConfirm}
          >
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
