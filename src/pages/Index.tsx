
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ProductWithDetails } from "@/types/product";
import { useQuery } from "@tanstack/react-query";
import { fetchCategories, fetchProducts } from "@/lib/api";
import { toast } from "@/components/ui/use-toast";
import ProductDetail from "@/components/store/ProductDetail";
import { StoreHeader } from "@/components/store/StoreHeader";
import { StoreFooter } from "@/components/store/StoreFooter";
import { ProductGrid } from "@/components/store/ProductGrid";
import { ProductFilterBar } from "@/components/store/ProductFilterBar";
import { StoreHero } from "@/components/store/StoreHero";

const Index = () => {
  const isMobile = useIsMobile();

  const [selectedProduct, setSelectedProduct] = useState<ProductWithDetails | null>(null);
  const [isProductDetailOpen, setIsProductDetailOpen] = useState(false);
  
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  
  // Fetch products from Supabase
  const { data: productsResponse, isLoading: isLoadingProducts, error: productsError } = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts
  });

  // Fetch categories from Supabase
  const { data: categoriesResponse, isLoading: isLoadingCategories } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  });

  // Calculate the max price for the price filter
  const [maxPrice, setMaxPrice] = useState(1000);
  
  useEffect(() => {
    if (productsResponse?.data && productsResponse.data.length > 0) {
      const max = Math.ceil(Math.max(...productsResponse.data.map(p => p.price)));
      setMaxPrice(max);
      setPriceRange([0, max]);
    }
  }, [productsResponse?.data]);

  useEffect(() => {
    // Reset to first page when filters change
    // (Now handled in ProductGrid component)
  }, [nameFilter, categoryFilters, priceRange]);

  // Show error toast if product fetch fails
  useEffect(() => {
    if (productsError) {
      toast({
        title: "Error loading products",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }, [productsError]);

  // Filter products based on current filters
  const filteredProducts = productsResponse?.data 
    ? productsResponse.data.filter(product => {
        // Filter by name
        const nameMatch = product.name.toLowerCase().includes(nameFilter.toLowerCase());
        
        // Filter by category
        const categoryMatch = categoryFilters.length === 0 || 
          (product.category && categoryFilters.includes(product.category.id));
        
        // Filter by price range
        const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
        
        return nameMatch && categoryMatch && priceMatch;
      })
    : [];

  // Handle product click
  const handleProductClick = (product: ProductWithDetails) => {
    setSelectedProduct(product);
    setIsProductDetailOpen(true);
  };

  // Prepare categories for the filter component
  const categories = categoriesResponse?.data || [];

  // Handler for resetting filters
  const handleResetFilters = () => {
    setNameFilter("");
    setCategoryFilters([]);
    setPriceRange([0, maxPrice]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <StoreHeader />
      <StoreHero />
      
      <main className="container-custom py-6">
        <div className="flex flex-col md:flex-row gap-6">
          <ProductFilterBar 
            isMobile={isMobile}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            categoryFilters={categoryFilters}
            setCategoryFilters={setCategoryFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            categories={categories}
            isLoadingCategories={isLoadingCategories}
          />
          {/* Main Content */}
          <ProductGrid 
            isLoading={isLoadingProducts} 
            filteredProducts={filteredProducts}
            handleProductClick={handleProductClick}
            onResetFilters={handleResetFilters}
          />
        </div>
      </main>

      <StoreFooter />

      {/* Product Detail Modal */}
      <ProductDetail
        product={selectedProduct}
        isOpen={isProductDetailOpen}
        onClose={() => setIsProductDetailOpen(false)}
      />
    </div>
  );
};

export default Index;
