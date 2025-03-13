'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Star, Truck, Shield, Users, ArrowRight, ChevronRight, ShoppingCart, Plus, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8 } }
};

// Product gallery component with 3D effects and clean design
const ProductShowcase = ({ product, index, variant = "light" }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    // Calculate distance from center as percentage
    const x = (e.clientX - centerX) / (rect.width / 2);
    const y = (e.clientY - centerY) / (rect.height / 2);
    
    setMousePosition({ x, y });
  };
  
  const rotateX = useTransform(
    useMotionValue(mousePosition.y),
    [-1, 1],
    [10, -10]
  );
  
  const rotateY = useTransform(
    useMotionValue(mousePosition.x),
    [-1, 1],
    [-10, 10]
  );
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ 
        opacity: 1, 
        y: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.15, 
          ease: [0.17, 0.67, 0.83, 0.67]
        } 
      }}
      viewport={{ once: true, margin: "-100px" }}
      className="h-full"
    >
      <motion.div
        ref={cardRef}
        className="relative h-full w-full perspective-2000"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => {
          setIsHovering(false);
          setMousePosition({ x: 0, y: 0 });
        }}
        style={{
          perspective: "2000px"
        }}
      >
        <motion.div
          className="h-full w-full"
          style={{
            rotateX: isHovering ? rotateX : 0,
            rotateY: isHovering ? rotateY : 0,
            transformStyle: "preserve-3d",
            transition: "transform 0.5s ease"
          }}
        >
          {/* Image Container with 3D transform */}
          <Link href={`/products/${product.id}`} className="block h-full">
            <div className={`relative rounded-lg overflow-hidden h-full w-full shadow-xl ${variant === "dark" ? "shadow-amber-900/20" : "shadow-lg"}`}>
              {/* Product image */}
              <div className="absolute inset-0 overflow-hidden">
                <motion.div
                  animate={{
                    scale: isHovering ? 1.1 : 1,
                    transition: { duration: 1.2, ease: [0.25, 1, 0.5, 1] }
                  }}
                  className="h-full w-full"
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index < 3}
                  />
                </motion.div>
              </div>
              
              {/* Hover vignette effect */}
              <motion.div 
                className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/60"
                animate={{
                  opacity: isHovering ? 1 : 0.3,
                  transition: { duration: 0.4 }
                }}
              />
              
              {/* Product info (below image, not overlapping) */}
              <motion.div 
                className="absolute bottom-0 left-0 right-0 p-5 pb-6 text-white z-10"
                animate={{
                  y: isHovering ? 0 : 10,
                  opacity: isHovering ? 1 : 0.8,
                  transition: { duration: 0.5 }
                }}
                style={{ transformStyle: "preserve-3d", transform: "translateZ(40px)" }}
              >
                <motion.h3 
                  className="text-xl font-bold mb-2"
                  animate={{
                    y: isHovering ? 0 : 5,
                    transition: { duration: 0.3, delay: 0.1 }
                  }}
                >
                  {product.name}
                </motion.h3>
                <motion.div
                  className="flex justify-between items-center"
                  animate={{
                    y: isHovering ? 0 : 10,
                    opacity: isHovering ? 1 : 0.5,
                    transition: { duration: 0.3, delay: 0.2 }
                  }}
                >
                  <p className="text-xl font-semibold">
                    ${product.price}
                  </p>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white bg-opacity-20 backdrop-blur-sm p-2 rounded-full"
                  >
                    <Plus className="w-5 h-5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>
              
              {/* Top action button */}
              <motion.div 
                className="absolute top-4 right-4 z-20"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{
                  opacity: isHovering ? 1 : 0,
                  scale: isHovering ? 1 : 0.8,
                  transition: { duration: 0.3 }
                }}
                style={{ transformStyle: "preserve-3d", transform: "translateZ(60px)" }}
              >
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white text-amber-900 rounded-full flex items-center justify-center shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                </motion.button>
              </motion.div>
              
              {/* Floating particles effect on hover */}
              <AnimatePresence>
                {isHovering && (
                  <>
                    {[...Array(6)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ 
                          opacity: 0,
                          x: (Math.random() - 0.5) * 20,
                          y: (Math.random() - 0.5) * 20,
                          scale: 0
                        }}
                        animate={{ 
                          opacity: [0, 0.8, 0],
                          x: (Math.random() - 0.5) * 100,
                          y: -100 - (Math.random() * 50),
                          scale: [0, 0.8, 0],
                          transition: { 
                            duration: 1.5 + Math.random(),
                            delay: i * 0.15,
                            repeat: Infinity,
                            repeatDelay: 3 + Math.random() * 2
                          }
                        }}
                        exit={{ opacity: 0, scale: 0 }}
                        className="absolute w-2 h-2 rounded-full bg-amber-300"
                        style={{
                          left: `${20 + (Math.random() * 60)}%`,
                          bottom: `${10 + (Math.random() * 20)}%`,
                        }}
                      />
                    ))}
                  </>
                )}
              </AnimatePresence>
            </div>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

// Fake products data
const newArrivals = [
  {
    id: 1,
    name: "Modern Wooden Chair",
    price: 199,
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    name: "Elegant Dining Table",
    price: 899,
    image: "https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    name: "Luxury Bed Frame",
    price: 1299,
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

const bestSellers = [
  {
    id: 4,
    name: "Classic Wooden Desk",
    price: 499,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    name: "Rustic Coffee Table",
    price: 299,
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    name: "Minimalist Bookshelf",
    price: 399,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Home() {
  // Parallax animation values
  const scrollY = useMotionValue(0);
  useEffect(() => {
    const handleScroll = () => {
      scrollY.set(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollY]);
  
  const heroImageY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0.3]);
  
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-stone-50 overflow-hidden">
      {/* Custom cursor spotlight effect */}
      <div 
        className="fixed w-64 h-64 rounded-full pointer-events-none z-50 opacity-50 hidden lg:block"
        style={{
          background: "radial-gradient(circle, rgba(217,119,6,0.2) 0%, rgba(254,243,199,0) 70%)",
          transform: `translate(${cursorPosition.x - 128}px, ${cursorPosition.y - 128}px)`,
          transition: "transform 0.1s ease-out"
        }}
      />
    
      {/* Hero Section with Parallax */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <motion.div
          style={{ y: heroImageY, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <Image
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
            alt="Wooden furniture craftsmanship"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
        </motion.div>
        
        <motion.div 
          style={{ y: heroTextY }}
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: { 
              opacity: 1,
              transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
              }
            }
          }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div variants={fadeInUp} className="overflow-hidden">
            <motion.h1 
              className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight"
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ 
                duration: 1.2, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
              }}
            >
              <span className="inline-block">Timeless</span>{" "}
              <span className="inline-block">Wooden</span>{" "}
              <span className="inline-block">Furniture</span>
            </motion.h1>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl text-white/90 mb-8 max-w-2xl mx-auto"
          >
            Discover our collection of handcrafted wooden furniture, 
            where traditional craftsmanship meets modern design.
          </motion.p>
          
          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-amber-900 hover:bg-amber-800 text-lg group overflow-hidden relative"
            >
              <Link href="/products" className="flex items-center">
                <motion.span
                  initial={{ x: 0 }}
                  whileHover={{ x: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  Explore Collection
                </motion.span>
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
            
            <Button 
              asChild 
              size="lg" 
              variant="outline" 
              className="bg-white/10 text-white hover:bg-white/20 border-white text-lg backdrop-blur-sm overflow-hidden"
            >
              <Link href="/about" className="relative">
                <motion.span
                  initial={{ y: 0 }}
                  whileHover={{ y: -30 }}
                  transition={{ duration: 0.3 }}
                >
                  Our Story
                </motion.span>
                <motion.span
                  initial={{ y: 30, position: "absolute", left: 0, right: 0 }}
                  whileHover={{ y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  Read More
                </motion.span>
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: 1.5, 
            duration: 1.5, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white z-10"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 opacity-80">Scroll to discover</span>
            <motion.div
              animate={{ 
                y: [0, 10, 0], 
                transition: { 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: "easeInOut" 
                }
              }}
            >
              <ChevronRight className="w-6 h-6 rotate-90" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Best Sellers Section with premium 3D effects */}
      <section className="py-24 bg-white relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute -right-32 top-1/3 w-64 h-64 rounded-full opacity-10 blur-3xl bg-amber-800"></div>
        <div className="absolute -left-24 bottom-1/4 w-48 h-48 rounded-full opacity-10 blur-3xl bg-amber-600"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp} className="overflow-hidden inline-block">
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-3"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                Best Sellers
              </motion.h2>
            </motion.div>
            
            <motion.div 
              variants={fadeInUp}
              className="h-px w-24 bg-amber-900 mx-auto mb-6"
            />
            
            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              Our most popular pieces, loved by customers
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 h-[460px] md:h-[500px]">
            {bestSellers.map((product, index) => (
              <ProductShowcase 
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="group relative overflow-hidden bg-transparent border border-amber-900 text-amber-900 hover:text-white"
            >
              <Link href="/products/bestsellers">
                <span className="relative z-10">View All Best Sellers</span>
                <motion.span 
                  className="absolute inset-0 bg-amber-900 z-0"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* New Arrivals Section with elegant animations */}
      <section className="py-24 bg-stone-100 relative overflow-hidden">
        {/* Decorative elements */}
        <motion.div 
          animate={{ 
            rotate: 360,
            transition: { duration: 120, repeat: Infinity, ease: "linear" } 
          }}
          className="absolute -top-48 -right-48 w-96 h-96 border border-amber-900/10 rounded-full"
        />
        <motion.div 
          animate={{ 
            rotate: -360,
            transition: { duration: 180, repeat: Infinity, ease: "linear" } 
          }}
          className="absolute -top-24 -right-24 w-48 h-48 border border-amber-900/10 rounded-full"
        />
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            transition: { duration: 10, repeat: Infinity, ease: "easeInOut" } 
          }}
          className="absolute left-1/4 bottom-20 w-64 h-64 bg-amber-800/5 blur-3xl rounded-full"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-2 mb-6 bg-amber-100/50 px-4 py-2 rounded-full"
              variants={fadeIn}
            >
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="text-amber-800 text-sm font-medium">Just Arrived</span>
            </motion.div>
            
            <motion.div variants={fadeInUp} className="overflow-hidden inline-block">
              <motion.h2 
                className="text-4xl font-bold text-gray-900 mb-6"
                initial={{ y: 100 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                New Arrivals
              </motion.h2>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 lg:gap-8 h-[460px] md:h-[500px]">
            {newArrivals.map((product, index) => (
              <ProductShowcase 
                key={product.id}
                product={product}
                index={index}
                variant="dark"
              />
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 text-center"
          >
            <Button 
              asChild 
              size="lg" 
              className="bg-black text-white hover:bg-gray-900 group px-8"
            >
              <Link href="/products/new" className="flex items-center">
                <span>Explore New Collection</span>
                <motion.div
                  initial={{ x: 0, opacity: 1 }}
                  whileHover={{ x: 5, opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className="ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators with elegant animations */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {[
              { icon: Star, title: "5-Star Rated", description: "By our customers" },
              { icon: Truck, title: "Free Shipping", description: "On orders over $999" },
              { icon: Shield, title: "Lifetime Warranty", description: "On all products" },
              { icon: Users, title: "Expert Support", description: "7 days a week" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.1,
                  ease: [0.22, 1, 0.36, 1]
                }}
                whileHover={{ y: -5 }}
                className="flex flex-col items-center text-center"
              >
                <motion.div
                  whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="w-16 h-16 bg-amber-50 rounded-full flex items-center justify-center mb-5"
                >
                  <item.icon className="w-8 h-8 text-amber-800" />
                </motion.div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-500">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter signup with premium animation */}
      <section className="py-24 bg-amber-900">
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.h2
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Join Our Community
          </motion.h2>
          
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-amber-100 mb-8 max-w-2xl mx-auto"
          >
            Subscribe to get special offers, free giveaways, and updates on new arrivals.
          </motion.p>
          
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-amber-600"
            />
            <Button className="bg-white text-amber-900 hover:bg-amber-100 px-8">
              Subscribe
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}