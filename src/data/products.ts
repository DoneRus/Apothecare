export type Product = {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  sale_price?: number;
  is_new?: boolean;
  is_featured?: boolean;
  image_url?: string;
  properties?: any;
};

// Featured products (first row)
export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Vitamin D3 Complex",
    category: "Vitamins",
    description: "High-potency vitamin D3 with K2 for optimal calcium absorption and immune support.",
    rating: 5,
    reviews: 42,
    price: 29.99,
    sale_price: 23.99,
    is_new: false,
    properties: {
      serving_size: "5000 IU",
      quantity: "60 capsules"
    }
  },
  {
    id: 2,
    name: "Omega-3 Fish Oil",
    category: "Supplements",
    description: "Pharmaceutical-grade fish oil with high EPA and DHA content for heart and brain health.",
    rating: 4,
    reviews: 28,
    price: 32.99,
    properties: {
      serving_size: "1000mg",
      quantity: "90 softgels"
    }
  },
  {
    id: 3,
    name: "Probiotic Complex",
    category: "Digestive",
    description: "Advanced multi-strain probiotic formula with 50 billion CFU for optimal gut health.",
    rating: 5,
    reviews: 17,
    price: 45.99,
    is_new: true,
    properties: {
      serving_size: "50 billion CFU",
      quantity: "30 capsules"
    }
  },
  {
    id: 4,
    name: "Melatonin Complex",
    category: "Sleep Aid",
    description: "Extended-release melatonin with L-theanine for better sleep quality and relaxation.",
    rating: 4,
    reviews: 35,
    price: 18.99,
    properties: {
      serving_size: "5mg",
      quantity: "60 tablets"
    }
  }
];

// Additional products (for expanded view)
export const allProducts: Product[] = [
  {
    id: 5,
    name: "Multivitamin Complete",
    category: "Vitamins",
    description: "Comprehensive multivitamin with essential nutrients for daily health maintenance.",
    rating: 5,
    reviews: 56,
    price: 39.99,
    properties: {
      serving_size: "1 tablet",
      quantity: "120 tablets"
    }
  },
  {
    id: 6,
    name: "Magnesium Glycinate",
    category: "Minerals",
    description: "Highly bioavailable form of magnesium for muscle function and nervous system support.",
    rating: 4,
    reviews: 31,
    price: 27.99,
    properties: {
      serving_size: "400mg",
      quantity: "90 capsules"
    }
  },
  {
    id: 7,
    name: "Zinc Picolinate",
    category: "Minerals",
    description: "Premium zinc supplement for immune function, skin health, and protein synthesis.",
    rating: 4,
    reviews: 23,
    price: 19.99,
    sale_price: 16.99,
    discount: "15% OFF",
    properties: {
      serving_size: "50mg",
      quantity: "120 capsules"
    }
  },
  {
    id: 8,
    name: "CoQ10 Ubiquinol",
    category: "Heart Health",
    description: "Advanced form of CoQ10 for cellular energy production and cardiovascular support.",
    rating: 5,
    reviews: 47,
    price: 54.99,
    properties: {
      serving_size: "100mg",
      quantity: "60 softgels"
    }
  },
  {
    id: 9,
    name: "Ashwagandha Extract",
    category: "Adaptogen",
    description: "Standardized ashwagandha root extract for stress reduction and adrenal support.",
    rating: 5,
    reviews: 39,
    price: 29.99,
    is_new: true,
    properties: {
      serving_size: "600mg",
      quantity: "90 capsules"
    }
  },
  {
    id: 10,
    name: "Turmeric Curcumin",
    category: "Anti-inflammatory",
    description: "High-potency turmeric extract with black pepper for enhanced bioavailability.",
    rating: 4,
    reviews: 52,
    price: 34.99,
    sale_price: 29.99,
    discount: "15% OFF",
    properties: {
      serving_size: "1000mg",
      quantity: "60 capsules"
    }
  },
  {
    id: 11,
    name: "B-Complex Complete",
    category: "Vitamins",
    description: "Comprehensive B vitamin complex for energy production and nervous system health.",
    rating: 4,
    reviews: 28,
    price: 24.99,
    properties: {
      serving_size: "1 capsule",
      quantity: "90 capsules"
    }
  },
  {
    id: 12,
    name: "Vitamin C Buffered",
    category: "Immune Support",
    description: "Non-acidic, buffered vitamin C for immune support and antioxidant protection.",
    rating: 5,
    reviews: 64,
    price: 26.99,
    properties: {
      serving_size: "1000mg",
      quantity: "120 tablets"
    }
  },
  {
    id: 13,
    name: "Iron Bisglycinate",
    category: "Minerals",
    description: "Gentle, non-constipating iron supplement for optimal blood health and energy.",
    rating: 4,
    reviews: 19,
    price: 21.99,
    properties: {
      serving_size: "25mg",
      quantity: "60 capsules"
    }
  },
  {
    id: 14,
    name: "L-Theanine",
    category: "Relaxation",
    description: "Amino acid from green tea that promotes calm focus without drowsiness.",
    rating: 5,
    reviews: 37,
    price: 28.99,
    properties: {
      serving_size: "200mg",
      quantity: "60 capsules"
    }
  },
  {
    id: 15,
    name: "Calcium Citrate",
    category: "Bone Health",
    description: "Highly absorbable calcium supplement with vitamin D3 for bone density support.",
    rating: 4,
    reviews: 24,
    price: 19.99,
    properties: {
      serving_size: "500mg",
      quantity: "120 tablets"
    }
  },
  {
    id: 16,
    name: "Quercetin Complex",
    category: "Antioxidant",
    description: "Powerful bioflavonoid with bromelain for enhanced absorption and immune support.",
    rating: 4,
    reviews: 18,
    price: 32.99,
    is_new: true,
    properties: {
      serving_size: "500mg",
      quantity: "60 capsules"
    }
  },
]; 