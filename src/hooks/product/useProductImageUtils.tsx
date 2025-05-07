
import { supabase } from "@/supabase/client";

export const useProductImageUtils = () => {
  /**
   * Upload an image to Supabase storage
   */
  const uploadProductImage = async (file: File, productId: string, index: number, isPrimary: boolean) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${productId}-${Date.now()}-${index}.${fileExt}`;
    const filePath = `${fileName}`;
    
    // Upload the image to storage
    const { data: uploadData, error: uploadError } = await supabase
      .storage
      .from('product_images')
      .upload(filePath, file);
      
    if (uploadError) throw uploadError;
    
    // Get the public URL
    const { data: urlData } = await supabase
      .storage
      .from('product_images')
      .getPublicUrl(filePath);
      
    // Create an entry in product_images table
    const { error: imageRecordError } = await supabase
      .from('product_images')
      .insert([{
        product_id: productId,
        url: urlData.publicUrl,
        is_primary: isPrimary
      }]);
      
    if (imageRecordError) throw imageRecordError;
    
    return urlData.publicUrl;
  };

  /**
   * Delete images by IDs
   */
  const deleteProductImages = async (imageIds: string[]) => {
    if (!imageIds.length) return;
    
    const { error } = await supabase
      .from('product_images')
      .delete()
      .in('id', imageIds);
      
    if (error) throw error;
  };

  /**
   * Update primary image status
   */
  const setPrimaryImage = async (productId: string, imageId: string) => {
    // First reset all images to non-primary
    const { error: resetError } = await supabase
      .from('product_images')
      .update({ is_primary: false })
      .eq('product_id', productId);
      
    if (resetError) throw resetError;

    // Set selected image as primary
    const { error: setPrimaryError } = await supabase
      .from('product_images')
      .update({ is_primary: true })
      .eq('id', imageId);
      
    if (setPrimaryError) throw setPrimaryError;
  };

  return {
    uploadProductImage,
    deleteProductImages,
    setPrimaryImage
  };
};
