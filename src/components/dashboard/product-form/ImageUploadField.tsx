
import { useState } from "react";
import { X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormLabel } from "@/components/ui/form";
import { ProductImage } from "@/types/product";

interface ImageUploadFieldProps {
  selectedImages: File[];
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onSetPrimary: (index: number) => void;
  primaryImageIndex: number | undefined;
  displayedExistingImages: ProductImage[];
  onRemoveExistingImage: (imageId: string) => void;
  onSetExistingPrimary: (imageId: string) => void;
  existingPrimaryImageId: string | undefined;
}

export const ImageUploadField = ({
  selectedImages,
  onImageChange,
  onRemoveImage,
  onSetPrimary,
  primaryImageIndex,
  displayedExistingImages,
  onRemoveExistingImage,
  onSetExistingPrimary,
  existingPrimaryImageId,
}: ImageUploadFieldProps) => {
  return (
    <div className="space-y-2">
      <FormLabel>Product Images</FormLabel>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
        {/* Display existing images */}
        {displayedExistingImages.map((image) => (
          <Card key={image.id} className={`relative overflow-hidden ${existingPrimaryImageId === image.id ? 'ring-2 ring-blue-500' : ''}`}>
            <CardContent className="p-2 h-40 flex items-center justify-center">
              <img
                src={image.url}
                alt="Existing product image"
                className="max-h-full max-w-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.svg';
                }}
              />
              <div className="absolute top-1 right-1 flex gap-1">
                <Button 
                  type="button"
                  variant="destructive"
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => onRemoveExistingImage(image.id)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-1 left-1">
                <Button
                  type="button"
                  size="sm"
                  variant={existingPrimaryImageId === image.id ? "default" : "outline"}
                  onClick={() => onSetExistingPrimary(image.id)}
                  disabled={existingPrimaryImageId === image.id}
                  className={`text-xs ${existingPrimaryImageId === image.id ? 'bg-blue-500 text-white' : ''}`}
                >
                  {existingPrimaryImageId === image.id ? "Primary" : "Set as Primary"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Display newly selected images */}
        {selectedImages.map((file, index) => (
          <Card key={index} className={`relative overflow-hidden ${primaryImageIndex === index ? 'ring-2 ring-blue-500' : ''}`}>
            <CardContent className="p-2 h-40 flex items-center justify-center">
              <img
                src={URL.createObjectURL(file)}
                alt={`Preview ${index}`}
                className="max-h-full max-w-full object-contain"
              />
              <div className="absolute top-1 right-1 flex gap-1">
                <Button 
                  type="button"
                  variant="destructive"
                  size="icon" 
                  className="h-6 w-6"
                  onClick={() => onRemoveImage(index)}
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
              <div className="absolute bottom-1 left-1">
                <Button
                  type="button"
                  size="sm"
                  variant={primaryImageIndex === index ? "default" : "outline"}
                  onClick={() => onSetPrimary(index)}
                  disabled={primaryImageIndex === index}
                  className={`text-xs ${primaryImageIndex === index ? 'bg-blue-500 text-white' : ''}`}
                >
                  {primaryImageIndex === index ? "Primary" : "Set as Primary"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        
        {/* Upload button card */}
        <Card className="relative h-40">
          <CardContent className="p-0 h-full">
            <label className="flex flex-col items-center justify-center cursor-pointer h-full text-center p-4">
              <Upload className="h-8 w-8 mb-2 text-gray-400" />
              <span className="text-sm">Click to upload</span>
              <span className="text-xs text-gray-400">JPG, PNG, WebP</span>
              <Input
                type="file"
                accept="image/*"
                multiple
                onChange={onImageChange}
                className="hidden"
              />
            </label>
          </CardContent>
        </Card>
      </div>

      {selectedImages.length === 0 && displayedExistingImages.length === 0 && (
        <p className="text-sm text-red-500">Please upload at least one image</p>
      )}
    </div>
  );
};
