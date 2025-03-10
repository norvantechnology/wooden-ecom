'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Truck, Shield, Award, Users, ArrowRight, ChevronRight } from 'lucide-react';
import { products } from './products/data';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const bestSellers = products.slice(0, 3);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] flex items-center overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Wooden furniture craftsmanship"
            fill
            className="object-cover"
            priority
          />
        </motion.div>
        <div className="absolute inset-0 bg-black/50" />
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerChildren}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h1 
            variants={fadeInUp}
            className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
          >
            Timeless Wooden Furniture
          </motion.h1>
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover our collection of handcrafted wooden furniture, where traditional craftsmanship meets modern design.
          </motion.p>
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-900 hover:bg-amber-800 text-lg group"
            >
              <Link href="/products">
                Explore Collection
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white hover:bg-white/20 border-white text-lg"
            >
              <Link href="/about">
                Our Story
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 1, repeat: Infinity, repeatType: "reverse" }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">Scroll to explore</span>
            <ChevronRight className="w-6 h-6 rotate-90" />
          </div>
        </motion.div>
      </section>

      {/* Trust Indicators with Hover Effects */}
      <section className="bg-amber-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { icon: Star, title: "5-Star Rated", description: "By our customers" },
              { icon: Truck, title: "Free Shipping", description: "On orders over $999" },
              { icon: Shield, title: "Lifetime Warranty", description: "On all products" },
              { icon: Users, title: "Expert Support", description: "7 days a week" }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                whileHover={{ scale: 1.05 }}
                className="flex items-center justify-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div>
                  <div className="relative">
                    <item.icon className="w-10 h-10 text-amber-900 mx-auto mb-4" />
                    <motion.div
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-4 h-4 bg-amber-900 rounded-full"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Best Sellers with Card Animations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              Best Sellers
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Our most popular pieces, loved by customers
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {bestSellers.map((product, index) => (
              <motion.div
                key={product.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, y: 50 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.2
                    }
                  }
                }}
              >
                <Link
                  href={`/products/${product.id}`}
                  className="block group"
                >
                  <div className="relative overflow-hidden rounded-xl shadow-lg transition-all duration-300 group-hover:shadow-xl">
                    <div className="relative h-80">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="absolute top-4 left-4">
                        <motion.span 
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="bg-amber-900 text-white px-3 py-1 rounded-full text-sm"
                        >
                          Best Seller
                        </motion.span>
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-amber-900 transition-colors">
                        {product.name}
                      </h3>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <p className="text-2xl font-bold text-gray-900">
                        ${product.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-900 hover:bg-amber-800 text-lg group"
            >
              <Link href="/products">
                View All Products
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Categories with Hover Effects */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-gray-900 text-center mb-16"
          >
            Shop by Room
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Living Room',
                image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Dining Room',
                image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              },
              {
                title: 'Bedroom',
                image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
              },
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.2
                    }
                  }
                }}
                whileHover={{ scale: 1.02 }}
                className="relative h-96 group overflow-hidden rounded-2xl shadow-xl"
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center transform group-hover:-translate-y-2 transition-transform">
                    <h3 className="text-3xl font-bold text-white mb-6">{category.title}</h3>
                    <Button className="bg-white text-gray-900 hover:bg-gray-100 group">
                      Shop Now
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials with Card Animations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.h2 
              variants={fadeInUp}
              className="text-4xl font-bold text-gray-900 mb-4"
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Don't just take our word for it
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Emily Thompson",
                role: "Interior Designer",
                comment: "The quality of their furniture is exceptional. Each piece tells a story of craftsmanship and attention to detail.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "David Chen",
                role: "Homeowner",
                comment: "We furnished our entire living room with Artisan Woods pieces. The quality and design are exactly what we were looking for.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Sarah Johnson",
                role: "Architect",
                comment: "Their furniture perfectly balances traditional craftsmanship with contemporary design. Simply outstanding.",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: {
                    opacity: 1,
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.2
                    }
                  }
                }}
                whileHover={{ y: -10 }}
                className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic mb-6">"{testimonial.comment}"</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with Gradient and Animation */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-900 to-amber-800" />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Space?
          </h2>
          <p className="text-xl text-amber-100 mb-10 max-w-2xl mx-auto">
            Browse our collection and find the perfect pieces for your home.
            Enjoy free shipping on orders over $999.
          </p>
          <Button 
            asChild 
            size="lg" 
            variant="outline" 
            className="bg-transparent text-white border-white hover:bg-white hover:text-amber-900 text-lg group"
          >
            <Link href="/products">
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </section>
    </div>
  );
}