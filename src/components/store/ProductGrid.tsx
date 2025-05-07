
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Grid2x2, Grid3x3, GridIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCard from "@/components/store/ProductCard";
import Pagination from "@/components/store/Pagination";
import { ProductWithDetails } from "@/types/product";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductGridProps {
  isLoading: boolean;
  filteredProducts: ProductWithDetails[];
  handleProductClick: (product: ProductWithDetails) => void;
  onResetFilters: () => void;
}

export const ProductGrid = ({
  isLoading,
  filteredProducts,
  handleProductClick,
  onResetFilters,
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(12);
  const [selectedGridIndex, setSelectedGridIndex] = useState(0);
  const isMobile = useIsMobile();

  const grids = [
    { icon: Grid2x2, columns: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4", label: "4 columns" },
    { icon: Grid3x3, columns: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3", label: "3 columns" },
    { icon: GridIcon, columns: "grid-cols-1 md:grid-cols-2", label: "2 columns" },
  ];

  // Calculate pagination
  const totalItems = filteredProducts?.length || 0;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedProducts = filteredProducts?.slice(startIndex, startIndex + pageSize) || [];

  // Render loading skeletons
  const renderSkeletons = () => {
    return Array(6).fill(0).map((_, i) => (
      <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
        <div className="aspect-square bg-gray-200" />
        <div className="p-4 space-y-3">
          <div className="h-2 w-16 bg-gray-200 rounded" />
          <div className="h-4 w-full bg-gray-200 rounded" />
          <div className="h-3 w-3/4 bg-gray-200 rounded" />
          <div className="h-5 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    ));
  };

  return (
    <div id="products" className="flex-1">
      <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">
              {isLoading ? (
                <Skeleton className="h-6 w-24" />
              ) : (
                `${totalItems} ${totalItems === 1 ? "Product" : "Products"}`
              )}
            </h2>
            <p className="text-sm text-muted-foreground">
              Browse our collection of premium UGREEN products
            </p>
          </div>
          
          {!isMobile && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground mr-1">View:</span>
              {grids.map((grid, index) => (
                <Button
                  key={index}
                  variant={selectedGridIndex === index ? "default" : "outline"}
                  size="icon"
                  className={selectedGridIndex === index ? "bg-ugreen-500 hover:bg-ugreen-600" : ""}
                  onClick={() => setSelectedGridIndex(index)}
                >
                  <grid.icon className="h-4 w-4" />
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {isLoading ? (
        <div className={cn(
          "grid gap-4 md:gap-6", 
          grids[selectedGridIndex].columns
        )}>
          {renderSkeletons()}
        </div>
      ) : filteredProducts && filteredProducts.length > 0 ? (
        <>
          <div className={cn(
            "grid gap-4 md:gap-6", 
            grids[selectedGridIndex].columns
          )}>
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={handleProductClick}
              />
            ))}
          </div>
          
          {totalItems > pageSize && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
                pageSize={pageSize}
                onPageSizeChange={setPageSize}
              />
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border p-12 text-center">
          <h3 className="text-xl font-semibold mb-2">No products found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filter criteria
          </p>
          <Button 
            variant="outline" 
            onClick={onResetFilters}
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
};
