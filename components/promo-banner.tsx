export default function PromoBanner() {
  return (
    <div className="w-full bg-christmas-darkRed py-2 text-white text-center relative overflow-hidden promo-banner">
      <div className="container mx-auto px-4 flex items-center justify-center">
        <span className="mr-2">🎄</span>
        <p className="font-medium">Christmas Sale: Up to 50% Off! Free Shipping on Orders Over ₱1000</p>
        <span className="ml-2">🎁</span>
      </div>
    </div>
  )
}
