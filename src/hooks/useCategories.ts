
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { z } from "zod";
import { toast } from "sonner";

// Define the category schema
export type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

// Define the form schema for validation
export const categoryFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
});

export const useCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Dialog states
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);

  // Check if user is authenticated
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
        fetchCategories();
      }
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  // Fetch all categories
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) {
        throw error;
      }
      
      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Failed to load categories');
    } finally {
      setIsLoading(false);
    }
  };

  // Create a new category
  const handleCreateCategory = async (values: z.infer<typeof categoryFormSchema>) => {
    try {
      const { error } = await supabase
        .from('categories')
        .insert([{ 
          name: values.name, 
          description: values.description || null 
        }]);
      
      if (error) {
        throw error;
      }
      
      toast.success('Category created successfully');
      setCreateDialogOpen(false);
      fetchCategories();
    } catch (error) {
      console.error('Error creating category:', error);
      toast.error('Failed to create category');
    }
  };

  // Update an existing category
  const handleUpdateCategory = async (values: z.infer<typeof categoryFormSchema>) => {
    if (!currentCategory) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .update({ 
          name: values.name, 
          description: values.description || null,
          updated_at: new Date().toISOString()
        })
        .eq('id', currentCategory.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Category updated successfully');
      setEditDialogOpen(false);
      setCurrentCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error updating category:', error);
      toast.error('Failed to update category');
    }
  };

  // Delete a category
  const handleDeleteCategory = async () => {
    if (!currentCategory) return;
    
    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', currentCategory.id);
      
      if (error) {
        throw error;
      }
      
      toast.success('Category deleted successfully');
      setDeleteDialogOpen(false);
      setCurrentCategory(null);
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Failed to delete category');
    }
  };

  // Edit button handler
  const handleEditClick = (category: Category) => {
    setCurrentCategory(category);
    setEditDialogOpen(true);
  };

  // Delete button handler
  const handleDeleteClick = (category: Category) => {
    setCurrentCategory(category);
    setDeleteDialogOpen(true);
  };

  return {
    categories,
    isLoading,
    isAuthenticated,
    searchQuery,
    setSearchQuery,
    createDialogOpen,
    setCreateDialogOpen,
    editDialogOpen,
    setEditDialogOpen,
    deleteDialogOpen,
    setDeleteDialogOpen,
    currentCategory,
    fetchCategories,
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleEditClick,
    handleDeleteClick
  };
};
