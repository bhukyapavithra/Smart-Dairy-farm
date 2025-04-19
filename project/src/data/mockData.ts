import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Organic Whole Milk',
    description: 'Fresh, unpasteurized whole milk from grass-fed cows. Rich in nutrients and natural enzymes that aid digestion. Our cows graze freely on organic pastures, resulting in milk that\'s both delicious and nutritious.',
    price: 4.99,
    quantity: 50,
    unit: 'liter',
    category: 'milk',
    imageUrl: 'https://images.pexels.com/photos/248412/pexels-photo-248412.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f1',
    farmerName: 'Green Pastures Dairy',
    isFeatured: true,
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '2',
    name: 'Organic Skim Milk',
    description: 'Low-fat, unpasteurized skim milk from our grass-fed cows. All the nutrients without the extra fat. Perfect for those watching their calorie intake while still enjoying the benefits of pure, fresh milk.',
    price: 4.49,
    quantity: 45,
    unit: 'liter',
    category: 'milk',
    imageUrl: 'https://images.pexels.com/photos/416656/pexels-photo-416656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f1',
    farmerName: 'Green Pastures Dairy',
    isFeatured: false,
    createdAt: new Date(Date.now() - 28 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '3',
    name: 'Fresh Farm Cheese',
    description: 'Handcrafted cheese made from our organic milk. Creamy, rich, and full of flavor. Aged to perfection using traditional methods passed down through generations of cheesemakers.',
    price: 6.99,
    quantity: 30,
    unit: '200g',
    category: 'cheese',
    imageUrl: 'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f1',
    farmerName: 'Green Pastures Dairy',
    isFeatured: true,
    createdAt: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '4',
    name: 'Natural Yogurt',
    description: 'Probiotic-rich yogurt made with our organic whole milk. No added sugar or preservatives. Packed with live cultures for gut health, our yogurt is both delicious and beneficial for your digestive system.',
    price: 3.49,
    quantity: 40,
    unit: '500g',
    category: 'yogurt',
    imageUrl: 'https://images.pexels.com/photos/128865/pexels-photo-128865.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f2',
    farmerName: 'Sunny Valley Farm',
    isFeatured: false,
    createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '5',
    name: 'Organic Butter',
    description: 'Rich, creamy butter made from organic cream. Perfect for cooking or spreading. Our slow-churned butter has a superior taste and texture that will enhance any dish or simply make your morning toast extraordinary.',
    price: 5.99,
    quantity: 25,
    unit: '250g',
    category: 'butter',
    imageUrl: 'https://images.pexels.com/photos/531334/pexels-photo-531334.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f2',
    farmerName: 'Sunny Valley Farm',
    isFeatured: true,
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '6',
    name: 'A2 Milk',
    description: 'A2 milk from specially bred cows. Easier to digest for those with milk sensitivities. Contains only the A2 protein, which many people find gentler on their digestive systems compared to conventional milk.',
    price: 5.99,
    quantity: 30,
    unit: 'liter',
    category: 'milk',
    imageUrl: 'https://images.pexels.com/photos/5946650/pexels-photo-5946650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f3',
    farmerName: 'Meadow Brook Dairy',
    isFeatured: false,
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '7',
    name: 'Flavored Yogurt Pack',
    description: 'Assorted pack of flavored yogurts made with organic milk and real fruit. No artificial flavors or preservatives. Each pack contains a variety of seasonal fruit flavors, all made with our signature probiotic yogurt base.',
    price: 8.99,
    quantity: 20,
    unit: '4x125g',
    category: 'yogurt',
    imageUrl: 'https://images.pexels.com/photos/1435706/pexels-photo-1435706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f3',
    farmerName: 'Meadow Brook Dairy',
    isFeatured: true,
    createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '8',
    name: 'Artisan Goat Cheese',
    description: 'Soft, tangy goat cheese made from the milk of our free-range goats. Handcrafted in small batches. Our goats graze on diverse pastures, giving their milk a complex flavor profile that shines through in this artisanal cheese.',
    price: 7.99,
    quantity: 15,
    unit: '150g',
    category: 'cheese',
    imageUrl: 'https://images.pexels.com/photos/821365/pexels-photo-821365.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f4',
    farmerName: 'Highland Goat Farm',
    isFeatured: false,
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '9',
    name: 'Raw Milk Cheese Sampler',
    description: 'Collection of different raw milk cheeses, perfect for a tasting board. Includes aged, soft, and firm varieties. This curated selection showcases the depth and variety possible with raw milk cheese production techniques.',
    price: 15.99,
    quantity: 10,
    unit: '400g assorted',
    category: 'cheese',
    imageUrl: 'https://images.pexels.com/photos/2531189/pexels-photo-2531189.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f4',
    farmerName: 'Highland Goat Farm',
    isFeatured: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  },
  {
    id: '10',
    name: 'Chocolate Milk',
    description: 'Organic whole milk flavored with real cocoa. A delicious treat for kids and adults alike. We use fair-trade cocoa and a touch of organic honey to create a chocolate milk that\'s indulgent yet wholesome.',
    price: 4.49,
    quantity: 35,
    unit: 'liter',
    category: 'milk',
    imageUrl: 'https://images.pexels.com/photos/1092587/pexels-photo-1092587.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    farmerId: 'f2',
    farmerName: 'Sunny Valley Farm',
    isFeatured: false,
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
  }
];

export const mockFarmers = [
  {
    id: 'f1',
    farmName: 'Green Pastures Dairy',
    location: { lat: 40.7128, lng: -74.0060 },
    description: 'Family-owned dairy farm with grass-fed cows. We\'ve been producing organic, unpasteurized milk for three generations.',
    founded: '1982',
    contactPhone: '555-123-4567'
  },
  {
    id: 'f2',
    farmName: 'Sunny Valley Farm',
    location: { lat: 40.7328, lng: -73.9860 },
    description: 'Sustainable farming practices with a focus on animal welfare. Our happy cows produce the creamiest, most flavorful milk.',
    founded: '1995',
    contactPhone: '555-234-5678'
  },
  {
    id: 'f3',
    farmName: 'Meadow Brook Dairy',
    location: { lat: 40.6928, lng: -74.0260 },
    description: 'Specializing in A2 milk and artisanal dairy products. Our carefully bred herd produces milk that\'s easier to digest.',
    founded: '2005',
    contactPhone: '555-345-6789'
  },
  {
    id: 'f4',
    farmName: 'Highland Goat Farm',
    location: { lat: 40.7228, lng: -73.9960 },
    description: 'Free-range goats producing high-quality milk for our award-winning cheeses. Located in the beautiful highland countryside.',
    founded: '2010',
    contactPhone: '555-456-7890'
  }
];