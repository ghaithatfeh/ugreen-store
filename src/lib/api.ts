
import { supabase } from "@/supabase/client";
import { CategoriesResponse, ProductsResponse } from "./types";
import { ProductWithDetails } from "@/types/product";

export const fetchProducts = async (): Promise<ProductsResponse> => {
  try {
    const { data, error } = await supabase
      .from("products")
      .select(`
        *,
        category:category_id (id, name),
        images:product_images (*)
      `);

    if (error) {
      throw error;
    }

    return { data: data as ProductWithDetails[], error: null };
  } catch (error) {
    console.error("Error fetching products:", error);
    return { data: null, error: error as Error };
  }
};

export const fetchCategories = async (): Promise<CategoriesResponse> => {
  try {
    const { data, error } = await supabase
      .from("categories")
      .select("id, name");

    if (error) {
      throw error;
    }

    return { data, error: null };
  } catch (error) {
    console.error("Error fetching categories:", error);
    return { data: null, error: error as Error };
  }
};
