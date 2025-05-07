
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductFormData, ProductImage } from "@/types/product";
import { toast } from "sonner";

// Create schema for product form validation
const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().optional(),
  price: z.coerce.number().positive("Price must be positive"),
  category_id: z.string().min(1, "Category is required"),
  // We'll handle file validation separately since react-hook-form doesn't handle file inputs well with zod
});

export type ProductFormSchema = z.infer<typeof formSchema>;

interface UseProductFormProps {
  initialData?: ProductFormData;
  existingImages?: ProductImage[];
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export const useProductForm = ({ initialData, existingImages = [], onSubmit }: UseProductFormProps) => {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [primaryImageIndex, setPrimaryImageIndex] = useState<number | undefined>(undefined);
  const [displayedExistingImages, setDisplayedExistingImages] = useState<ProductImage[]>([]);
  const [imagesToDelete, setImagesToDelete] = useState<string[]>([]);
  const [existingPrimaryImageId, setExistingPrimaryImageId] = useState<string | undefined>(undefined);

  // Initialize form with default values or initial data
  const form = useForm<ProductFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: initialData?.price || 0,
      category_id: initialData?.category_id || "",
    },
  });

  // Initialize existing images and primary image only once when component mounts
  // or when existingImages prop changes
  useEffect(() => {
    setDisplayedExistingImages(existingImages);
    const primaryImage = existingImages.find(img => img.is_primary);
    if (primaryImage) {
      setExistingPrimaryImageId(primaryImage.id);
    } else {
      setExistingPrimaryImageId(undefined);
    }
  }, []);

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    const newFiles = Array.from(e.target.files);
    setSelectedImages(prev => [...prev, ...newFiles]);
    
    // If no primary image is selected yet, set the first uploaded image as primary
    if (primaryImageIndex === undefined && selectedImages.length === 0 && displayedExistingImages.length === 0) {
      setPrimaryImageIndex(0);
    }
  };

  // Handle removing a newly selected image
  const handleRemoveImage = (index: number) => {
    setSelectedImages(prev => prev.filter((_, i) => i !== index));
    
    // Update primary image index if needed
    if (primaryImageIndex !== undefined) {
      if (primaryImageIndex === index) {
        // If removing the primary image, set the first remaining image as primary
        setPrimaryImageIndex(selectedImages.length > 1 ? 0 : undefined);
      } else if (primaryImageIndex > index) {
        // If removing an image before the primary image, adjust the index
        setPrimaryImageIndex(primaryImageIndex - 1);
      }
    }
  };

  // Handle removing an existing image
  const handleRemoveExistingImage = (imageId: string) => {
    // Mark the image for deletion
    setImagesToDelete(prev => [...prev, imageId]);
    
    // Remove from displayed images
    setDisplayedExistingImages(prev => prev.filter(img => img.id !== imageId));
    
    // If we're removing the primary image, reset the primary image ID
    if (existingPrimaryImageId === imageId) {
      setExistingPrimaryImageId(undefined);
      
      // Try to set another image as primary
      if (displayedExistingImages.length > 1) {
        const nextImage = displayedExistingImages.find(img => img.id !== imageId);
        if (nextImage) {
          setExistingPrimaryImageId(nextImage.id);
        }
      }
    }
  };

  // Set a newly uploaded image as primary
  const handleSetPrimary = (index: number) => {
    setPrimaryImageIndex(index);
    setExistingPrimaryImageId(undefined); // Unset any existing primary image
  };

  // Set an existing image as primary
  const handleSetExistingPrimary = (imageId: string) => {
    setExistingPrimaryImageId(imageId);
    setPrimaryImageIndex(undefined); // Unset any newly uploaded primary image
  };

  // Handle form submission
  const handleFormSubmit = async (values: ProductFormSchema) => {
    // Validate that there's at least one image (either existing or new)
    if (selectedImages.length === 0 && displayedExistingImages.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    // Combine form values with images
    const formData: ProductFormData = {
      name: values.name,
      description: values.description || "",
      price: values.price,
      category_id: values.category_id,
      images: selectedImages,
      imagesToDelete: imagesToDelete.length > 0 ? imagesToDelete : undefined,
    };

    // Set primary image information
    if (primaryImageIndex !== undefined) {
      formData.primary_image_index = primaryImageIndex;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error("Error submitting product:", error);
      toast.error("Failed to save product");
    }
  };

  return {
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
  };
};
