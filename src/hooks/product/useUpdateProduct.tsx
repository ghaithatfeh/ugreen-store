
import { useState } from "react";
import { toast } from "sonner";
import { supabase } from "@/supabase/client";
import { ProductFormData } from "@/types/product";
import { useProductImageUtils } from "./useProductImageUtils";

export const useUpdateProduct = (onSuccess: () => void, setEditDialogOpen: (open: boolean) => void) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadProductImage, deleteProductImages, setPrimaryImage } = useProductImageUtils();
  
  const updateProduct = async (formData: ProductFormData, productId: string) => {
    if (!productId) return;
    
    setIsSubmitting(true);
    try {
      // 1. Update the product
      const { error: productError } = await supabase
        .from("products")
        .update({
          name: formData.name,
          description: formData.description || null,
          price: formData.price,
          category_id: formData.category_id,
          updated_at: new Date().toISOString()
        })
        .eq("id", productId);

      if (productError) throw productError;

      // 2. Delete images if requested
      if (formData.imagesToDelete && formData.imagesToDelete.length > 0) {
        await deleteProductImages(formData.imagesToDelete);
      }

      // 3. Set primary image among existing images if needed
      if (formData.existingPrimaryImageId) {
        await setPrimaryImage(productId, formData.existingPrimaryImageId);
      }
      
      // 4. Upload new images if any
      if (formData.images.length > 0) {
        const imagePromises = formData.images.map((file, index) => {
          // Only set as primary if there's no existing primary image selected
          const isPrimary = formData.primary_image_index === index && !formData.existingPrimaryImageId;
          return uploadProductImage(file, productId, index, isPrimary);
        });
        
        await Promise.all(imagePromises);
      }
      
      toast.success("Product updated successfully");
      onSuccess(); // Refresh the products list
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    updateProduct
  };
};
