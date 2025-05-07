
import { ProductWithDetails } from "@/types/product";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: ProductWithDetails;
  onClick: (product: ProductWithDetails) => void;
  className?: string;
}

const ProductCard = ({ product, onClick, className }: ProductCardProps) => {
  // Find the primary image or use the first one if no primary is set
  const primaryImage = product.images && product.images.length > 0
    ? product.images.find(img => img.is_primary)?.url || product.images[0].url
    : "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"; // Fallback image

  return (
    <div 
      className={cn(
        "bg-white rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl cursor-pointer animate-fade-in",
        className
      )}
      onClick={() => onClick(product)}
    >
      <div className="aspect-square overflow-hidden bg-gray-100">
        <img
          src={primaryImage}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>
      <div className="p-4">
        {product.category && (
          <div className="inline-block px-2 py-1 mb-2 text-xs font-medium bg-ugreen-100 text-ugreen-800 rounded-full">
            {product.category.name}
          </div>
        )}
        <h3 className="text-lg font-medium mb-1 line-clamp-2">{product.name}</h3>
        <p className="text-muted-foreground text-sm mb-2 line-clamp-2">
          {product.description && product.description.length > 80
            ? `${product.description.substring(0, 80)}...`
            : product.description}
        </p>
        <div className="font-bold text-lg text-ugreen-600">${product.price.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default ProductCard;
