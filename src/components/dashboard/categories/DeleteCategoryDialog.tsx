
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

interface DeleteCategoryDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  category: Category | null;
  onConfirm: () => Promise<void>;
}

export function DeleteCategoryDialog({ 
  isOpen, 
  onOpenChange, 
  category, 
  onConfirm 
}: DeleteCategoryDialogProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleConfirm = async () => {
    setIsDeleting(true);
    await onConfirm();
    setIsDeleting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Category</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p>Are you sure you want to delete <strong>{category?.name}</strong>?</p>
          <p className="text-sm text-gray-500 mt-2">This action cannot be undone.</p>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline" disabled={isDeleting}>Cancel</Button>
          </DialogClose>
          <Button 
            type="button" 
            variant="destructive" 
            onClick={handleConfirm}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
