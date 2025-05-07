
import { useState } from "react";
import { useCreateProduct } from "./product/useCreateProduct";
import { useUpdateProduct } from "./product/useUpdateProduct";
import { useDeleteProduct } from "./product/useDeleteProduct";
import { ProductFormData } from "@/types/product";

export const useProductActions = (
	onSuccess: () => void,
	setIsCreateDialogOpen: (open: boolean) => void,
	setIsEditDialogOpen: (open: boolean) => void
) => {
  // Combine the states and functions from individual hooks
  const { isSubmitting: isCreating, createProduct } = useCreateProduct(onSuccess, setIsCreateDialogOpen);
  const { isSubmitting: isUpdating, updateProduct } = useUpdateProduct(onSuccess, setIsEditDialogOpen);
  const { deleteProduct } = useDeleteProduct(onSuccess);
  
  // Combined submission state
  const isSubmitting = isCreating || isUpdating;
  
  return {
    isSubmitting,
    createProduct,
    updateProduct,
    deleteProduct
  };
};
