import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { products } from '../data';
import ProductDetailsClient from './ProductDetailsClient';

export async function generateStaticParams() {
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export default function ProductDetails({ params }: { params: { id: string } }) {
  const product = products.find(p => p.id === Number(params.id));
  
  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <Link href="/products" className="text-amber-900 hover:text-amber-800">
            Return to Products
          </Link>
        </div>
      </div>
    );
  }

  return <ProductDetailsClient product={product} />;
}