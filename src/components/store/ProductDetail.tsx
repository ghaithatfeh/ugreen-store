
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ProductWithDetails } from "@/types/product";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

interface ProductDetailProps {
  product: ProductWithDetails | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetail = ({
  product,
  isOpen,
  onClose
}: ProductDetailProps) => {
  const isMobile = useIsMobile();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  if (!product) {
    return null;
  }
  
  // Get all image URLs from the product
  const imageUrls = product.images && product.images.length > 0 
    ? product.images.map(img => img.url)
    : ["https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"]; // Fallback image
  
  const nextImage = () => {
    setCurrentImageIndex(prev => prev === imageUrls.length - 1 ? 0 : prev + 1);
  };
  
  const prevImage = () => {
    setCurrentImageIndex(prev => prev === 0 ? imageUrls.length - 1 : prev - 1);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[900px] p-0 max-h-[90vh] overflow-auto">
        <DialogHeader className="p-2 md:p-4 border-b">
          <DialogTitle className="text-xl flex p-1 items-center">
            {product.name}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:p-6 p-4">
          {/* Image Carousel */}
          <div className="relative aspect-square bg-gray-100 rounded-md overflow-hidden">
            <img 
              src={imageUrls[currentImageIndex]} 
              alt={`${product.name} - Image ${currentImageIndex + 1}`} 
              className="w-full h-full object-cover" 
            />
            
            {/* Navigation arrows */}
            {imageUrls.length > 1 && (
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white shadow-sm" onClick={prevImage}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full bg-white/80 hover:bg-white shadow-sm" onClick={nextImage}>
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            )}
            
            {/* Image indicators */}
            {imageUrls.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex items-center justify-center gap-2">
                {imageUrls.map((_, index) => (
                  <button 
                    key={index} 
                    className={cn(
                      "w-2 h-2 rounded-full transition-all", 
                      currentImageIndex === index ? "bg-ugreen-500 w-4" : "bg-gray-300 hover:bg-gray-400"
                    )} 
                    onClick={() => setCurrentImageIndex(index)} 
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            {product.category && (
              <div className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-ugreen-100 text-ugreen-800 rounded-full">
                {product.category.name}
              </div>
            )}
            
            <h1 className="text-2xl font-bold mb-4">{product.name}</h1>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            <div className="text-3xl font-bold text-ugreen-600 mb-6">
              ${product.price.toFixed(2)}
            </div>
            
            <div className="flex items-center gap-3 mt-auto">
              <Button className="flex-1 bg-ugreen-500 hover:bg-ugreen-600 text-white">
                Add to Cart
              </Button>
              <Button variant="outline" className="flex-1">
                Buy Now
              </Button>
            </div>
          </div>
        </div>

        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
};

export default ProductDetail;
