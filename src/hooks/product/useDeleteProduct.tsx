
import { toast } from "sonner";
import { supabase } from "@/supabase/client";

export const useDeleteProduct = (onSuccess: () => void) => {
  const deleteProduct = async (productId: string) => {
    if (!productId) return;
    
    try {
      // Delete the product (cascade will delete images)
      const { error } = await supabase
        .from("products")
        .delete()
        .eq("id", productId);
        
      if (error) throw error;
      
      toast.success("Product deleted successfully");
      onSuccess(); // Refresh the products list
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product");
    }
  };

  return {
    deleteProduct
  };
};
