
import { ProductWithDetails } from "@/types/product";

export type ProductsResponse = {
  data: ProductWithDetails[] | null;
  error: Error | null;
};

export type CategoriesResponse = {
  data: { id: string; name: string }[] | null;
  error: Error | null;
};
