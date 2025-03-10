'use client';

import Image from 'next/image';
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { ChevronLeft, Star, Truck, Shield, Clock, Gift, Heart, Share2, Ruler, Info, PenTool as Tool, AlignCenterVertical as Certificate, Leaf } from 'lucide-react';
import Link from 'next/link';
import { Product, products } from '../data';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function ProductDetailsClient({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [showShareTooltip, setShowShareTooltip] = useState(false);
  const { addToCart, favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.some(f => f.id === product.id);

  // Additional product images
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
  ];

  // Get similar products (same category)
  const similarProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  // Product features
  const features = [
    { icon: Tool, title: 'Handcrafted', description: 'Each piece is carefully handmade by skilled artisans' },
    { icon: Certificate, title: 'Quality Assured', description: '100% satisfaction guaranteed' },
    { icon: Leaf, title: 'Eco-Friendly', description: 'Made with sustainable materials' },
    { icon: Shield, title: 'Lifetime Warranty', description: 'Protected against manufacturing defects' }
  ];

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      image: product.image
    });
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: product.description,
          url: window.location.href
        });
      } catch (err) {
        setShowShareTooltip(true);
        setTimeout(() => setShowShareTooltip(false), 2000);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      setShowShareTooltip(true);
      setTimeout(() => setShowShareTooltip(false), 2000);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/products"
          className="inline-flex items-center text-amber-900 hover:text-amber-800 mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4 p-8">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="relative h-[500px] rounded-lg overflow-hidden"
              >
                <Image
                  src={activeImage}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 space-x-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white"
                          onClick={() => toggleFavorite(product)}
                        >
                          <Heart
                            className={`w-5 h-5 ${
                              isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'
                            }`}
                          />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip open={showShareTooltip}>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="icon"
                          className="bg-white"
                          onClick={handleShare}
                        >
                          <Share2 className="w-5 h-5 text-gray-600" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        {showShareTooltip ? 'Link copied!' : 'Share product'}
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <Badge className="absolute top-4 left-4 bg-amber-900">
                  Best Seller
                </Badge>
              </motion.div>
              <div className="grid grid-cols-3 gap-4">
                {productImages.map((img, index) => (
                  <motion.button
                    key={index}
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setActiveImage(img)}
                    className={`relative h-24 rounded-lg overflow-hidden ${
                      activeImage === img ? 'ring-2 ring-amber-900' : ''
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Product Details */}
            <div className="p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-sm text-amber-900 font-medium mb-2">
                  {product.category}
                </div>
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  {product.name}
                </h1>
                
                {/* Rating */}
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                  <span className="ml-2 text-gray-600">(50+ Reviews)</span>
                </div>

                <p className="text-2xl font-bold text-gray-900 mb-4">
                  ${product.price.toLocaleString()}
                </p>

                {/* Limited Time Offer */}
                <motion.div 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-amber-50 p-4 rounded-lg mb-6"
                >
                  <div className="flex items-center text-amber-900">
                    <Gift className="w-5 h-5 mr-2" />
                    <span className="font-medium">Limited Time Offer!</span>
                  </div>
                  <p className="text-sm text-amber-800 mt-1">
                    Free premium delivery on orders over $999
                  </p>
                </motion.div>

                <p className="text-gray-600 mb-6">
                  {product.description}
                </p>

                {/* Key Features */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-start p-3 bg-gray-50 rounded-lg"
                    >
                      <feature.icon className="w-5 h-5 text-amber-900 mt-1" />
                      <div className="ml-3">
                        <h4 className="text-sm font-medium text-gray-900">{feature.title}</h4>
                        <p className="text-xs text-gray-600">{feature.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Quantity Selector */}
                <div className="mb-6">
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </Button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="w-full bg-amber-900 hover:bg-amber-800 mb-6"
                    onClick={handleAddToCart}
                  >
                    Add to Cart - ${(product.price * quantity).toLocaleString()}
                  </Button>
                </motion.div>

                {/* Shipping & Returns */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="flex items-start">
                    <Truck className="w-5 h-5 text-amber-900 mt-1" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Free Shipping</h4>
                      <p className="text-sm text-gray-600">On orders over $999</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Shield className="w-5 h-5 text-amber-900 mt-1" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Warranty</h4>
                      <p className="text-sm text-gray-600">Lifetime guarantee</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-amber-900 mt-1" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Delivery</h4>
                      <p className="text-sm text-gray-600">2-4 weeks</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Ruler className="w-5 h-5 text-amber-900 mt-1" />
                    <div className="ml-3">
                      <h4 className="text-sm font-medium text-gray-900">Custom Sizes</h4>
                      <p className="text-sm text-gray-600">Available on request</p>
                    </div>
                  </div>
                </div>

                {/* Product Information Tabs */}
                <Tabs defaultValue="details" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="dimensions">Dimensions</TabsTrigger>
                    <TabsTrigger value="features">Features</TabsTrigger>
                    <TabsTrigger value="care">Care</TabsTrigger>
                  </TabsList>
                  <TabsContent value="details" className="mt-6">
                    <dl className="grid grid-cols-1 gap-4">
                      <div>
                        <dt className="font-medium text-gray-900">Material</dt>
                        <dd className="text-gray-600">{product.details.material}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Finish</dt>
                        <dd className="text-gray-600">{product.details.finish}</dd>
                      </div>
                      <div>
                        <dt className="font-medium text-gray-900">Weight</dt>
                        <dd className="text-gray-600">{product.details.weight}</dd>
                      </div>
                    </dl>
                  </TabsContent>
                  <TabsContent value="dimensions" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Product Dimensions</h3>
                      <p className="text-gray-600">{product.details.dimensions}</p>
                      {product.details.seating && (
                        <div>
                          <h4 className="font-medium text-gray-900">Seating Capacity</h4>
                          <p className="text-gray-600">{product.details.seating}</p>
                        </div>
                      )}
                    </div>
                  </TabsContent>
                  <TabsContent value="features" className="mt-6">
                    <ul className="list-disc list-inside space-y-2">
                      {product.details.features.map((feature, index) => (
                        <li key={index} className="text-gray-600">{feature}</li>
                      ))}
                    </ul>
                  </TabsContent>
                  <TabsContent value="care" className="mt-6">
                    <Accordion type="single" collapsible>
                      <AccordionItem value="cleaning">
                        <AccordionTrigger>Cleaning Instructions</AccordionTrigger>
                        <AccordionContent>
                          Dust regularly with a soft, dry cloth. For deeper cleaning, use a wood-specific cleaner and follow the grain.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="maintenance">
                        <AccordionTrigger>Regular Maintenance</AccordionTrigger>
                        <AccordionContent>
                          Apply wood conditioner every 6 months to maintain the finish and protect the wood.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="protection">
                        <AccordionTrigger>Protection Tips</AccordionTrigger>
                        <AccordionContent>
                          Avoid direct sunlight and maintain consistent room humidity to prevent wood damage.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </TabsContent>
                </Tabs>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You May Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProducts.map((similarProduct) => (
              <motion.div
                key={similarProduct.id}
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Link
                  href={`/products/${similarProduct.id}`}
                  className="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative h-48">
                    <Image
                      src={similarProduct.image}
                      alt={similarProduct.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {similarProduct.name}
                    </h3>
                    <p className="text-amber-900 font-bold">
                      ${similarProduct.price.toLocaleString()}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Customer Reviews */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
          <div className="grid gap-6">
            {[
              {
                name: "Sarah Johnson",
                rating: 5,
                comment: "Absolutely beautiful piece! The craftsmanship is exceptional and it fits perfectly in our dining room.",
                date: "2 weeks ago",
                verified: true
              },
              {
                name: "Michael Chen",
                rating: 5,
                comment: "Outstanding quality and the delivery was seamless. Worth every penny!",
                date: "1 month ago",
                verified: true
              }
            ].map((review, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md p-6"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className="flex">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">{review.date}</span>
                  </div>
                  {review.verified && (
                    <Badge variant="outline" className="text-green-600">
                      Verified Purchase
                    </Badge>
                  )}
                </div>
                <p className="text-gray-800 mb-2">{review.comment}</p>
                <p className="text-sm font-medium text-gray-900">{review.name}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}