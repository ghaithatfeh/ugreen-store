
import { useEffect, useState } from "react";
import { useLocation, useNavigate, Outlet } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { supabase } from "@/supabase/client";
import AdminSidebar from "@/components/dashboard/AdminSidebar";

const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  
  // Determine the title based on the current path
  const getTitle = () => {
    const path = location.pathname;
    
    if (path === "/admin") return "Dashboard";
    if (path === "/admin/categories") return "Categories";
    if (path === "/admin/products") return "Products";
    
    return "Admin Dashboard";
  };

  useEffect(() => {
    const checkSession = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      
      if (!data.session) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
      setIsLoading(false);
    };

    checkSession();

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT' || !session) {
        navigate("/admin/login");
      } else {
        setIsAuthenticated(true);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <SidebarProvider>
      <div className="flex w-full bg-gray-50">
        <AdminSidebar />
        
        <div className="flex-1">
          <header className="bg-white shadow">
            <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <h1 className="text-2xl font-bold text-gray-900">{getTitle()}</h1>
              </div>
            </div>
          </header>

          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default AdminLayout;
