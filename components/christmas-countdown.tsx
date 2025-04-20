"use client"

import { useState, useEffect } from "react"

export default function ChristmasCountdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    // Set Christmas date for the current year
    const calculateChristmasDate = () => {
      const now = new Date()
      const christmasDate = new Date(now.getFullYear(), 11, 25) // Month is 0-indexed, so 11 = December

      // If Christmas has already passed this year, set for next year
      if (now > christmasDate) {
        christmasDate.setFullYear(christmasDate.getFullYear() + 1)
      }

      return christmasDate
    }

    const christmasDate = calculateChristmasDate()

    const updateCountdown = () => {
      const now = new Date()
      const difference = christmasDate.getTime() - now.getTime()

      if (difference <= 0) {
        // Christmas is here!
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }

    // Update immediately
    updateCountdown()

    // Then update every second
    const interval = setInterval(updateCountdown, 1000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-full bg-gradient-to-r from-christmas-darkRed to-christmas-darkGreen py-8 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 text-4xl">🎄</div>
        <div className="absolute bottom-10 right-10 text-4xl">🎁</div>
        <div className="absolute top-1/4 right-1/4 text-4xl">❄️</div>
        <div className="absolute bottom-1/4 left-1/4 text-4xl">🎅</div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-center text-2xl md:text-3xl font-bold text-white mb-6 flex items-center justify-center">
          <span className="mr-2">🎄</span> Christmas Countdown <span className="ml-2">🎅</span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          <div className="countdown-box bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">{timeLeft.days}</div>
            <div className="text-white/90 font-medium">Days</div>
          </div>

          <div className="countdown-box bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">{timeLeft.hours}</div>
            <div className="text-white/90 font-medium">Hours</div>
          </div>

          <div className="countdown-box bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">{timeLeft.minutes}</div>
            <div className="text-white/90 font-medium">Minutes</div>
          </div>

          <div className="countdown-box bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="text-4xl md:text-5xl font-bold text-white">{timeLeft.seconds}</div>
            <div className="text-white/90 font-medium">Seconds</div>
          </div>
        </div>

        <p className="text-center text-white mt-6 text-lg">Order now to receive your gifts before Christmas!</p>
      </div>
    </div>
  )
}
