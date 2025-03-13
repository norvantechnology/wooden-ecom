export interface ProductDetails {
  dimensions: string;
  material: string;
  finish: string;
  seating?: string;
  weight: string;
  features: string[];
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  details: ProductDetails;
}

export const products: Product[] = [
  {
    id: 1,
    name: 'Artisan Dining Table',
    category: 'Dining Room',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1615066390971-03e4e1c36ddf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Hand-crafted solid oak dining table with natural finish',
    details: {
      dimensions: '72"L x 36"W x 30"H',
      material: 'Solid Oak',
      finish: 'Natural Oil',
      seating: '6-8 people',
      weight: '120 lbs',
      features: [
        'Sustainably sourced oak wood',
        'Hand-finished with natural oils',
        'Sturdy mortise and tenon joinery',
        'Protective felt pads included',
        'Custom sizes available upon request'
      ]
    }
  },
  {
    id: 2,
    name: 'Modern Lounge Chair',
    category: 'Living Room',
    price: 799,
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Contemporary wooden armchair with premium upholstery',
    details: {
      dimensions: '28"L x 32"W x 34"H',
      material: 'Walnut, Premium Fabric',
      finish: 'Matte Lacquer',
      weight: '45 lbs',
      features: [
        'Ergonomic design',
        'High-density foam cushioning',
        'Stain-resistant fabric',
        'Solid walnut frame',
        'Available in multiple fabric options'
      ]
    }
  },
  {
    id: 3,
    name: 'Classic Bedframe',
    category: 'Bedroom',
    price: 1499,
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Elegant queen-size bed frame in walnut finish',
    details: {
      dimensions: '86"L x 64"W x 48"H',
      material: 'Solid Walnut',
      finish: 'Hand-rubbed Oil',
      weight: '180 lbs',
      features: [
        'Traditional mortise and tenon joinery',
        'Adjustable slat support system',
        'Hidden hardware design',
        'Compatible with standard queen mattresses',
        'Optional under-bed storage available'
      ]
    }
  },
  {
    id: 4,
    name: 'Storage Cabinet',
    category: 'Living Room',
    price: 899,
    image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Versatile storage solution with adjustable shelves',
    details: {
      dimensions: '36"L x 18"W x 72"H',
      material: 'Maple, Brass Hardware',
      finish: 'Clear Satin',
      weight: '95 lbs',
      features: [
        'Adjustable shelving system',
        'Soft-close hinges',
        'Dovetailed drawers',
        'Anti-tip safety hardware included',
        'Custom hardware options available'
      ]
    }
  },
  {
    id: 5,
    name: 'Coffee Table',
    category: 'Living Room',
    price: 599,
    image: 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Minimalist coffee table with solid wood construction',
    details: {
      dimensions: '48"L x 24"W x 18"H',
      material: 'Cherry Wood',
      finish: 'Danish Oil',
      weight: '65 lbs',
      features: [
        'Floating top design',
        'Hidden storage compartment',
        'Non-marking feet',
        'Waterproof finish',
        'Integrated cable management'
      ]
    }
  },
  {
    id: 6,
    name: 'Dining Chairs Set',
    category: 'Dining Room',
    price: 1199,
    image: 'https://images.unsplash.com/photo-1604578762246-41134e37f9cc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Set of 6 matching dining chairs with comfortable padding',
    details: {
      dimensions: '18"L x 22"W x 36"H (each)',
      material: 'Oak, Premium Leather',
      finish: 'Natural Oil',
      weight: '15 lbs each',
      features: [
        'Ergonomic seat design',
        'Genuine leather upholstery',
        'Mortise and tenon joinery',
        'Protective floor pads',
        'Additional chairs available'
      ]
    }
  },
  {
    id: 7,
    name: 'Vintage Armchair',
    category: 'Living Room',
    price: 599,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Timeless armchair with vintage-inspired design',
    details: {
      dimensions: '30"L x 32"W x 36"H',
      material: 'Mahogany, Velvet Upholstery',
      finish: 'Antique Wax',
      weight: '50 lbs',
      features: [
        'Hand-carved mahogany frame',
        'Plush velvet upholstery',
        'Button-tufted backrest',
        'Solid wood legs',
        'Available in multiple colors'
      ]
    }
  },
  {
    id: 8,
    name: 'Industrial Side Table',
    category: 'Living Room',
    price: 199,
    image: 'https://images.unsplash.com/photo-1604066818735-8d1c2f2a1b3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Sleek industrial-style side table with metal accents',
    details: {
      dimensions: '18"L x 18"W x 24"H',
      material: 'Steel, Reclaimed Wood',
      finish: 'Powder Coat',
      weight: '25 lbs',
      features: [
        'Reclaimed wood tabletop',
        'Powder-coated steel frame',
        'Minimalist design',
        'Easy to assemble',
        'Perfect for small spaces'
      ]
    }
  },
  {
    id: 9,
    name: 'Mid-Century Sofa',
    category: 'Living Room',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
    description: 'Iconic mid-century modern sofa with walnut legs',
    details: {
      dimensions: '84"L x 32"W x 30"H',
      material: 'Walnut, Premium Fabric',
      finish: 'Matte Lacquer',
      weight: '120 lbs',
      features: [
        'Solid walnut legs',
        'High-resilience foam cushions',
        'Removable upholstery',
        'Timeless mid-century design',
        'Available in multiple fabric options'
      ]
    }
  }
];