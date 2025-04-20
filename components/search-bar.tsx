"use client"

import type React from "react"

import { useState, useRef, useEffect, useTransition, useDeferredValue, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { products } from "@/lib/products"
import Image from "next/image"

export function SearchBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<typeof products>([])
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const searchContainerRef = useRef<HTMLDivElement>(null)

  // React 18 features for performance
  const [isPending, startTransition] = useTransition()
  const deferredQuery = useDeferredValue(query)

  // Memoized search function
  const performSearch = useCallback((searchTerm: string) => {
    if (searchTerm.length > 1) {
      // Limit to first 5 matches for better performance
      const matches = products
        .filter(
          (product) =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.category.toLowerCase().includes(searchTerm.toLowerCase()),
        )
        .slice(0, 5)

      return matches
    }
    return []
  }, [])

  // Handle search query changes with deferred value
  useEffect(() => {
    if (deferredQuery.length > 1) {
      startTransition(() => {
        const searchResults = performSearch(deferredQuery)
        setResults(searchResults)
      })
    } else {
      setResults([])
    }
  }, [deferredQuery, performSearch])

  // Focus input when search is opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  // Close search when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) {
      startTransition(() => {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
        setIsOpen(false)
        setQuery("")
      })
    }
  }

  const handleProductClick = (productId: string) => {
    startTransition(() => {
      router.push(`/product/${productId}`)
      setIsOpen(false)
      setQuery("")
    })
  }

  return (
    <div className="relative z-50 flex items-center" ref={searchContainerRef}>
      {!isOpen ? (
        <Button
          variant="ghost"
          size="icon"
          className="christmas-hover"
          onClick={() => setIsOpen(true)}
          aria-label="Open search"
        >
          <Search className="h-5 w-5" />
        </Button>
      ) : (
        // Fixed search bar positioning and alignment - improved to align with navbar
        <div className="absolute right-0 top-1/2 -translate-y-1/2 flex w-[300px] md:w-[400px] items-center bg-background/95 backdrop-blur-sm rounded-md border shadow-md p-1 z-[100]">
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search products..."
                className="pl-10 pr-8 border-none focus-visible:ring-0 w-full h-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              {query && (
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setQuery("")}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="ml-1 flex-shrink-0 h-9 w-9"
              onClick={() => {
                setIsOpen(false)
                setQuery("")
              }}
            >
              <X className="h-5 w-5" />
            </Button>
          </form>
        </div>
      )}

      {/* Quick results dropdown - improved positioning */}
      {isOpen && results.length > 0 && (
        <div className="absolute right-0 top-[calc(100%+8px)] w-[300px] md:w-[400px] bg-card border rounded-md shadow-lg max-h-[60vh] overflow-auto z-[101]">
          <div className="p-3">
            <h3 className="text-sm font-medium mb-2 px-2">Quick Results</h3>
            <div className="space-y-1">
              {results.map((product) => (
                <button
                  key={product.id}
                  className="flex items-center gap-3 p-2 hover:bg-muted rounded-md transition-colors w-full text-left"
                  onClick={() => handleProductClick(product.id)}
                >
                  <div className="w-14 h-14 relative flex-shrink-0 rounded-md overflow-hidden border">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="56px"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.src = "/placeholder.svg?height=56&width=56"
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{product.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{product.category}</p>
                    <p className="text-xs font-semibold text-primary mt-1">{formatPrice(product.price)}</p>
                  </div>
                </button>
              ))}
            </div>
            <div className="mt-3 pt-2 border-t">
              <Button variant="ghost" size="sm" className="w-full text-primary" onClick={handleSearch}>
                See all results
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Loading indicator */}
      {isPending && (
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary/20">
          <div className="h-full bg-primary w-1/3 animate-pulse"></div>
        </div>
      )}
    </div>
  )
}

// Helper function to format price
function formatPrice(price: number): string {
  return `₱${price.toLocaleString()}`
}
