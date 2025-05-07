
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/supabase/client";
import { ProductFormData } from "@/types/product";
import { useProductImageUtils } from "./useProductImageUtils";

export const useCreateProduct = (onSuccess: () => void, setCreateDialogOpen: (open: boolean) => void) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { uploadProductImage } = useProductImageUtils();
  
  const createProduct = async (formData: ProductFormData) => {
    setIsSubmitting(true);
    try {
      // 1. Create the product
      const { data: newProduct, error: productError } = await supabase
        .from("products")
        .insert([{
          name: formData.name,
          description: formData.description || null,
          price: formData.price,
          category_id: formData.category_id
        }])
        .select()
        .single();

      if (productError) throw productError;

      // 2. Upload images if any
      const productId = newProduct.id;
      const imagePromises = formData.images.map((file, index) => {
        const isPrimary = formData.primary_image_index === index;
        return uploadProductImage(file, productId, index, isPrimary);
      });
      
      await Promise.all(imagePromises);
      
      toast.success("Product created successfully");
      setCreateDialogOpen(false);
      onSuccess(); // Refresh the products list
    } catch (error) {
      console.error("Error creating product:", error);
      toast.error("Failed to create product");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    createProduct
  };
};
