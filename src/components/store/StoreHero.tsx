
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const StoreHero = () => {
  return (
    <section className="bg-gradient-to-r from-ugreen-50 to-ugreen-100 py-16 lg:py-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6 text-center md:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ugreen-950">
              Premium Tech Products
              <span className="block text-ugreen-600 mt-2">For Modern Life</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-700 max-w-xl">
              Discover our selection of high-quality tech accessories designed for everyday use with premium materials and thoughtful design.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <a href="#products">
                <Button size="lg" className="rounded-full bg-ugreen-600 hover:bg-ugreen-700">
                  Shop Now
                  <ArrowRight className="ml-2" />
                </Button>
              </a>
              <a href="#products">
                <Button size="lg" variant="outline" className="rounded-full border-ugreen-600 text-ugreen-600">
                  Browse Categories
                </Button>
              </a>
            </div>
          </div>
          
          <div className="flex-1 relative">
            <div className="relative bg-white p-4 rounded-2xl shadow-xl rotate-3 transition-all hover:rotate-0">
              <img 
                src="https://www.ugreen.com/cdn/shop/files/pc_88bf5cfb-8ee4-45fc-80a5-ddc9bc2de8be_1920x.png?v=1741758561" 
                alt="UGREEN Products" 
                className="rounded-xl h-64 md:h-80 w-full object-cover"
              />
              <div className="absolute -bottom-4 -right-4 bg-ugreen-500 text-white p-4 rounded-full text-xl font-bold shadow-lg">
                New
              </div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 bg-white p-3 rounded-xl shadow-lg hidden md:block">
              <div className="flex items-center gap-2">
                <div className="bg-ugreen-100 p-2 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ugreen-600">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <div>
                  <p className="font-medium text-gray-800">Customer Love</p>
                  <p className="text-sm text-gray-500">4.9 Star Rating</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
