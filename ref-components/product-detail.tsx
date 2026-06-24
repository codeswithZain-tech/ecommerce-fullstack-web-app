"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Heart } from "lucide-react"

interface ProductDetailProps {
  productId: string
}

export default function ProductDetail({ productId }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)

  const product = {
    name: "Men's Long Sleeve T-shirt Cotton Base Layer Slim Muscle",
    price: 98.0,
    originalPrice: 100.0,
    salePrice: 78.0,
    rating: 4.5,
    reviews: 32,
    sold: 154,
    images: [
      "/images/products/suit.png",
      "/images/products/suit.png",
      "/images/products/suit.png",
      "/images/products/suit.png",
    ],
    inStock: true,
    specifications: {
      type: "Classic shoes",
      material: "Plastic material",
      design: "Modern nice",
    },
    features: [
      "Some great feature name here",
      "Lorem ipsum dolor sit amet, consectetur",
      "Duis aute irure dolor in reprehenderit",
      "Some great feature name here",
    ],
  }

  const relatedProducts = [
    { id: 1, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/smartphone.png" },
    { id: 2, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/smartwatch.png" },
    { id: 3, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/headset.png" },
    { id: 4, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/tablet.png" },
    { id: 5, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/kettle.png" },
    { id: 6, name: "Xiaomi Redmi 8", price: 32.0, originalPrice: 41.0, image: "/images/products/wallet.png" },
  ]

  const reviews = [
    {
      id: 1,
      user: "Samantha D.",
      rating: 5,
      date: "1 week ago",
      comment: "I absolutely love this t-shirt! The quality is amazing and it fits perfectly.",
      avatar: "/images/products/smartphone.png",
    },
    {
      id: 2,
      user: "Alex M.",
      rating: 4,
      date: "2 weeks ago",
      comment: "Great product, very comfortable. Would definitely recommend!",
      avatar: "/images/products/tablet.png",
    },
  ]

  return (
    <div className="mx-auto py-6" style={{ width: "1180px" }}>
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">Home &gt; Clothing &gt; Men's wear &gt; Summer clothing</div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Product Images */}
        <div className="lg:col-span-1">
          <div className="space-y-4">
            <div className="aspect-square bg-white rounded-lg border p-4">
              <img
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 border rounded-lg p-1 ${
                    selectedImage === index ? "border-blue-500" : "border-gray-200"
                  }`}
                >
                  <img src={image || "/placeholder.svg"} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:col-span-1 space-y-6">
          <div>
            <Badge className="bg-green-100 text-green-800 mb-2">In Stock</Badge>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">{product.name}</h1>

            <div className="flex items-center space-x-2 mb-4">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.reviews} reviews)</span>
              <span className="text-sm text-gray-600">• {product.sold} sold</span>
            </div>

            <div className="flex items-center space-x-4 mb-6">
              <span className="text-3xl font-bold text-red-600">${product.salePrice.toFixed(2)}</span>
              <span className="text-lg text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              <span className="text-lg text-gray-900">${product.price.toFixed(2)}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Price:</span>
                <span className="ml-2">Negotiable</span>
              </div>
              <div>
                <span className="text-gray-600">Type:</span>
                <span className="ml-2">{product.specifications.type}</span>
              </div>
              <div>
                <span className="text-gray-600">Material:</span>
                <span className="ml-2">{product.specifications.material}</span>
              </div>
              <div>
                <span className="text-gray-600">Design:</span>
                <span className="ml-2">{product.specifications.design}</span>
              </div>
            </div>

            <div>
              <span className="text-gray-600 text-sm">Customization:</span>
              <p className="text-sm mt-1">Graphic design and printing for packaging and design label packaging</p>
            </div>

            <div>
              <span className="text-gray-600 text-sm">Protection:</span>
              <p className="text-sm mt-1">Refund Policy</p>
            </div>

            <div>
              <span className="text-gray-600 text-sm">Warranty:</span>
              <p className="text-sm mt-1">2 years full warranty</p>
            </div>
          </div>
        </div>

        {/* Supplier Info */}
        <div className="lg:col-span-1">
          <div className="bg-blue-50 rounded-lg p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">S</span>
              </div>
              <div>
                <h3 className="font-semibold">Supplier</h3>
                <p className="text-sm text-gray-600">Guanjoi Trading LLC</p>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Country:</span>
                <span>Germany</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Verified Seller:</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Worldwide shipping:</span>
                <Badge className="bg-green-100 text-green-800">Yes</Badge>
              </div>
            </div>

            <Button className="w-full bg-blue-600 hover:bg-blue-700">Send inquiry</Button>
            <Button variant="outline" className="w-full">
              Seller's profile
            </Button>

            <div className="flex items-center space-x-2 pt-4">
              <Heart className="w-4 h-4" />
              <span className="text-sm">Save for later</span>
            </div>
          </div>

          {/* You may like */}
          <div className="mt-6">
            <h3 className="font-semibold mb-4">You may like</h3>
            <div className="space-y-4">
              {reviews.map((review) => (
                <div key={review.id} className="flex space-x-3">
                  <img
                    src={review.avatar || "/placeholder.svg"}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-sm">{review.user}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-3 h-3 ${
                              i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{review.date}</p>
                    <p className="text-sm text-gray-700">{review.comment}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="seller">About seller</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="mt-6">
            <div className="bg-white rounded-lg p-6">
              <p className="text-gray-700 mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip
                ex ea commodo consequat.
              </p>
              <div className="space-y-2">
                {product.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full"></div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-6">
            <div className="bg-white rounded-lg p-6">
              <h3 className="font-semibold mb-4">Customer Reviews</h3>
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="border-b pb-4">
                    <div className="flex items-center space-x-3 mb-2">
                      <img src={review.avatar || "/placeholder.svg"} alt="" className="w-8 h-8 rounded-full" />
                      <div>
                        <span className="font-medium">{review.user}</span>
                        <div className="flex items-center space-x-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{review.date}</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <div className="mt-12">
        <h2 className="text-xl font-bold mb-6">Related products</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {relatedProducts.map((product) => (
            <div key={product.id} className="bg-white rounded-lg border p-4">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-24 object-contain mb-3"
              />
              <h3 className="text-sm font-medium mb-2">{product.name}</h3>
              <div className="flex items-center space-x-2">
                <span className="font-semibold">${product.price.toFixed(2)}</span>
                <span className="text-xs text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
              </div>
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
