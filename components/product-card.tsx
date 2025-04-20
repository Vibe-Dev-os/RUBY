"use client"

import type React from "react"
import { useState, useEffect, memo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Star, Heart, ShoppingCart, Eye, Clock } from "lucide-react"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"

interface ProductCardProps {
  product: {
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
    discount?: number
    dealType?: string
    dealEnds?: string
    stockLeft?: number
    tags?: string[]
  }
}

// Using memo to prevent unnecessary re-renders
const ProductCard = memo(function ProductCard({ product }: ProductCardProps) {
  const { id, name, description, price, originalPrice, image, rating, isOnSale, discount, dealEnds, stockLeft } =
    product

  const { user } = useAuth()
  const { addItem } = useCart()
  const { toast } = useToast()
  const router = useRouter()
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [timeLeft, setTimeLeft] = useState<string | null>(null)

  // Check if product is in wishlist
  useEffect(() => {
    if (typeof window !== "undefined" && user) {
      const savedWishlist = localStorage.getItem(`wishlist-${user.id}`)
      if (savedWishlist) {
        const wishlistItems = JSON.parse(savedWishlist)
        setIsInWishlist(wishlistItems.some((item: any) => item.id === id))
      }
    }
  }, [user, id])

  // Update the time left calculation with better error handling
  useEffect(() => {
    if (!dealEnds) return

    const calculateTimeLeft = () => {
      try {
        const endDate = new Date(dealEnds)

        // Check if date is valid
        if (isNaN(endDate.getTime())) {
          console.error("Invalid deal end date:", dealEnds)
          setTimeLeft("Sale ending soon")
          return
        }

        const difference = endDate.getTime() - new Date().getTime()

        if (difference <= 0) {
          setTimeLeft("Expired")
          return
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        if (days > 0) {
          setTimeLeft(`${days}d ${hours}h left`)
        } else if (hours > 0) {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          setTimeLeft(`${hours}h ${minutes}m left`)
        } else {
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
          const seconds = Math.floor((difference % (1000 * 60)) / 1000)
          setTimeLeft(`${minutes}m ${seconds}s left`)
        }
      } catch (error) {
        console.error("Error calculating time left:", error)
        setTimeLeft("Sale ending soon")
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [dealEnds])

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your wishlist",
        variant: "destructive",
      })
      return
    }

    const savedWishlist = localStorage.getItem(`wishlist-${user.id}`)
    let wishlistItems = savedWishlist ? JSON.parse(savedWishlist) : []

    if (isInWishlist) {
      // Remove from wishlist
      wishlistItems = wishlistItems.filter((item: any) => item.id !== id)
      toast({
        title: "Removed from wishlist",
        description: `${name} removed from your wishlist`,
      })
    } else {
      // Add to wishlist
      wishlistItems.push({
        id,
        name,
        price,
        originalPrice,
        image,
        category: product.category,
      })
      toast({
        title: "Added to wishlist",
        description: `${name} added to your wishlist`,
      })
    }

    localStorage.setItem(`wishlist-${user.id}`, JSON.stringify(wishlistItems))
    setIsInWishlist(!isInWishlist)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login to add items to your cart",
        variant: "destructive",
      })
      return
    }

    addItem({
      id,
      name,
      price,
      originalPrice,
      image: imageError ? "/placeholder.svg?height=600&width=600" : image,
      quantity: 1,
      category: product.category,
    })

    toast({
      title: "Added to cart",
      description: `${name} added to your cart`,
    })
  }

  const handleBuyNow = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login before making a purchase",
        variant: "destructive",
      })
      router.push("/login?redirect=/product/" + id)
      return
    }

    addItem({
      id,
      name,
      price,
      originalPrice,
      image: imageError ? "/placeholder.svg?height=600&width=600" : image,
      quantity: 1,
      category: product.category,
    })

    router.push("/checkout")
  }

  // Update the discount percentage calculation with error handling
  const discountPercentage =
    discount || (originalPrice && price ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0)

  // Update the image handling with better error handling
  const handleImageError = () => {
    console.log(`Image error for product ${id}, using placeholder instead`)
    setImageError(true)
    setImageLoaded(true)
  }

  const handleImageLoad = () => {
    setImageLoaded(true)
  }

  // Function to get a fallback image URL if the original fails
  const getImageUrl = () => {
    if (imageError) {
      return "/placeholder.svg?height=600&width=600"
    }

    // Try to use the original image URL but with a different size if it's from Pexels
    if (image.includes("pexels.com")) {
      // Extract the photo ID from the URL
      const matches = image.match(/photos\/(\d+)\//)
      if (matches && matches[1]) {
        const photoId = matches[1]
        // Use a different size parameter
        return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1200`
      }
    }

    return image || "/placeholder.svg?height=600&width=600"
  }

  return (
    <div
      className="group relative overflow-hidden rounded-xl bg-card shadow-sm hover:shadow-md transition-all duration-300 border border-border/50"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-square overflow-hidden">
        {/* Sale badge - Redesigned to match the image */}
        {isOnSale && (
          <div className="absolute top-3 right-3 z-20 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
            {discountPercentage}% OFF
          </div>
        )}

        {/* Wishlist button - Repositioned to match the image */}
        <button
          className={`absolute top-3 left-3 z-30 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
            isInWishlist
              ? "bg-primary text-white"
              : "bg-background/80 backdrop-blur-sm text-foreground hover:bg-primary/20"
          }`}
          onClick={toggleWishlist}
        >
          <Heart className={`h-4 w-4 ${isInWishlist ? "fill-white" : ""}`} />
        </button>

        {/* Product image with Link wrapper to make it clickable */}
        <Link href={`/product/${id}`} className="block h-full z-10 relative">
          {!imageLoaded && (
            <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
              <svg className="w-10 h-10 text-muted-foreground/30" fill="none" viewBox="0 0 24 24">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4"
                ></path>
              </svg>
            </div>
          )}
          <Image
            src={getImageUrl() || "/placeholder.svg"}
            alt={name || "Product image"}
            width={600}
            height={600}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-105 ${
              !imageLoaded ? "opacity-0" : "opacity-100"
            }`}
            onError={handleImageError}
            onLoad={handleImageLoad}
            priority={true}
            unoptimized={true}
          />
        </Link>

        {/* Enhanced hover overlay with additional info */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent flex flex-col items-center justify-center p-4 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Additional product info on hover */}
          <div className="mt-auto w-full space-y-2">
            <Button
              variant="secondary"
              size="sm"
              className="w-full backdrop-blur-sm bg-white/20 hover:bg-white/40 transition-all"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>

            {originalPrice && (
              <div className="text-center text-white text-sm">
                <span className="font-bold">Save {formatPrice(originalPrice - price)}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product details */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <Badge variant="outline" className="text-xs font-medium">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </Badge>
          <div className="flex items-center">
            <Star className="h-3 w-3 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="text-xs font-medium">{rating.toFixed(1)}</span>
          </div>
        </div>

        {/* Product name with Link */}
        <Link href={`/product/${id}`}>
          <h3 className="font-medium text-base line-clamp-1 mt-1 group-hover:text-primary transition-colors">{name}</h3>
        </Link>

        <p className="text-xs text-muted-foreground line-clamp-1 h-4 mt-1">{description}</p>

        <div className="mt-2 flex items-baseline gap-2">
          <span className="font-bold text-base">{formatPrice(price)}</span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">{formatPrice(originalPrice)}</span>
          )}
        </div>

        {/* Deal countdown */}
        {timeLeft && (
          <div className="mt-2 flex items-center text-xs text-amber-500 font-medium">
            <Clock className="h-3 w-3 mr-1" />
            {timeLeft}
          </div>
        )}

        {/* Stock indicator */}
        {stockLeft !== undefined && stockLeft <= 5 && (
          <div className="mt-1 text-xs text-red-500 font-medium">Only {stockLeft} left in stock!</div>
        )}

        {/* Always visible action buttons */}
        <div className="mt-4 grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full flex items-center justify-center" asChild>
            <Link href={`/product/${id}`}>
              <Eye className="mr-1 h-3 w-3" />
              View Details
            </Link>
          </Button>

          <Button
            variant="default"
            size="sm"
            className="w-full bg-primary hover:bg-primary/90"
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              handleBuyNow(e)
            }}
          >
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  )
})

export default ProductCard
