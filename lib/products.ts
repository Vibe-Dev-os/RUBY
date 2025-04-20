export type Product = {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  category: string
  image: string
  rating: number
  isOnSale: boolean
  sizes?: string[]
}

// Update the product image URLs to high resolution versions
// Replace the existing image URLs with higher resolution ones

export const products: Product[] = [
  // Clothing
  {
    id: "clothing-1",
    name: "Holiday Sweater",
    description: "Cozy and festive sweater perfect for Christmas gatherings",
    price: 399,
    originalPrice: 599,
    category: "clothing",
    image: "https://images.pexels.com/photos/6207047/pexels-photo-6207047.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "clothing-2",
    name: "Denim Jeans",
    description: "Classic denim jeans in excellent condition",
    price: 450,
    category: "clothing",
    image: "https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.2,
    isOnSale: false,
    sizes: ["28", "30", "32", "34"],
  },
  {
    id: "clothing-3",
    name: "Winter Jacket",
    description: "Warm winter jacket with hood, perfect for cold weather",
    price: 899,
    originalPrice: 1299,
    category: "clothing",
    image: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    isOnSale: true,
    sizes: ["S", "M", "L", "XL"],
  },
  {
    id: "clothing-4",
    name: "Casual T-Shirt",
    description: "Comfortable cotton t-shirt for everyday wear",
    price: 199,
    category: "clothing",
    image: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.0,
    isOnSale: false,
    sizes: ["S", "M", "L", "XL", "XXL"],
  },
  {
    id: "clothing-5",
    name: "Formal Dress",
    description: "Elegant formal dress for special occasions",
    price: 799,
    originalPrice: 1199,
    category: "clothing",
    image: "https://images.pexels.com/photos/1755428/pexels-photo-1755428.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    isOnSale: true,
    sizes: ["S", "M", "L"],
  },
  {
    id: "clothing-6",
    name: "Sports Shorts",
    description: "Breathable sports shorts for active lifestyles",
    price: 249,
    category: "clothing",
    image: "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    isOnSale: false,
    sizes: ["S", "M", "L", "XL"],
  },

  // Electronics
  {
    id: "electronics-1",
    name: "Bluetooth Speaker",
    description: "Portable Bluetooth speaker with excellent sound quality",
    price: 899,
    originalPrice: 1299,
    category: "electronics",
    image: "https://images.pexels.com/photos/1706694/pexels-photo-1706694.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    isOnSale: true,
  },
  {
    id: "electronics-2",
    name: "Wireless Earbuds",
    description: "Comfortable wireless earbuds with noise cancellation",
    price: 1299,
    category: "electronics",
    image: "https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.4,
    isOnSale: false,
  },
  {
    id: "electronics-3",
    name: "Digital Camera",
    description: "High-quality digital camera for photography enthusiasts",
    price: 3999,
    originalPrice: 4999,
    category: "electronics",
    image: "https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    isOnSale: true,
  },
  {
    id: "electronics-4",
    name: "Smart Watch",
    description: "Feature-packed smart watch with health monitoring",
    price: 1499,
    category: "electronics",
    image: "https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    isOnSale: false,
  },
  {
    id: "electronics-5",
    name: "Tablet",
    description: "Versatile tablet for work and entertainment",
    price: 4999,
    originalPrice: 6999,
    category: "electronics",
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: true,
  },
  {
    id: "electronics-6",
    name: "Power Bank",
    description: "High-capacity power bank for charging on the go",
    price: 599,
    category: "electronics",
    image: "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.2,
    isOnSale: false,
  },

  // Home Decor
  {
    id: "home-decor-1",
    name: "Christmas Lights",
    description: "Colorful LED Christmas lights for festive decoration",
    price: 299,
    originalPrice: 499,
    category: "home-decor",
    image: "https://images.pexels.com/photos/250177/pexels-photo-250177.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "home-decor-2",
    name: "Throw Pillows",
    description: "Decorative throw pillows for your living room",
    price: 349,
    category: "home-decor",
    image: "https://images.pexels.com/photos/6444368/pexels-photo-6444368.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    isOnSale: false,
  },
  {
    id: "home-decor-3",
    name: "Wall Clock",
    description: "Stylish wall clock to complement your home decor",
    price: 499,
    originalPrice: 699,
    category: "home-decor",
    image: "https://images.pexels.com/photos/1095601/pexels-photo-1095601.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: true,
  },
  {
    id: "home-decor-4",
    name: "Table Lamp",
    description: "Elegant table lamp for ambient lighting",
    price: 599,
    category: "home-decor",
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.4,
    isOnSale: false,
  },
  {
    id: "home-decor-5",
    name: "Christmas Wreath",
    description: "Festive Christmas wreath for your front door",
    price: 399,
    originalPrice: 599,
    category: "home-decor",
    image: "https://images.pexels.com/photos/6002750/pexels-photo-6002750.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    isOnSale: true,
  },
  {
    id: "home-decor-6",
    name: "Photo Frames",
    description: "Set of decorative photo frames for your memories",
    price: 299,
    category: "home-decor",
    image: "https://images.pexels.com/photos/1099816/pexels-photo-1099816.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.2,
    isOnSale: false,
  },

  // Toys
  {
    id: "toys-1",
    name: "Teddy Bear",
    description: "Soft and cuddly teddy bear for children",
    price: 249,
    originalPrice: 399,
    category: "toys",
    image: "https://images.pexels.com/photos/45903/pexels-photo-45903.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    isOnSale: true,
  },
  {
    id: "toys-2",
    name: "Building Blocks",
    description: "Creative building blocks for imaginative play",
    price: 349,
    category: "toys",
    image:
      "https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: false,
  },
  {
    id: "toys-3",
    name: "Remote Control Car",
    description: "Fun remote control car for kids and adults",
    price: 599,
    originalPrice: 799,
    category: "toys",
    image: "https://images.pexels.com/photos/97353/pexels-photo-97353.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.4,
    isOnSale: true,
  },
  {
    id: "toys-4",
    name: "Board Game",
    description: "Family board game for hours of entertainment",
    price: 399,
    category: "toys",
    image: "https://images.pexels.com/photos/776654/pexels-photo-776654.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    isOnSale: false,
  },
  {
    id: "toys-5",
    name: "Puzzle Set",
    description: "Challenging puzzle set for mental stimulation",
    price: 299,
    originalPrice: 399,
    category: "toys",
    image: "https://images.pexels.com/photos/957312/pexels-photo-957312.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.2,
    isOnSale: true,
  },
  {
    id: "toys-6",
    name: "Doll House",
    description: "Detailed doll house with furniture and accessories",
    price: 899,
    category: "toys",
    image: "https://images.pexels.com/photos/5622879/pexels-photo-5622879.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    isOnSale: false,
  },

  // Kitchenware
  {
    id: "kitchenware-1",
    name: "Cooking Pot Set",
    description: "Durable cooking pot set for your kitchen",
    price: 799,
    originalPrice: 1199,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/4226896/pexels-photo-4226896.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.8,
    isOnSale: true,
  },
  {
    id: "kitchenware-2",
    name: "Knife Set",
    description: "Professional knife set for cooking enthusiasts",
    price: 699,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/4226893/pexels-photo-4226893.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.6,
    isOnSale: false,
  },
  {
    id: "kitchenware-3",
    name: "Coffee Maker",
    description: "Automatic coffee maker for your morning brew",
    price: 899,
    originalPrice: 1299,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/6312089/pexels-photo-6312089.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: true,
  },
  {
    id: "kitchenware-4",
    name: "Blender",
    description: "Powerful blender for smoothies and food preparation",
    price: 599,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/3735238/pexels-photo-3735238.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.3,
    isOnSale: false,
  },
  {
    id: "kitchenware-5",
    name: "Baking Set",
    description: "Complete baking set for holiday treats",
    price: 499,
    originalPrice: 699,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/6287295/pexels-photo-6287295.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.7,
    isOnSale: true,
  },
  {
    id: "kitchenware-6",
    name: "Dinnerware Set",
    description: "Elegant dinnerware set for special occasions",
    price: 899,
    category: "kitchenware",
    image: "https://images.pexels.com/photos/6103188/pexels-photo-6103188.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.4,
    isOnSale: false,
  },
]

// Add a new product for the iPad/tablet shown in the image
export const featuredProducts: Product[] = [
  {
    id: "electronics-7",
    name: "iPad Pro",
    description: "Latest generation iPad with stunning display and powerful performance",
    price: 34999,
    originalPrice: 49999,
    category: "electronics",
    image: "https://images.pexels.com/photos/1334597/pexels-photo-1334597.jpeg?auto=compress&cs=tinysrgb&w=1200",
    rating: 4.5,
    isOnSale: true,
  },
  // Add more featured products as needed
]

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") {
    return products
  }
  return products.filter((product) => product.category.toLowerCase() === category.toLowerCase())
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id) || featuredProducts.find((product) => product.id === id)
}

export function getProductsByIds(ids: string[]): Product[] {
  return products.filter((product) => ids.includes(product.id))
}

export function getOnSaleProducts(): Product[] {
  return products.filter((product) => product.isOnSale)
}

export function getChristmasDeals(): Product[] {
  // Return all products that are on sale with a higher discount percentage
  return products.filter(
    (product) =>
      product.isOnSale &&
      product.originalPrice &&
      (product.originalPrice - product.price) / product.originalPrice >= 0.2,
  )
}

export function getFeaturedProducts(): Product[] {
  return featuredProducts
}

export function formatPrice(price: number): string {
  return `₱${price.toLocaleString()}`
}
