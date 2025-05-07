
import { useEffect, useState } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { supabase } from "@/supabase/client";
import { toast } from "sonner";
import { Control } from "react-hook-form";

interface Category {
  id: string;
  name: string;
  description: string | null;
}

interface CategoryFieldProps {
  control: Control<any>;
}

export const CategoryField = ({ control }: CategoryFieldProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  // Fetch categories for the dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const { data, error } = await supabase
          .from("categories")
          .select("*")
          .order("name");
        
        if (error) throw error;
        setCategories(data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        toast.error("Failed to load categories");
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);
  
  return (
    <FormField
      control={control}
      name="category_id"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Category</FormLabel>
          <FormControl>
            <select
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              disabled={isLoadingCategories}
              {...field}
            >
              <option value="" disabled>
                {isLoadingCategories ? "Loading categories..." : "Select a category"}
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
