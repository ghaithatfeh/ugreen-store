
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Filter as FilterIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import ProductFilters from "@/components/store/ProductFilters";

interface ProductFilterBarProps {
  isMobile: boolean;
  nameFilter: string;
  setNameFilter: (value: string) => void;
  categoryFilters: string[];
  setCategoryFilters: (value: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  maxPrice: number;
  categories: { id: string; name: string }[];
  isLoadingCategories: boolean;
}

export const ProductFilterBar = ({
  isMobile,
  nameFilter,
  setNameFilter,
  categoryFilters,
  setCategoryFilters,
  priceRange,
  setPriceRange,
  maxPrice,
  categories,
  isLoadingCategories
}: ProductFilterBarProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(!isMobile);

  useEffect(() => {
    // Close sidebar on mobile by default
    setIsSidebarOpen(!isMobile);
  }, [isMobile]);

  return (
    <>
      {/* Mobile filter button */}
      {isMobile && (
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Products</h2>
          <Button 
            variant="outline" 
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-2"
          >
            <FilterIcon className="h-4 w-4" />
            Filters
          </Button>
        </div>
      )}

      {/* Sidebar - Desktop */}
      {!isMobile && (
        <div className="w-full md:w-64 lg:w-72 shrink-0">
          <ProductFilters
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
            nameFilter={nameFilter}
            setNameFilter={setNameFilter}
            categoryFilters={categoryFilters}
            setCategoryFilters={setCategoryFilters}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            maxPrice={maxPrice}
            categories={categories}
            isLoading={isLoadingCategories}
          />
        </div>
      )}

      {/* Sidebar - Mobile */}
      {isMobile && (
        <div 
          className={cn(
            "fixed inset-0 bg-black bg-opacity-50 z-40",
            isSidebarOpen ? "block" : "hidden"
          )}
          onClick={() => setIsSidebarOpen(false)}
        >
          <div 
            className={cn(
              "fixed inset-y-0 left-0 w-80 max-w-full bg-white transform transition-transform duration-300 z-50",
              isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <ProductFilters
              isMobile
              isSidebarOpen={isSidebarOpen}
              setIsSidebarOpen={setIsSidebarOpen}
              nameFilter={nameFilter}
              setNameFilter={setNameFilter}
              categoryFilters={categoryFilters}
              setCategoryFilters={setCategoryFilters}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              maxPrice={maxPrice}
              categories={categories}
              isLoading={isLoadingCategories}
            />
          </div>
        </div>
      )}
    </>
  );
};
