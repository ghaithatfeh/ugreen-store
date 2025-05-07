
import { Form } from "@/components/ui/form";
import { ProductFormData, ProductImage } from "@/types/product";
import { NameField } from "./NameField";
import { CategoryField } from "./CategoryField";
import { PriceField } from "./PriceField";
import { DescriptionField } from "./DescriptionField";
import { ImageUploadField } from "./ImageUploadField";
import { ProductFormActions } from "./ProductFormActions";
import { useProductForm } from "./useProductForm";

type ProductFormProps = {
  initialData?: ProductFormData;
  onSubmit: (data: ProductFormData) => Promise<void>;
  onCancel: () => void;
  isSubmitting: boolean;
  existingImages?: ProductImage[];
};

export const ProductForm = ({ initialData, onSubmit, onCancel, isSubmitting, existingImages = [] }: ProductFormProps) => {
  const {
    form,
    selectedImages,
    primaryImageIndex,
    displayedExistingImages,
    existingPrimaryImageId,
    handleImageChange,
    handleRemoveImage,
    handleRemoveExistingImage,
    handleSetPrimary,
    handleSetExistingPrimary,
    handleFormSubmit,
  } = useProductForm({ initialData, existingImages, onSubmit });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmit)} className="space-y-6">
        <NameField control={form.control} />
        <CategoryField control={form.control} />
        <PriceField control={form.control} />
        <DescriptionField control={form.control} />

        {/* Image Upload */}
        <ImageUploadField
          selectedImages={selectedImages}
          onImageChange={handleImageChange}
          onRemoveImage={handleRemoveImage}
          onSetPrimary={handleSetPrimary}
          primaryImageIndex={primaryImageIndex}
          displayedExistingImages={displayedExistingImages}
          onRemoveExistingImage={handleRemoveExistingImage}
          onSetExistingPrimary={handleSetExistingPrimary}
          existingPrimaryImageId={existingPrimaryImageId}
        />

        {/* Form Actions */}
        <ProductFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};
