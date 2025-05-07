
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Filter, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

interface FiltersProps {
  isMobile?: boolean;
  isSidebarOpen: boolean;
  setIsSidebarOpen: Dispatch<SetStateAction<boolean>>;
  nameFilter: string;
  setNameFilter: Dispatch<SetStateAction<string>>;
  categoryFilters: string[];
  setCategoryFilters: Dispatch<SetStateAction<string[]>>;
  priceRange: [number, number];
  setPriceRange: Dispatch<SetStateAction<[number, number]>>;
  maxPrice: number;
  categories: { id: string; name: string }[];
  isLoading?: boolean;
}

const ProductFilters = ({
  isMobile = false,
  isSidebarOpen,
  setIsSidebarOpen,
  nameFilter,
  setNameFilter,
  categoryFilters,
  setCategoryFilters,
  priceRange,
  setPriceRange,
  maxPrice,
  categories,
  isLoading = false
}: FiltersProps) => {
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>(priceRange);

  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);

  const handleCategoryChange = (categoryId: string) => {
    setCategoryFilters(prev => {
      if (prev.includes(categoryId)) {
        return prev.filter(c => c !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  const handlePriceChange = (value: number[]) => {
    setLocalPriceRange([value[0], value[1] || maxPrice]);
    setPriceRange(localPriceRange);
  };

  const applyPriceFilter = () => {
    setPriceRange(localPriceRange);
  };

  const resetFilters = () => {
    setNameFilter("");
    setCategoryFilters([]);
    setPriceRange([0, maxPrice]);
  };

  const renderCategorySkeletons = () => (
    <>
      {[1, 2, 3, 4, 5].map(i => (
        <div key={i} className="flex items-center space-x-2">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
        </div>
      ))}
    </>
  );

  return (
    <>
      {isMobile && (
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-lg font-medium">Filters</h2>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
      )}
      <Card className="shadow-none border-0">
        <CardHeader className={cn(isMobile ? "px-4" : "px-2")}>
          <CardTitle className="text-lg flex items-center gap-2">
            <Filter className="h-4 w-4" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent className={cn("space-y-6", isMobile ? "px-4" : "px-2")}>
          <div className="space-y-2">
            <Label htmlFor="search">Search</Label>
            <Input
              id="search"
              placeholder="Search products..."
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              className="w-full"
            />
          </div>

          <div className="space-y-3">
            <Label>Price Range</Label>
            <div className="pt-1">
              <Slider
                defaultValue={[localPriceRange[0], localPriceRange[1]]}
                min={0}
                max={maxPrice}
                step={1}
                value={[localPriceRange[0], localPriceRange[1]]}
                onValueChange={handlePriceChange}
              />
            </div>
            <div className="flex align-top justify-between">
              <div className="text-sm">${localPriceRange[0]}</div>
              <div className="text-sm">${localPriceRange[1]}</div>
            </div>
            {/* <Button 
              onClick={applyPriceFilter} 
              className="w-full bg-ugreen-500 hover:bg-ugreen-600 text-white"
            >
              Apply Price
            </Button> */}
          </div>

          <div className="space-y-3">
            <Label>Categories</Label>
            <div className="space-y-2">
              {isLoading ? (
                renderCategorySkeletons()
              ) : categories.length > 0 ? (
                categories.map((category) => (
                  <div key={category.id} className="flex items-center space-x-2">
                    <Checkbox 
                      id={category.id}
                      checked={categoryFilters.includes(category.id)}
                      onCheckedChange={() => handleCategoryChange(category.id)}
                    />
                    <label
                      htmlFor={category.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {category.name}
                    </label>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No categories available</p>
              )}
            </div>
          </div>

          <Button 
            variant="outline" 
            onClick={resetFilters} 
            className="w-full border-ugreen-300 text-ugreen-700 hover:bg-ugreen-50"
          >
            Reset Filters
          </Button>
        </CardContent>
      </Card>
    </>
  );
};

export default ProductFilters;
