import Link from "next/link"
import { ChevronRight } from "lucide-react"
import ProductCard from "@/components/product-card"
import type { Product } from "@/lib/products"

interface CategoryPreviewProps {
  title: string
  icon: string
  products: Product[]
  slug: string
}

export default function CategoryPreview({ title, icon, products, slug }: CategoryPreviewProps) {
  // Show only first 6 products in preview (3 per row, 2 rows)
  const previewProducts = products.slice(0, 6)

  return (
    <section className="py-8">
      <div className="container">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <span>{icon}</span> {title}
          </h2>
          <Link href={`/category/${slug}`} className="text-primary flex items-center hover:underline">
            View all <ChevronRight className="h-4 w-4 ml-1" />
          </Link>
        </div>

        {/* Updated grid to show exactly 3 products per row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {/* First row - 3 products */}
          {previewProducts.slice(0, 3).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}

          {/* Second row - 3 products */}
          {previewProducts.slice(3, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  )
}
