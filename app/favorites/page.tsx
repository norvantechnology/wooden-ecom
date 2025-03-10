'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { Button } from '@/components/ui/button';
import { Heart, Trash2 } from 'lucide-react';
import Link from 'next/link';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useStore();

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Favorites</h1>
          <p className="text-lg text-gray-600">
            Your collection of favorite wooden vase lamps
          </p>
        </motion.div>

        {favorites.length === 0 ? (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center py-12"
          >
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              No favorites yet
            </h2>
            <p className="text-gray-600 mb-8">
              Start adding items to your favorites list by clicking the heart icon on products you love.
            </p>
            <Button asChild className="bg-amber-900 hover:bg-amber-800">
              <Link href="/products">
                Browse Products
              </Link>
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {favorites.map((item, index) => (
              <motion.div
                key={item.id}
                initial="hidden"
                animate="visible"
                variants={fadeIn}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <div className="relative h-64">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={() => toggleFavorite(item)}
                    className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  >
                    <Trash2 className="w-5 h-5 text-red-500" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-2xl font-bold text-amber-900 mb-4">
                    ${item.price.toLocaleString()}
                  </p>
                  <div className="flex space-x-4">
                    <Button asChild className="flex-1 bg-amber-900 hover:bg-amber-800">
                      <Link href={`/products/${item.id}`}>
                        View Details
                      </Link>
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}