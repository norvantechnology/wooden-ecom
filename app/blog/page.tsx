'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, Clock, User } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const blogPosts = [
  {
    id: 1,
    title: "The Art of Wooden Vase Lamp Crafting",
    excerpt: "Discover the intricate process behind creating our handcrafted wooden vase lamps...",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "John Smith",
    date: "Feb 28, 2024",
    readTime: "5 min read",
    category: "Craftsmanship"
  },
  {
    id: 2,
    title: "Choosing the Perfect Wood for Your Lamp",
    excerpt: "Learn about different wood types and their unique characteristics for lamp making...",
    image: "https://images.unsplash.com/photo-1611486212557-88be5ff6f941?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Emma Davis",
    date: "Feb 25, 2024",
    readTime: "4 min read",
    category: "Materials"
  },
  {
    id: 3,
    title: "Lighting Tips for Wooden Vase Lamps",
    excerpt: "Expert advice on choosing the right bulbs and positioning your lamp...",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    author: "Michael Brown",
    date: "Feb 22, 2024",
    readTime: "6 min read",
    category: "Tips & Tricks"
  }
];

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Artisan Woods Blog</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover the art of wooden vase lamps, expert tips, and inspiring stories from our craftsmen.
          </p>
        </motion.div>

        {/* Featured Post */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative h-[500px] rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
              alt="Featured blog post"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <span className="inline-block bg-amber-900 text-white px-3 py-1 rounded-full text-sm mb-4">
                Featured
              </span>
              <h2 className="text-3xl font-bold text-white mb-4">
                The Evolution of Wooden Vase Lamp Design
              </h2>
              <div className="flex items-center text-white/80 space-x-4">
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2" />
                  <span>Sarah Johnson</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Mar 1, 2024</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-2" />
                  <span>8 min read</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="relative h-48">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-amber-900 text-white px-3 py-1 rounded-full text-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <div className="flex items-center text-gray-500 text-sm space-x-4 mb-4">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <Link
                  href={`/blog/${post.id}`}
                  className="text-amber-900 font-medium hover:text-amber-800"
                >
                  Read More →
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}