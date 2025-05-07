import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ProductForm } from "@/components/dashboard/product-form/ProductForm";
import { ProductFormData, ProductWithDetails } from "@/types/product";
import { DialogOverlay } from "@radix-ui/react-dialog";

interface EditProductDialogProps {
	isOpen: boolean;
	onOpenChange: (open: boolean) => void;
	product: ProductWithDetails | null;
	onSubmit: (data: ProductFormData) => Promise<void>;
	onCancel: () => void;
	isSubmitting: boolean;
	getFormDataFromProduct: (product: ProductWithDetails) => ProductFormData;
}

export const EditProductDialog = ({
	isOpen,
	onOpenChange,
	product,
	onSubmit,
	onCancel,
	isSubmitting,
	getFormDataFromProduct,
}: EditProductDialogProps) => {
	if (!product) return null;

	return (
		<Dialog open={isOpen} onOpenChange={onOpenChange}>
			<DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-auto">
				<DialogHeader>
					<DialogTitle>Edit Product</DialogTitle>
				</DialogHeader>
					<ProductForm
						initialData={getFormDataFromProduct(product)}
						onSubmit={onSubmit}
						onCancel={onCancel}
						isSubmitting={isSubmitting}
						existingImages={product.images}
					/>
			</DialogContent>
		</Dialog>
	);
};
