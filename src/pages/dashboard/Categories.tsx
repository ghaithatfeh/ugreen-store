
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCategories } from "@/hooks/useCategories";
import { CategoryTable } from "@/components/dashboard/categories/CategoryTable";
import { CategoryFormDialog } from "@/components/dashboard/categories/CategoryFormDialog";
import { DeleteCategoryDialog } from "@/components/dashboard/categories/DeleteCategoryDialog";

const Categories = () => {
  const {
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
    handleCreateCategory,
    handleUpdateCategory,
    handleDeleteCategory,
    handleEditClick,
    handleDeleteClick
  } = useCategories();

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Manage Categories</CardTitle>
          <Button 
            onClick={() => setCreateDialogOpen(true)}
            className="bg-ugreen-500 hover:bg-ugreen-600 flex items-center gap-1"
          >
            <Plus size={16} />
            Add Category
          </Button>
        </CardHeader>
        <CardContent>
          <CategoryTable
            categories={categories}
            isLoading={isLoading}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onEditClick={handleEditClick}
            onDeleteClick={handleDeleteClick}
          />
        </CardContent>
      </Card>

      {/* Create Category Dialog */}
      <CategoryFormDialog
        isOpen={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
        onSubmit={handleCreateCategory}
        title="Create New Category"
        submitLabel="Create"
      />

      {/* Edit Category Dialog */}
      <CategoryFormDialog
        isOpen={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSubmit={handleUpdateCategory}
        title="Edit Category"
        submitLabel="Update"
        initialValues={{
          name: currentCategory?.name || "",
          description: currentCategory?.description || ""
        }}
      />

      {/* Delete Category Dialog */}
      <DeleteCategoryDialog
        isOpen={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        category={currentCategory}
        onConfirm={handleDeleteCategory}
      />
    </>
  );
};

export default Categories;
