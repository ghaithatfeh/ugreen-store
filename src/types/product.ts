
export type Product = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category_id: string | null;
  created_at: string;
  updated_at: string;
};

export type ProductImage = {
  id: string;
  product_id: string;
  url: string;
  is_primary: boolean;
  created_at: string;
};

export type ProductWithDetails = Product & {
  category?: {
    id: string;
    name: string;
  } | null;
  images: ProductImage[];
};

export type ProductFormData = {
  name: string;
  description: string;
  price: number;
  category_id: string;
  images: File[];
  primary_image_index?: number;
  imagesToDelete?: string[];
  existingPrimaryImageId?: string; // Add this field to track which existing image should be primary
};
