import HeroBanner from "@/components/hero-banner"
import CategoryPreview from "@/components/category-preview"
import { getProductsByCategory, getOnSaleProducts, getFeaturedProducts } from "@/lib/products"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import PromoBanner from "@/components/promo-banner"
import ChristmasCountdown from "@/components/christmas-countdown"
import CategoryShowcase from "@/components/category-showcase"
import ProductCard from "@/components/product-card"

export default function Home() {
  const clothingProducts = getProductsByCategory("clothing")
  const electronicsProducts = getProductsByCategory("electronics")
  const homeDecorProducts = getProductsByCategory("home-decor")
  const toysProducts = getProductsByCategory("toys")
  const kitchenwareProducts = getProductsByCategory("kitchenware")
  const onSaleProducts = getOnSaleProducts()
  const featuredProducts = getFeaturedProducts()

  return (
    <div>
      <PromoBanner />
      <HeroBanner />
      <ChristmasCountdown />
      <CategoryShowcase />

      {/* Featured Products Section */}
      {featuredProducts.length > 0 && (
        <section className="py-8 bg-gradient-to-r from-slate-900 to-slate-800">
          <div className="container">
            <h2 className="text-2xl font-bold text-center mb-8 text-white">
              <span className="text-accent">⭐</span> Featured Products <span className="text-accent">⭐</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Sale Products */}
      <section className="py-12 bg-muted/50">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-8">
            <span className="text-primary">✨</span> Featured Christmas Sale Items{" "}
            <span className="text-primary">✨</span>
          </h2>

          {/* Updated grid to show exactly 3 products per row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {/* First row - 3 products */}
            {onSaleProducts.slice(0, 3).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}

            {/* Second row - 3 products */}
            {onSaleProducts.slice(3, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild className="btn-modern">
              <Link href="/category/clothing">View All Sale Items</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <div id="categories" className="py-8">
        <div className="container">
          <h2 className="text-2xl font-bold text-center mb-12">Shop By Category</h2>
        </div>
      </div>

      <CategoryPreview title="Clothing" icon="👕" products={clothingProducts} slug="clothing" />

      <CategoryPreview title="Electronics" icon="📱" products={electronicsProducts} slug="electronics" />

      <CategoryPreview title="Home Decor" icon="🛋️" products={homeDecorProducts} slug="home-decor" />

      <CategoryPreview title="Toys" icon="🧸" products={toysProducts} slug="toys" />

      <CategoryPreview title="Kitchenware" icon="🍳" products={kitchenwareProducts} slug="kitchenware" />

      {/* Christmas Promotion Banner */}
      <section className="py-12 bg-gradient-to-r from-secondary/90 to-secondary">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="md:w-1/2">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Christmas Special Offers</h2>
              <p className="text-white/90 mb-6">
                Get an extra 10% off when you spend ₱2,000 or more! Use code <span className="font-bold">XMAS10</span>{" "}
                at checkout.
              </p>
              <Button asChild className="bg-white text-secondary hover:bg-white/90 btn-modern">
                <Link href="/category/clothing">Shop Now</Link>
              </Button>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative">
                <div className="text-7xl md:text-9xl">🎄</div>
                <div className="absolute -bottom-4 -right-4 text-5xl md:text-7xl">🎁</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
