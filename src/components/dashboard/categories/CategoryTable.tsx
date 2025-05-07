
import { useState } from "react";
import { Pencil, Trash2, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableHeader, 
  TableRow, 
  TableHead, 
  TableBody, 
  TableCell 
} from "@/components/ui/table";

type Category = {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
  updated_at: string;
};

interface CategoryTableProps {
  categories: Category[];
  isLoading: boolean;
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onEditClick: (category: Category) => void;
  onDeleteClick: (category: Category) => void;
}

export const CategoryTable = ({
  categories,
  isLoading,
  searchQuery,
  onSearchChange,
  onEditClick,
  onDeleteClick,
}: CategoryTableProps) => {
  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <>
      <div className="mb-4">
        <div className="relative">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search categories..."
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
              <TableHead className="min-w-32">Name</TableHead>
              <TableHead className="hidden md:table-cell">Description</TableHead>
              <TableHead className="min-w-32">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCategories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                  {isLoading ? "Loading..." : "No categories found."}
                </TableCell>
              </TableRow>
            ) : (
              filteredCategories.map((category) => (
                <TableRow key={category.id}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {category.description || "-"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEditClick(category)}
                        className="h-8 w-8 p-0"
                      >
                        <Pencil size={16} />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDeleteClick(category)}
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
    </>
  );
};
