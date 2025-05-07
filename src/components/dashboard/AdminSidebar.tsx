
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, FolderTree, Home, LogOut, ShoppingBag, UserCog } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { supabase } from "@/supabase/client";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  
  // Menu items
  const menuItems = [
    {
      title: "Home",
      url: "/admin",
      icon: Home,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderTree,
    },
    {
      title: "Products",
      url: "/admin/products",
      icon: ShoppingBag,
    },
    {
      title: "Users",
      url: "/admin/users",
      icon: UserCog,
      disabled: true, // Disabled the Users tab
    },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  // Helper function to determine if an item is active
  const isActive = (path: string) => {
    // Exact match for root admin path
    if (path === '/admin' && currentPath === '/admin') {
      return true;
    }
    // Path-based match for sub-routes (avoiding false positives on root path)
    if (path !== '/admin' && currentPath.startsWith(path)) {
      return true;
    }
    return false;
  };

  return (
    <Sidebar variant="inset" className="border-r border-gray-100 bg-dark-500 text-white">
      <SidebarHeader className="py-4 bg-dark-500">
        <div className="text-xl font-bold text-center text-white">Admin Portal</div>
      </SidebarHeader>

      <SidebarContent className="bg-dark-500">
        <SidebarGroup>
          <SidebarGroupLabel className="text-gray-300">Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton 
                    asChild={!item.disabled} 
                    tooltip={item.title} 
                    className={`text-gray-200 hover:bg-dark-400 hover:text-white ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''} 
                      ${isActive(item.url) ? 'bg-dark-400 text-white font-medium' : ''}`}
                    disabled={item.disabled}
                    isActive={isActive(item.url)}
                  >
                    {!item.disabled ? (
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    ) : (
                      <div className="flex items-center gap-1">
                        <item.icon />
                        <span>{item.title}</span>
                      </div>
                    )}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t bg-dark-500 border-dark-400 p-4">
        <div className="space-y-2">
          <SidebarMenuButton 
            asChild 
            variant="outline"
            className="w-full justify-start bg-dark-400 text-gray-200 border-dark-300 hover:bg-dark-300 hover:text-white"
            tooltip="Back to Store"
          >
            <Link to="/">
              <ArrowLeft />
              <span>Back to Store</span>
            </Link>
          </SidebarMenuButton>
          
          <SidebarMenuButton 
            variant="outline"
            className="w-full justify-start text-red-400 hover:text-red-300 border-dark-300 hover:bg-dark-400 bg-dark-400"
            onClick={handleLogout}
            tooltip="Logout"
          >
            <LogOut />
            <span>Logout</span>
          </SidebarMenuButton>
          
          <div className="text-xs text-gray-400 text-center pt-2">
            Admin Dashboard v1.0
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AdminSidebar;
