"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Star, Minus, Plus, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getProductById, formatPrice } from "@/lib/products"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ProductReviews, { type Review } from "@/components/product-reviews"
import { Badge } from "@/components/ui/badge"

export default function ProductPage({
  params,
}: {
  params: { id: string }
}) {
  const { id } = params
  const product = getProductById(id)
  const router = useRouter()
  const { addItem } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()

  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState(product?.sizes ? product.sizes[0] : undefined)
  const [reviews, setReviews] = useState<Review[]>([])
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Load reviews from localStorage
    if (typeof window !== "undefined") {
      const savedReviews = JSON.parse(localStorage.getItem(`product-reviews-${id}`) || "[]")
      setReviews(savedReviews)
    }
  }, [id])

  if (!product) {
    router.push("/")
    return null
  }

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 10) {
      setQuantity(newQuantity)
    }
  }

  const handleAddToCart = () => {
    if (!user) {
      toast({
        title: "Please login",
        description: "You need to login before adding items to cart",
        variant: "destructive",
      })
      router.push("/login?redirect=/product/" + id)
      return
    }

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageError ? "/placeholder.svg?height=1200&width=1200" : product.image,
      quantity: quantity,
      category: product.category,
      size: selectedSize,
    })

    toast({
      title: "Added to cart",
      description: `${product.name} added to your cart`,
    })
  }

  const handleBuyNow = () => {
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
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: imageError ? "/placeholder.svg?height=1200&width=1200" : product.image,
      quantity: quantity,
      category: product.category,
      size: selectedSize,
    })

    router.push("/checkout")
  }

  // Function to get a fallback image URL if the original fails
  const getImageUrl = () => {
    if (imageError) {
      return "/placeholder.svg?height=1200&width=1200"
    }

    // Try to use the original image URL but with a different size if it's from Pexels
    if (product.image.includes("pexels.com")) {
      // Extract the photo ID from the URL
      const matches = product.image.match(/photos\/(\d+)\//)
      if (matches && matches[1]) {
        const photoId = matches[1]
        // Use a different size parameter
        return `https://images.pexels.com/photos/${photoId}/pexels-photo-${photoId}.jpeg?auto=compress&cs=tinysrgb&w=1200`
      }
    }

    return product.image || "/placeholder.svg?height=1200&width=1200"
  }

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative">
          {product.isOnSale && <div className="sale-badge">Sale</div>}
          <Image
            src={getImageUrl() || "/placeholder.svg"}
            alt={product.name}
            width={1200}
            height={1200}
            className="w-full h-auto rounded-lg"
            priority={true}
            quality={100}
            onError={() => setImageError(true)}
          />
        </div>

        <div>
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className="text-xs">
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </Badge>
            {product.isOnSale && (
              <Badge variant="secondary" className="text-xs">
                On Sale
              </Badge>
            )}
          </div>

          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < Math.floor(product.rating)
                    ? "text-accent fill-accent"
                    : i < product.rating
                      ? "text-accent-foreground fill-accent-foreground/50"
                      : "text-muted-foreground"
                }`}
              />
            ))}
            <span className="ml-2 text-sm text-muted-foreground">
              ({product.rating}) · {reviews.length} reviews
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-4">
            <span className="text-2xl font-bold">{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className="text-lg text-muted-foreground line-through">{formatPrice(product.originalPrice)}</span>
            )}
            {product.originalPrice && (
              <span className="text-sm text-primary font-medium">
                Save {formatPrice(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <p className="text-muted-foreground mb-6">{product.description}</p>

          <div className="space-y-6">
            {product.sizes && (
              <div>
                <label className="block text-sm font-medium mb-2">Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full max-w-xs">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.sizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium mb-2">Quantity</label>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 10}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-primary hover:bg-primary/90" onClick={handleAddToCart}>
                <ShoppingCart className="mr-2 h-4 w-4" />
                Add to Cart
              </Button>
              <Button variant="secondary" className="flex-1" onClick={handleBuyNow}>
                Buy Now
              </Button>
            </div>
          </div>

          <div className="mt-8 border-t pt-6">
            <h3 className="font-medium mb-2">Product Details</h3>
            <ul className="space-y-1 text-sm text-muted-foreground">
              <li>Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
              <li>Condition: Good (Second-hand)</li>
              <li>Shipping: Available nationwide</li>
              <li>Returns: 7-day return policy</li>
            </ul>
          </div>
        </div>
      </div>

      <ProductReviews productId={id} initialReviews={reviews} />
    </div>
  )
}
