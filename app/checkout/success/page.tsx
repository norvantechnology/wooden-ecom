'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Thank You for Your Order!
          </h1>
          <p className="text-gray-600 mb-8">
            Your order has been successfully placed. We'll send you an email confirmation shortly.
          </p>

          <div className="max-w-md mx-auto bg-gray-50 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">What's Next?</h2>
            <ul className="text-left space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">1</span>
                <p className="text-gray-600">You'll receive an order confirmation email with your order details.</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">2</span>
                <p className="text-gray-600">Our craftsmen will begin working on your piece within 24-48 hours.</p>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 w-6 h-6 bg-amber-900 text-white rounded-full flex items-center justify-center mr-3 mt-0.5">3</span>
                <p className="text-gray-600">We'll keep you updated on your order status via email.</p>
              </li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-amber-900 hover:bg-amber-800">
              <Link href="/products">
                Continue Shopping
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/help">
                Need Help?
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}