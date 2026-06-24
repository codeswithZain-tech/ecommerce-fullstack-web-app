"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Shield, Headphones, Truck } from "lucide-react"

export default function ShoppingCart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "T-shirts with multiple colors, for men and lady",
      seller: "Artel Market",
      color: "Blue",
      material: "Plastic",
      size: "Medium",
      price: 78.99,
      quantity: 1,
      image: "/images/products/suit.png",
    },
    {
      id: 2,
      name: "T-shirts with multiple colors, for men and lady",
      seller: "Artel Market",
      color: "Red",
      material: "Plastic",
      size: "Large",
      price: 39.0,
      quantity: 2,
      image: "/images/products/backpack.png",
    },
    {
      id: 3,
      name: "T-shirts with multiple colors, for men and lady",
      seller: "Artel Market",
      color: "Blue",
      material: "Plastic",
      size: "Medium",
      price: 170.0,
      quantity: 1,
      image: "/images/products/wallet.png",
    },
  ])

  const [couponCode, setCouponCode] = useState("")
  const [savedItems] = useState([
    { id: 1, name: "GoPro HERO8 4K Action Camera - Black", price: 99.5, image: "/images/products/laptop.png" },
    { id: 2, name: "GoPro HERO8 4K Action Camera - Black", price: 99.5, image: "/images/products/smartphone.png" },
    { id: 3, name: "GoPro HERO8 4K Action Camera - Black", price: 99.5, image: "/images/products/smartwatch.png" },
    { id: 4, name: "GoPro HERO8 4K Action Camera - Black", price: 99.5, image: "/images/products/tablet.png" },
  ])

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const discount = 60.0
  const total = subtotal - discount

  return (
    <div className="mx-auto py-6" style={{ width: "1180px" }}>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <h1 className="text-2xl font-bold mb-6">My cart ({cartItems.length})</h1>

          <div className="space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg p-4 flex items-center space-x-4">
                <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-20 h-20 object-contain" />

                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 mb-1">{item.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Size: {item.size}, Color: {item.color}, Material: {item.material}
                  </p>
                  <p className="text-sm text-gray-600">Seller: {item.seller}</p>

                  <div className="flex items-center space-x-4 mt-3">
                    <button className="text-red-600 text-sm hover:underline">Remove</button>
                    <button className="text-blue-600 text-sm hover:underline">Save for later</button>
                  </div>
                </div>

                <div className="text-right">
                  <p className="font-semibold text-lg mb-2">${item.price}</p>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Qty:</span>
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-3 py-1">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mt-6">
            <Button variant="outline" className="flex items-center space-x-2">
              <span>← Back to shop</span>
            </Button>
            <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
              Remove all
            </Button>
          </div>

          {/* Service Features */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Shield className="w-8 h-8 text-gray-600" />
              <div>
                <h4 className="font-medium">Secure payment</h4>
                <p className="text-sm text-gray-600">Have you ever finally just</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Headphones className="w-8 h-8 text-gray-600" />
              <div>
                <h4 className="font-medium">Customer support</h4>
                <p className="text-sm text-gray-600">Have you ever finally just</p>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Truck className="w-8 h-8 text-gray-600" />
              <div>
                <h4 className="font-medium">Free delivery</h4>
                <p className="text-sm text-gray-600">Have you ever finally just</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-sm">Have a coupon?</span>
              <div className="flex flex-1">
                <Input
                  placeholder="Add coupon"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  className="rounded-r-none"
                />
                <Button className="rounded-l-none">Apply</Button>
              </div>
            </div>

            <div className="space-y-3 py-4 border-t border-b">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-red-600">
                <span>Discount:</span>
                <span>-${discount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax:</span>
                <span>+$14.00</span>
              </div>
            </div>

            <div className="flex justify-between text-lg font-semibold">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Checkout</Button>

            <div className="flex justify-center space-x-2 mt-4">
              <img src="/images/flags/usa.png" alt="Visa" className="w-8 h-5" />
              <img src="/images/flags/china.png" alt="Mastercard" className="w-8 h-5" />
              <img src="/images/flags/france.png" alt="PayPal" className="w-8 h-5" />
              <img src="/images/flags/germany.png" alt="Apple Pay" className="w-8 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Saved for Later */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Saved for later</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {savedItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg border p-4">
              <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-32 object-contain mb-3" />
              <h3 className="text-sm font-medium mb-2 line-clamp-2">{item.name}</h3>
              <p className="font-semibold mb-3">${item.price}</p>
              <Button variant="outline" className="w-full text-blue-600 border-blue-600 hover:bg-blue-50">
                Move to cart
              </Button>
            </div>
          ))}
        </div>
      </div>

      {/* Discount Banner */}
      <div className="mt-12 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Super discount on more than 100 USD</h3>
            <p>Have you ever finally just write dummy info</p>
          </div>
          <Button className="bg-orange-500 hover:bg-orange-600">Shop now</Button>
        </div>
      </div>
    </div>
  )
}
