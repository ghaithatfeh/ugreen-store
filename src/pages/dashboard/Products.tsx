
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProducts } from "@/hooks/useProducts";
import { ProductTable } from "@/components/dashboard/products/ProductTable";
import { CreateProductDialog } from "@/components/dashboard/products/CreateProductDialog";
import { EditProductDialog } from "@/components/dashboard/products/EditProductDialog";
import { DeleteProductDialog } from "@/components/dashboard/products/DeleteProductDialog";

const Products = () => {
  const {
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
  } = useProducts();
  
  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Products</CardTitle>
          <Button 
            onClick={() => setIsCreateDialogOpen(true)}
            className="bg-ugreen-500 hover:bg-ugreen-600 flex items-center gap-1"
          >
            <Plus size={16} />
            Add Product
          </Button>
        </CardHeader>
        <CardContent>
          <ProductTable
            products={products}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEditProduct={handleEditClick}
            onDeleteProduct={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {/* Create Product Dialog */}
      <CreateProductDialog
        isOpen={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onSubmit={handleCreateProduct}
        onCancel={handleCancelCreate}
        isSubmitting={isSubmitting}
      />

      {/* Edit Product Dialog */}
      <EditProductDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        product={currentProduct}
        onSubmit={handleUpdateProduct}
        onCancel={handleCancelEdit}
        isSubmitting={isSubmitting}
        getFormDataFromProduct={getFormDataFromProduct}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteProductDialog
        isOpen={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        product={currentProduct}
        onConfirm={handleDeleteProduct}
      />
    </>
  );
};

export default Products;
