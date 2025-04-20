import Link from "next/link"

const categories = [
  { name: "Clothing", icon: "👕", slug: "clothing" },
  { name: "Electronics", icon: "📱", slug: "electronics" },
  { name: "Home Decor", icon: "🛋️", slug: "home-decor" },
  { name: "Toys", icon: "🧸", slug: "toys" },
  { name: "Kitchenware", icon: "🍳", slug: "kitchenware" },
]

export default function CategoryShowcase() {
  return (
    <div className="py-12 bg-background" id="categories">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 flex items-center justify-center">
          <span className="mr-2">🎄</span> Shop by Category <span className="ml-2">🎄</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="group relative overflow-hidden rounded-lg border bg-card hover:bg-muted transition-colors category-card"
            >
              <div className="aspect-square flex flex-col items-center justify-center p-6 text-center">
                <span className="text-4xl mb-4 group-hover:scale-110 transition-transform">{category.icon}</span>
                <h3 className="text-xl font-medium">{category.name}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
