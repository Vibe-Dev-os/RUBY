"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { formatPrice } from "@/lib/products"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { Smartphone, Building, Truck } from "lucide-react"

type PaymentMethod = "gcash" | "bank" | "cod"

type CheckoutFormData = {
  fullName: string
  email: string
  phone: string
  address: string
  city: string
  paymentMethod: PaymentMethod
  gcashNumber?: string
  bankName?: string
  accountNumber?: string
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: user?.name || "",
    email: user?.email || "",
    phone: "",
    address: "",
    city: "",
    paymentMethod: "gcash",
    gcashNumber: "",
    bankName: "",
    accountNumber: "",
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push("/login?redirect=/checkout")
    }
  }, [user, router])

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart")
    }
  }, [items, router])

  if (!user || items.length === 0) {
    return null
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name as keyof CheckoutFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  const handlePaymentMethodChange = (value: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {}

    // Required fields for all payment methods
    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required"
    if (!formData.address.trim()) newErrors.address = "Address is required"
    if (!formData.city.trim()) newErrors.city = "City is required"

    // Payment method specific validation
    if (formData.paymentMethod === "gcash" && !formData.gcashNumber?.trim()) {
      newErrors.gcashNumber = "GCash number is required"
    }

    if (formData.paymentMethod === "bank") {
      if (!formData.bankName?.trim()) newErrors.bankName = "Bank name is required"
      if (!formData.accountNumber?.trim()) newErrors.accountNumber = "Account number is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      toast({
        title: "Please check your information",
        description: "Some required fields are missing or invalid",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate payment processing
    setTimeout(() => {
      clearCart()
      router.push("/payment-success")
    }, 1500)
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4">
                <h2 className="font-medium">Shipping Information</h2>
              </div>

              <div className="p-6 grid gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className={errors.fullName ? "border-destructive" : ""}
                    />
                    {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={errors.email ? "border-destructive" : ""}
                    />
                    {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={errors.phone ? "border-destructive" : ""}
                  />
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? "border-destructive" : ""}
                  />
                  {errors.address && <p className="text-sm text-destructive">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className={errors.city ? "border-destructive" : ""}
                    />
                    {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted px-6 py-4">
                <h2 className="font-medium">Payment Method</h2>
              </div>

              <div className="p-6">
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={(value) => handlePaymentMethodChange(value as PaymentMethod)}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="gcash" id="gcash" />
                    <Label htmlFor="gcash" className="flex items-center cursor-pointer">
                      <Smartphone className="h-5 w-5 mr-2 text-primary" />
                      GCash
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label htmlFor="bank" className="flex items-center cursor-pointer">
                      <Building className="h-5 w-5 mr-2 text-primary" />
                      Bank Transfer
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2 border rounded-lg p-4">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center cursor-pointer">
                      <Truck className="h-5 w-5 mr-2 text-primary" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {formData.paymentMethod === "gcash" && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <div className="space-y-2">
                      <Label htmlFor="gcashNumber">GCash Number</Label>
                      <Input
                        id="gcashNumber"
                        name="gcashNumber"
                        value={formData.gcashNumber || ""}
                        onChange={handleInputChange}
                        placeholder="09XX XXX XXXX"
                        className={errors.gcashNumber ? "border-destructive" : ""}
                      />
                      {errors.gcashNumber && <p className="text-sm text-destructive">{errors.gcashNumber}</p>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "bank" && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="bankName">Bank Name</Label>
                      <Input
                        id="bankName"
                        name="bankName"
                        value={formData.bankName || ""}
                        onChange={handleInputChange}
                        placeholder="e.g. BDO, BPI, Metrobank"
                        className={errors.bankName ? "border-destructive" : ""}
                      />
                      {errors.bankName && <p className="text-sm text-destructive">{errors.bankName}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="accountNumber">Account Number / Reference</Label>
                      <Input
                        id="accountNumber"
                        name="accountNumber"
                        value={formData.accountNumber || ""}
                        onChange={handleInputChange}
                        className={errors.accountNumber ? "border-destructive" : ""}
                      />
                      {errors.accountNumber && <p className="text-sm text-destructive">{errors.accountNumber}</p>}
                    </div>
                  </div>
                )}

                {formData.paymentMethod === "cod" && (
                  <div className="mt-4 p-4 border rounded-lg bg-muted/50">
                    <p className="text-sm text-muted-foreground">
                      Pay with cash upon delivery. Our delivery partner will collect the payment.
                    </p>
                  </div>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full" size="lg" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Place Order"}
            </Button>
          </form>
        </div>

        <div>
          <div className="border rounded-lg overflow-hidden sticky top-20">
            <div className="bg-muted px-6 py-4">
              <h2 className="font-medium">Order Summary</h2>
            </div>

            <div className="p-6">
              <div className="space-y-4 max-h-80 overflow-y-auto mb-4">
                {items.map((item) => (
                  <div key={`${item.id}-${item.size || "default"}`} className="flex gap-3">
                    <div className="w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover rounded-md"
                      />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.size && <p className="text-xs text-muted-foreground">Size: {item.size}</p>}
                      <div className="flex justify-between mt-1">
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                        <p className="text-sm">{formatPrice(item.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-3 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{formatPrice(50)}</span>
                </div>

                <div className="border-t pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-lg">{formatPrice(totalPrice + 50)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
