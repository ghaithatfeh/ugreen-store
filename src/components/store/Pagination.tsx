
import {
  Pagination as PaginationRoot,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  pageSize: number;
  onPageSizeChange: (size: number) => void;
  className?: string;
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  pageSize,
  onPageSizeChange,
  className
}: PaginationProps) => {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    
    if (totalPages <= maxPagesToShow) {
      // Show all pages if there are 5 or fewer
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always include first page
      pages.push(1);
      
      // Add middle pages
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);
      
      if (startPage > 2) {
        pages.push(-1); // Represent ellipsis
      }
      
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
      
      if (endPage < totalPages - 1) {
        pages.push(-2); // Represent ellipsis
      }
      
      // Always include last page
      pages.push(totalPages);
    }
    
    return pages;
  };

  return (
    <div className={cn("flex flex-col sm:flex-row items-center justify-between gap-4", className)}>
      <div className="flex items-center gap-2">
        <span className="text-sm text-gray-500">Items per page:</span>
        <Select value={pageSize.toString()} onValueChange={(value) => onPageSizeChange(parseInt(value))}>
          <SelectTrigger className="w-[80px]">
            <SelectValue placeholder={pageSize.toString()} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="6">6</SelectItem>
            <SelectItem value="12">12</SelectItem>
            <SelectItem value="24">24</SelectItem>
            <SelectItem value="48">48</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <PaginationRoot>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) {
                  onPageChange(currentPage - 1);
                }
              }}
              className={cn(
                currentPage === 1 && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
          
          {getPageNumbers().map((pageNumber, i) => (
            <PaginationItem key={i}>
              {pageNumber < 0 ? (
                <Button variant="ghost" size="icon" disabled className="cursor-default">
                  ...
                </Button>
              ) : (
                <PaginationLink 
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    onPageChange(pageNumber);
                  }}
                  isActive={pageNumber === currentPage}
                >
                  {pageNumber}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}
          
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) {
                  onPageChange(currentPage + 1);
                }
              }}
              className={cn(
                currentPage === totalPages && "pointer-events-none opacity-50"
              )}
            />
          </PaginationItem>
        </PaginationContent>
      </PaginationRoot>
    </div>
  );
};

export default Pagination;
