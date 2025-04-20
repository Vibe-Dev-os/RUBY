"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { products } from "@/lib/products"
import ProductCard from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SearchPage() {
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get("q") || ""

  const [query, setQuery] = useState(initialQuery)
  const [searchResults, setSearchResults] = useState<typeof products>([])
  const [sortBy, setSortBy] = useState("relevance")
  const [category, setCategory] = useState("all")

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "clothing", label: "Clothing" },
    { value: "electronics", label: "Electronics" },
    { value: "home-decor", label: "Home Decor" },
    { value: "toys", label: "Toys" },
    { value: "kitchenware", label: "Kitchenware" },
  ]

  useEffect(() => {
    performSearch()
  }, [initialQuery, sortBy, category])

  const performSearch = () => {
    // Filter by search term and category
    let results = products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())

      const matchesCategory = category === "all" || product.category === category

      return matchesSearch && matchesCategory
    })

    // Sort results
    switch (sortBy) {
      case "price-low":
        results = results.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        results = results.sort((a, b) => b.price - a.price)
        break
      case "rating":
        results = results.sort((a, b) => b.rating - a.rating)
        break
      // For relevance, we keep the default order which prioritizes name matches
      default:
        break
    }

    setSearchResults(results)
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    performSearch()
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">Search Results</h1>

      <div className="mb-8">
        <form onSubmit={handleSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              type="search"
              placeholder="Search products..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-10 border-primary focus-visible:ring-primary"
            />
          </div>
          <Button type="submit" className="bg-primary hover:bg-primary/90">
            Search
          </Button>
        </form>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <p className="text-muted-foreground">
          {searchResults.length} {searchResults.length === 1 ? "result" : "results"} found for "{query}"
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="relevance">Relevance</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mb-4 text-6xl">🔍</div>
          <h2 className="text-xl font-medium mb-2">No results found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find any products matching your search. Try using different keywords or browse our categories.
          </p>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <a href="/">Browse All Products</a>
          </Button>
        </div>
      )}
    </div>
  )
}
