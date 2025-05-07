
import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/supabase/client";
import { ProductWithDetails, ProductFormData } from "@/types/product";
import { useProductActions } from "@/hooks/useProductActions";

export const useProducts = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductWithDetails[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  
  // Create/Edit state
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<ProductWithDetails | null>(null);

  // Memoize the fetchProducts function to prevent it from changing on each render
  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase
        .from("products")
        .select("*")
        .order("created_at", { ascending: false });

      if (productsError) throw productsError;

      // Fetch categories to join with products
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("*");

      if (categoriesError) throw categoriesError;

      // Fetch images for all products
      const { data: imagesData, error: imagesError } = await supabase
        .from("product_images")
        .select("*");

      if (imagesError) throw imagesError;

      // Combine the data
      const productsWithDetails: ProductWithDetails[] = productsData.map((product: any) => {
        const category = categoriesData.find(c => c.id === product.category_id);
        const images = imagesData.filter(img => img.product_id === product.id);
        
        return {
          ...product,
          category: category || null,
          images: images || []
        };
      });

      setProducts(productsWithDetails);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Initialize product actions with a callback to refresh products
  const { 
    isSubmitting, 
    createProduct, 
    updateProduct, 
    deleteProduct 
  } = useProductActions(fetchProducts);

  // Handle actions with product forms - these are memoized to prevent re-renders
  const handleCreateProduct = useCallback(async (formData: ProductFormData): Promise<void> => {
    return createProduct(formData);
  }, [createProduct]);
  
  const handleUpdateProduct = useCallback(async (formData: ProductFormData): Promise<void> => {
    if (currentProduct) {
      await updateProduct(formData, currentProduct.id);
      setIsEditDialogOpen(false);
      setCurrentProduct(null);
    }
  }, [currentProduct, updateProduct]);
  
  const handleDeleteProduct = useCallback(async (): Promise<void> => {
    if (currentProduct) {
      await deleteProduct(currentProduct.id);
      setIsDeleteDialogOpen(false);
      setCurrentProduct(null);
    }
  }, [currentProduct, deleteProduct]);

  // Handle edit button click
  const handleEditClick = useCallback((product: ProductWithDetails) => {
    setCurrentProduct(product);
    setIsEditDialogOpen(true);
  }, []);

  // Handle delete button click
  const handleDeleteClick = useCallback((product: ProductWithDetails) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  }, []);

  // Forms
  const getFormDataFromProduct = useCallback((product: ProductWithDetails): ProductFormData => {
    return {
      name: product.name,
      description: product.description || '',
      price: product.price,
      category_id: product.category_id || '',
      images: [], // We can't populate this with File objects from URLs
    };
  }, []);

  // Handle cancel actions for dialogs
  const handleCancelCreate = useCallback(() => {
    setIsCreateDialogOpen(false);
    if (window.location.pathname === "/admin/products/new") {
      navigate('/admin/products');
    }
  }, [navigate]);

  const handleCancelEdit = useCallback(() => {
    setIsEditDialogOpen(false);
    setCurrentProduct(null);
  }, []);

  return {
    products,
    isLoading,
    searchQuery,
    setSearchQuery,
    isCreateDialogOpen, 
    setIsCreateDialogOpen,
    isEditDialogOpen,
    isDeleteDialogOpen,
    currentProduct,
    isSubmitting,
    fetchProducts,
    handleCreateProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleEditClick,
    handleDeleteClick,
    getFormDataFromProduct,
    handleCancelCreate,
    handleCancelEdit,
    setIsEditDialogOpen,
    setIsDeleteDialogOpen
  };
};
