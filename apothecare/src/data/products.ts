export type Product = {
  id: number;
  name: string;
  category: string;
  categoryColor: string;
  description: string;
  rating: number;
  reviews: number;
  price: number;
  salePrice?: number;
  discount?: string;
  isNew?: boolean;
  properties: string[];
  propertyColor: string;
  servingSize: string;
  quantity: string;
};

// Featured products (first row)
export const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Vitamin D3 Complex",
    category: "Vitamins",
    categoryColor: "primary-dark",
    description: "High-potency vitamin D3 with K2 for optimal calcium absorption and immune support.",
    rating: 5,
    reviews: 42,
    price: 29.99,
    salePrice: 23.99,
    discount: "20% OFF",
    properties: ["5000 IU per serving", "60 capsules"],
    propertyColor: "primary",
    servingSize: "5000 IU",
    quantity: "60 capsules"
  },
  {
    id: 2,
    name: "Omega-3 Fish Oil",
    category: "Supplements",
    categoryColor: "blue",
    description: "Pharmaceutical-grade fish oil with high EPA and DHA content for heart and brain health.",
    rating: 4,
    reviews: 28,
    price: 32.99,
    properties: ["1000mg per serving", "90 softgels"],
    propertyColor: "blue",
    servingSize: "1000mg",
    quantity: "90 softgels"
  },
  {
    id: 3,
    name: "Probiotic Complex",
    category: "Digestive",
    categoryColor: "green",
    description: "Advanced multi-strain probiotic formula with 50 billion CFU for optimal gut health.",
    rating: 5,
    reviews: 17,
    price: 45.99,
    isNew: true,
    properties: ["50 billion CFU", "30 capsules"],
    propertyColor: "green",
    servingSize: "50 billion CFU",
    quantity: "30 capsules"
  },
  {
    id: 4,
    name: "Melatonin Complex",
    category: "Sleep Aid",
    categoryColor: "purple",
    description: "Extended-release melatonin with L-theanine for better sleep quality and relaxation.",
    rating: 4,
    reviews: 35,
    price: 18.99,
    properties: ["5mg per tablet", "60 tablets"],
    propertyColor: "purple",
    servingSize: "5mg",
    quantity: "60 tablets"
  }
];

// Additional products (for expanded view)
export const allProducts: Product[] = [
  {
    id: 5,
    name: "Multivitamin Complete",
    category: "Vitamins",
    categoryColor: "amber",
    description: "Comprehensive multivitamin with essential nutrients for daily health maintenance.",
    rating: 5,
    reviews: 56,
    price: 39.99,
    properties: ["Contains 23 vitamins & minerals", "120 tablets"],
    propertyColor: "amber",
    servingSize: "1 tablet",
    quantity: "120 tablets"
  },
  {
    id: 6,
    name: "Magnesium Glycinate",
    category: "Minerals",
    categoryColor: "teal",
    description: "Highly bioavailable form of magnesium for muscle function and nervous system support.",
    rating: 4,
    reviews: 31,
    price: 27.99,
    properties: ["400mg per serving", "90 capsules"],
    propertyColor: "teal",
    servingSize: "400mg",
    quantity: "90 capsules"
  },
  {
    id: 7,
    name: "Zinc Picolinate",
    category: "Minerals",
    categoryColor: "sky",
    description: "Premium zinc supplement for immune function, skin health, and protein synthesis.",
    rating: 4,
    reviews: 23,
    price: 19.99,
    salePrice: 16.99,
    discount: "15% OFF",
    properties: ["50mg per capsule", "120 capsules"],
    propertyColor: "sky",
    servingSize: "50mg",
    quantity: "120 capsules"
  },
  {
    id: 8,
    name: "CoQ10 Ubiquinol",
    category: "Heart Health",
    categoryColor: "red",
    description: "Advanced form of CoQ10 for cellular energy production and cardiovascular support.",
    rating: 5,
    reviews: 47,
    price: 54.99,
    properties: ["100mg per softgel", "60 softgels"],
    propertyColor: "red",
    servingSize: "100mg",
    quantity: "60 softgels"
  },
  {
    id: 9,
    name: "Ashwagandha Extract",
    category: "Adaptogen",
    categoryColor: "amber",
    description: "Standardized ashwagandha root extract for stress reduction and adrenal support.",
    rating: 5,
    reviews: 39,
    price: 29.99,
    isNew: true,
    properties: ["600mg per capsule", "90 capsules"],
    propertyColor: "amber",
    servingSize: "600mg",
    quantity: "90 capsules"
  },
  {
    id: 10,
    name: "Turmeric Curcumin",
    category: "Anti-inflammatory",
    categoryColor: "yellow",
    description: "High-potency turmeric extract with black pepper for enhanced bioavailability.",
    rating: 4,
    reviews: 52,
    price: 34.99,
    salePrice: 29.99,
    discount: "15% OFF",
    properties: ["1000mg per serving", "60 capsules"],
    propertyColor: "yellow",
    servingSize: "1000mg",
    quantity: "60 capsules"
  },
  {
    id: 11,
    name: "B-Complex Complete",
    category: "Vitamins",
    categoryColor: "green",
    description: "Comprehensive B vitamin complex for energy production and nervous system health.",
    rating: 4,
    reviews: 28,
    price: 24.99,
    properties: ["8 essential B vitamins", "90 capsules"],
    propertyColor: "green",
    servingSize: "1 capsule",
    quantity: "90 capsules"
  },
  {
    id: 12,
    name: "Vitamin C Buffered",
    category: "Immune Support",
    categoryColor: "orange",
    description: "Non-acidic, buffered vitamin C for immune support and antioxidant protection.",
    rating: 5,
    reviews: 64,
    price: 26.99,
    properties: ["1000mg per tablet", "120 tablets"],
    propertyColor: "orange",
    servingSize: "1000mg",
    quantity: "120 tablets"
  },
  {
    id: 13,
    name: "Iron Bisglycinate",
    category: "Minerals",
    categoryColor: "rose",
    description: "Gentle, non-constipating iron supplement for optimal blood health and energy.",
    rating: 4,
    reviews: 19,
    price: 21.99,
    properties: ["25mg per capsule", "60 capsules"],
    propertyColor: "rose",
    servingSize: "25mg",
    quantity: "60 capsules"
  },
  {
    id: 14,
    name: "L-Theanine",
    category: "Relaxation",
    categoryColor: "blue",
    description: "Amino acid from green tea that promotes calm focus without drowsiness.",
    rating: 5,
    reviews: 37,
    price: 28.99,
    properties: ["200mg per capsule", "60 capsules"],
    propertyColor: "blue",
    servingSize: "200mg",
    quantity: "60 capsules"
  },
  {
    id: 15,
    name: "Calcium Citrate",
    category: "Bone Health",
    categoryColor: "gray",
    description: "Highly absorbable calcium supplement with vitamin D3 for bone density support.",
    rating: 4,
    reviews: 24,
    price: 19.99,
    properties: ["500mg per tablet", "120 tablets"],
    propertyColor: "gray",
    servingSize: "500mg",
    quantity: "120 tablets"
  },
  {
    id: 16,
    name: "Quercetin Complex",
    category: "Antioxidant",
    categoryColor: "purple",
    description: "Powerful bioflavonoid with bromelain for enhanced absorption and immune support.",
    rating: 4,
    reviews: 18,
    price: 32.99,
    isNew: true,
    properties: ["500mg per capsule", "60 capsules"],
    propertyColor: "purple",
    servingSize: "500mg",
    quantity: "60 capsules"
  },
]; 