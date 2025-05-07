
import { useState } from "react";
import { Search, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import { ProductWithDetails } from "@/types/product";

interface ProductTableProps {
  products: ProductWithDetails[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onEditProduct: (product: ProductWithDetails) => void;
  onDeleteProduct: (product: ProductWithDetails) => void;
}

export const ProductTable = ({
  products,
  isLoading,
  searchQuery,
  onSearchChange,
  onEditProduct,
  onDeleteProduct
}: ProductTableProps) => {
  // Filter products based on search query
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (product.category && product.category.name.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead className="hidden md:table-cell">Category</TableHead>
              <TableHead className="hidden md:table-cell">Price</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  Loading...
                </TableCell>
              </TableRow>
            ) : filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-6 text-gray-500">
                  {searchQuery ? "No products found matching your search." : "No products found. Add your first product!"}
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-3">
                      {product.images && product.images.length > 0 ? (
                        <div className="h-10 w-10 rounded-md bg-gray-100 overflow-hidden">
                          <img 
                            src={(product.images.find(img => img.is_primary) || product.images[0]).url} 
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = '/placeholder.svg';
                            }}
                          />
                        </div>
                      ) : (
                        <div className="h-10 w-10 rounded-md bg-gray-100" />
                      )}
                      {product.name}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {product.category?.name || "Uncategorized"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {formatCurrency(product.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditProduct(product)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteProduct(product)}
                        className="h-8 w-8 p-0 border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 size={16} />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
