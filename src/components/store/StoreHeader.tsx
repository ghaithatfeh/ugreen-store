
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

export const StoreHeader = () => {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <header className="bg-white shadow-sm border-b sticky top-0 z-10">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-ugreen-800">UGREEN</h1>
            <Separator orientation="vertical" className="h-6" />
            <span className="text-gray-500">Product Marketplace</span>
          </div>
          
          {isMobile ? (
            <Collapsible open={isOpen} onOpenChange={setIsOpen} className="md:hidden">
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm" className="p-1">
                  {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="absolute top-full left-0 right-0 bg-white border-b shadow-md z-50 animate-fade-in">
                <div className="flex flex-col p-4 space-y-2">
                  <a 
                    href="#" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Home
                  </a>
                  <a 
                    href="#products" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Products
                  </a>
                  <Link 
                    to="" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    About Us
                  </Link>
                  <Link 
                    to="" 
                    className="px-4 py-2 hover:bg-gray-100 rounded-md transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Contact
                  </Link>
                </div>
              </CollapsibleContent>
            </Collapsible>
          ) : (
            <NavigationMenu className="hidden md:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <a href="#" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-100")}>
                    Home
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <a href="#products" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-100")}>
                    Products
                  </a>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-100")}>
                    About Us
                  </Link>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <Link to="" className={cn(navigationMenuTriggerStyle(), "bg-transparent hover:bg-gray-100")}>
                    Contact
                  </Link>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          )}
        </div>
      </div>
    </header>
  );
};
