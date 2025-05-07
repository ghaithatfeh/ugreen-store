
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
  mainImage: string;
  images: string[];
}

export const categories = [
  "Chargers",
  "Cables",
  "Adapters",
  "Docks",
  "Power Banks",
  "Audio",
  "Storage"
];

export const products: Product[] = [
  {
    id: 1,
    title: "Ugreen 100W GaN Fast Charger",
    description: "Super fast 100W charger with GaN technology, capable of charging laptops, tablets, and phones simultaneously with 4 ports (3 USB-C, 1 USB-A). Compatible with MacBook Pro, iPad Pro, iPhone, Samsung Galaxy, and more.",
    price: 79.99,
    category: "Chargers",
    mainImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1"
    ]
  },
  {
    id: 2,
    title: "Ugreen USB-C to Lightning Cable",
    description: "Premium braided USB-C to Lightning cable for fast charging and data transfer. MFi certified for iPhone compatibility. 3.3ft (1m) length.",
    price: 19.99,
    category: "Cables",
    mainImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    ]
  },
  {
    id: 3,
    title: "Ugreen USB-C Hub Multiport Adapter",
    description: "7-in-1 USB-C hub with 4K HDMI output, 3 USB 3.0 ports, SD/TF card reader, and 100W Power Delivery charging port. Compatible with MacBook Pro, iPad Pro, and Windows laptops.",
    price: 39.99,
    category: "Adapters",
    mainImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    ]
  },
  {
    id: 4,
    title: "Ugreen Triple Display Docking Station",
    description: "Comprehensive docking station with triple display support, 13 ports including Ethernet, USB-A, USB-C, HDMI, DisplayPort, and audio jack. 100W Power Delivery for laptop charging.",
    price: 129.99,
    category: "Docks",
    mainImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    ]
  },
  {
    id: 5,
    title: "Ugreen 20000mAh Power Bank",
    description: "High-capacity 20000mAh power bank with 65W fast charging capability. Features 3 ports: 2 USB-C and 1 USB-A. Compact design with LED display.",
    price: 69.99,
    category: "Power Banks",
    mainImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ]
  },
  {
    id: 6,
    title: "Ugreen Wireless Earbuds",
    description: "True wireless earbuds with active noise cancellation, touch controls, and 30-hour battery life with charging case. IPX5 water resistance for workouts.",
    price: 59.99,
    category: "Audio",
    mainImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    ]
  },
  {
    id: 7,
    title: "Ugreen USB 3.0 External SSD Enclosure",
    description: "USB 3.0 external enclosure for 2.5-inch SSD and HDD drives. Tool-free installation with up to 5Gbps transfer speeds. Compatible with Windows, macOS, and Linux.",
    price: 24.99,
    category: "Storage",
    mainImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
    ]
  },
  {
    id: 8,
    title: "Ugreen 65W GaN Charger",
    description: "Compact 65W GaN charger with dual USB-C ports. Perfect for charging laptops, tablets, and smartphones. 50% smaller than traditional chargers.",
    price: 49.99,
    category: "Chargers",
    mainImage: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
    images: [
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7"
    ]
  },
  {
    id: 9,
    title: "Ugreen USB-C to DisplayPort Cable",
    description: "High-quality USB-C to DisplayPort cable supporting 8K@60Hz or 4K@144Hz. Compatible with MacBook Pro, iPad Pro, and Windows laptops with USB-C ports.",
    price: 29.99,
    category: "Cables",
    mainImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
    images: [
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    ]
  },
  {
    id: 10,
    title: "Ugreen USB-C to HDMI Adapter",
    description: "USB-C to HDMI adapter supporting 4K@60Hz resolution. Plug-and-play, no drivers needed. Compatible with MacBook, iPad Pro, Samsung Galaxy, and more.",
    price: 19.99,
    category: "Adapters",
    mainImage: "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
    images: [
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    ]
  },
  {
    id: 11,
    title: "Ugreen Laptop Docking Station",
    description: "12-in-1 laptop docking station with dual HDMI, VGA, Ethernet, USB-A, USB-C, SD/TF card reader, and audio jack. 100W Power Delivery for laptop charging.",
    price: 99.99,
    category: "Docks",
    mainImage: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    images: [
      "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
    ]
  },
  {
    id: 12,
    title: "Ugreen 10000mAh Portable Charger",
    description: "Slim 10000mAh power bank with 20W fast charging. Features USB-C and USB-A ports. Compact design perfect for travel and everyday carry.",
    price: 39.99,
    category: "Power Banks",
    mainImage: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
    images: [
      "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
      "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
      "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9"
    ]
  }
];
