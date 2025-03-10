import { Facebook, Instagram, Twitter } from 'lucide-react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-amber-50">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-amber-900">Artisan Woods</h3>
            <p className="text-sm text-gray-600">
              Crafting timeless wooden furniture with passion and precision since 1995.
            </p>
          </div>
          
          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm text-gray-600 hover:text-amber-900">
                  Our Products
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm text-gray-600 hover:text-amber-900">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-gray-600 hover:text-amber-900">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shipping" className="text-sm text-gray-600 hover:text-amber-900">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-sm text-gray-600 hover:text-amber-900">
                  Returns Policy
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-gray-600 hover:text-amber-900">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-600 hover:text-amber-900">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-900">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-amber-900">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-8">
          <p className="text-sm text-gray-600 text-center">
            © {new Date().getFullYear()} Artisan Woods. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}