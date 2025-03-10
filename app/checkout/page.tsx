'use client';

import { useState } from 'react';
import { useStore } from '@/lib/store';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import {
  CreditCard,
  Truck,
  Shield,
  Gift,
  Clock,
  ChevronLeft,
  Trash2,
  Plus,
  Minus,
  AlertCircle
} from 'lucide-react';
import Link from 'next/link';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const shippingMethods = [
  {
    id: 'standard',
    title: 'Standard Shipping',
    description: '5-7 business days',
    price: 0,
    icon: Truck
  },
  {
    id: 'express',
    title: 'Express Shipping',
    description: '2-3 business days',
    price: 25,
    icon: Clock
  },
  {
    id: 'overnight',
    title: 'Overnight Shipping',
    description: 'Next business day',
    price: 50,
    icon: Gift
  }
];

const paymentMethods = [
  { id: 'credit-card', title: 'Credit Card', icon: CreditCard },
  { id: 'paypal', title: 'PayPal', icon: Shield }
];

export default function CheckoutPage() {
  const { cart, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const [shippingMethod, setShippingMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveInfo: false
  });

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethods.find(m => m.id === shippingMethod)?.price || 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    window.location.href = '/checkout/success';
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Add some items to your cart to proceed with checkout.</p>
            <Button asChild className="bg-amber-900 hover:bg-amber-800">
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link 
          href="/products"
          className="inline-flex items-center text-amber-900 hover:text-amber-800 mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Continue Shopping
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg shadow-lg p-6"
            >
              <h1 className="text-2xl font-bold text-gray-900 mb-8">Checkout</h1>

              <form onSubmit={handleSubmit}>
                {/* Contact Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div>
                      <Label htmlFor="state">State</Label>
                      <Select value={formData.state} onValueChange={(value) => setFormData(prev => ({ ...prev, state: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CA">California</SelectItem>
                          <SelectItem value="NY">New York</SelectItem>
                          <SelectItem value="TX">Texas</SelectItem>
                          {/* Add more states */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        required
                        value={formData.zipCode}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                {/* Shipping Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Shipping Method</h2>
                  <RadioGroup value={shippingMethod} onValueChange={setShippingMethod}>
                    <div className="grid gap-4">
                      {shippingMethods.map((method) => (
                        <Label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            shippingMethod === method.id
                              ? 'border-amber-900 bg-amber-50'
                              : 'border-gray-200 hover:border-amber-900'
                          }`}
                        >
                          <RadioGroupItem value={method.id} className="mr-4" />
                          <div className="flex-1">
                            <div className="flex items-center">
                              <method.icon className="w-5 h-5 text-amber-900 mr-2" />
                              <span className="font-medium">{method.title}</span>
                            </div>
                            <p className="text-sm text-gray-600">{method.description}</p>
                          </div>
                          <span className="font-medium">
                            {method.price === 0 ? 'FREE' : `$${method.price}`}
                          </span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Payment Method */}
                <div className="mb-8">
                  <h2 className="text-lg font-semibold text-gray-900 mb-4">Payment Method</h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="grid gap-4">
                      {paymentMethods.map((method) => (
                        <Label
                          key={method.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                            paymentMethod === method.id
                              ? 'border-amber-900 bg-amber-50'
                              : 'border-gray-200 hover:border-amber-900'
                          }`}
                        >
                          <RadioGroupItem value={method.id} className="mr-4" />
                          <method.icon className="w-5 h-5 text-amber-900 mr-2" />
                          <span className="font-medium">{method.title}</span>
                        </Label>
                      ))}
                    </div>
                  </RadioGroup>

                  {paymentMethod === 'credit-card' && (
                    <div className="mt-4 space-y-4">
                      <div>
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          required
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="expiryDate">Expiry Date</Label>
                          <Input
                            id="expiryDate"
                            name="expiryDate"
                            required
                            value={formData.expiryDate}
                            onChange={handleInputChange}
                            placeholder="MM/YY"
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            name="cvv"
                            required
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <Button 
                  type="submit"
                  className="w-full bg-amber-900 hover:bg-amber-800"
                  disabled={isProcessing}
                >
                  {isProcessing ? 'Processing...' : `Pay $${total.toLocaleString()}`}
                </Button>
              </form>
            </motion.div>
          </div>

          {/* Order Summary */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                  <CardDescription>
                    {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cart.map((item) => (
                      <div key={item.id} className="flex items-center space-x-4">
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
                          <p className="text-sm text-gray-600">
                            ${item.price.toLocaleString()} x {item.quantity}
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
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'FREE' : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="w-full space-y-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Shield className="w-4 h-4 mr-2" />
                      Secure checkout powered by Stripe
                    </div>
                    <Accordion type="single" collapsible>
                      <AccordionItem value="shipping">
                        <AccordionTrigger>Shipping Policy</AccordionTrigger>
                        <AccordionContent>
                          Free standard shipping on orders over $999. Express and overnight shipping available at additional cost.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="returns">
                        <AccordionTrigger>Returns & Refunds</AccordionTrigger>
                        <AccordionContent>
                          30-day return policy for unused items in original packaging. Return shipping fees may apply.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}