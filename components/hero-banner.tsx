import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Gift, ChevronRight } from "lucide-react"

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-christmas-darkRed to-christmas-darkGreen py-16 md:py-24">
      <div className="absolute inset-0 z-0 opacity-20">
        {/* Christmas pattern background */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-10"></div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 text-4xl">🎄</div>
        <div className="absolute bottom-10 right-10 text-4xl">🎁</div>
        <div className="absolute top-1/4 right-1/4 text-4xl">❄️</div>
        <div className="absolute bottom-1/4 left-1/4 text-4xl">🎅</div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block bg-accent text-accent-foreground px-4 py-2 rounded-full mb-4 animate-pulse">
            <Gift className="inline-block h-5 w-5 mr-2" />
            <span className="font-medium">Christmas Sale is Live!</span>
          </div>

          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            🎁 Big Holiday Sale — Up to 50% Off This Christmas!
          </h1>

          <p className="text-lg md:text-xl text-white/90 mb-8">
            Find amazing deals on second-hand and budget-friendly items. Perfect gifts for everyone without breaking the
            bank!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-white text-christmas-darkRed hover:bg-white/90">
              <Link href="/category/clothing">
                Shop Now <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="border-white text-white hover:bg-white/10">
              <Link href="#categories">Explore Categories</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
