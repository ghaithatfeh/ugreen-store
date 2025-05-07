
export const StoreFooter = () => {
  return (
    <footer className="bg-dark-500 text-white py-8 mt-16">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">UGREEN</h3>
            <p className="text-gray-300 text-sm">
              High-quality tech accessories that enhance your digital life.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-ugreen-400 transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-ugreen-400 transition-colors">Products</a></li>
              <li><a href="#" className="hover:text-ugreen-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-ugreen-400 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase text-gray-400 mb-4">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>Email: support@ugreen.com</li>
              <li>Phone: +1 (800) 123-4567</li>
              <li>Hours: Mon-Fri 9AM-5PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-4 text-sm text-gray-400 text-center">
          &copy; {new Date().getFullYear()} UGREEN. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
