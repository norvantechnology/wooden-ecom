'use client';

import { useState } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Minus, Plus, X } from "lucide-react";
import Image from 'next/image';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, removeFromCart, updateCartQuantity } = useStore();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-900 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="mt-8">
          <AnimatePresence>
            {cart.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-8"
              >
                <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </motion.div>
            ) : (
              <div className="space-y-4">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm"
                  >
                    <div className="relative w-20 h-20">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">{item.name}</h3>
                      <p className="text-amber-900 font-bold">
                        ${item.price.toLocaleString()}
                      </p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartQuantity(item.id, Math.max(0, item.quantity - 1))}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        <span>{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Total</span>
                    <span className="font-bold">${total.toLocaleString()}</span>
                  </div>
                  <Button 
                    asChild
                    className="w-full bg-amber-900 hover:bg-amber-800"
                    onClick={() => setIsOpen(false)}
                  >
                    <Link href="/checkout">
                      Proceed to Checkout
                    </Link>
                  </Button>
                </div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </SheetContent>
    </Sheet>
  );
}