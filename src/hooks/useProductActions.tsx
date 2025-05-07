
import { useState } from "react";
import { useCreateProduct } from "./product/useCreateProduct";
import { useUpdateProduct } from "./product/useUpdateProduct";
import { useDeleteProduct } from "./product/useDeleteProduct";
import { ProductFormData } from "@/types/product";

export const useProductActions = (onSuccess: () => void) => {
  // Combine the states and functions from individual hooks
  const { isSubmitting: isCreating, createProduct } = useCreateProduct(onSuccess);
  const { isSubmitting: isUpdating, updateProduct } = useUpdateProduct(onSuccess);
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
