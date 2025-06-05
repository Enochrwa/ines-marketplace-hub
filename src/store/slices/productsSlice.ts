
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  condition: 'new' | 'excellent' | 'good' | 'fair' | 'poor';
  category: string;
  subcategory?: string;
  images: string[];
  seller: {
    id: string;
    name: string;
    avatar?: string;
    reputation: number;
    verified: boolean;
  };
  location: string;
  tags: string[];
  isFree: boolean;
  isActive: boolean;
  views: number;
  likes: number;
  ownerType?: 'student' | 'university';
  staffOnly?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface ProductsState {
  items: Product[];
  favorites: string[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    category: string;
    priceRange: [number, number];
    condition: string[];
    location: string;
    sortBy: 'newest' | 'oldest' | 'price-low' | 'price-high' | 'popular';
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
}

const initialState: ProductsState = {
  items: [],
  favorites: JSON.parse(localStorage.getItem('favorites') || '[]'),
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    category: 'All',
    priceRange: [0, 1000],
    condition: [],
    location: '',
    sortBy: 'newest',
  },
  pagination: {
    page: 1,
    limit: 12,
    total: 0,
  },
};

export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async (params: { page?: number; search?: string; filters?: any }) => {
    // Mock API call with expanded realistic data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Complete Engineering Mathematics Textbook Bundle',
        description: 'Premium collection of engineering math books including Calculus I-III, Linear Algebra, Differential Equations, and Statistics. Excellent condition with minimal highlighting. Perfect for engineering students.',
        price: 120,
        condition: 'excellent',
        category: 'Books',
        subcategory: 'Engineering',
        images: [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400'
        ],
        seller: {
          id: 'seller1',
          name: 'Marie Uwimana',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
          reputation: 4.9,
          verified: true,
        },
        location: 'Campus Library Area',
        tags: ['mathematics', 'engineering', 'textbooks', 'calculus', 'bundle'],
        isFree: false,
        isActive: true,
        views: 156,
        likes: 28,
        ownerType: 'student',
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        title: 'MacBook Air M2 (2022) - Perfect for Students',
        description: 'Pristine condition MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Used for one semester only. Includes original charger, box, documentation, and premium protective case worth $50.',
        price: 1100,
        condition: 'excellent',
        category: 'Personal Tech',
        subcategory: 'Laptops',
        images: [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400',
          'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'
        ],
        seller: {
          id: 'seller2',
          name: 'Jean Baptiste Mugabo',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          reputation: 4.8,
          verified: true,
        },
        location: 'Engineering Building',
        tags: ['laptop', 'apple', 'macbook', 'student', 'portable'],
        isFree: false,
        isActive: true,
        views: 203,
        likes: 45,
        ownerType: 'student',
        createdAt: '2024-01-14T14:20:00Z',
        updatedAt: '2024-01-14T14:20:00Z',
      },
      {
        id: '3',
        title: 'Complete Dorm Furniture Set - Moving Out Sale',
        description: 'Selling entire dorm setup! Premium ergonomic desk, matching chair, 5-tier bookshelf, adjustable desk lamp, and modular storage containers. Everything in excellent condition. Perfect for incoming students.',
        price: 220,
        condition: 'good',
        category: 'Furniture',
        subcategory: 'Dorm',
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
          'https://images.unsplash.com/photo-1493663284031-b7e3aaa4b953?w=400'
        ],
        seller: {
          id: 'seller3',
          name: 'Aisha Mutoni',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          reputation: 4.7,
          verified: true,
        },
        location: 'Student Residence',
        tags: ['furniture', 'dorm', 'desk', 'chair', 'storage', 'set'],
        isFree: false,
        isActive: true,
        views: 134,
        likes: 22,
        ownerType: 'student',
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
      },
      {
        id: '4',
        title: 'Advanced Research Microscope - Biology Department',
        description: 'Professional-grade microscope from Biology Department surplus. Recently calibrated and serviced. Includes multiple objective lenses, specimen slides, and carrying case. Perfect for advanced research projects.',
        price: 580,
        condition: 'excellent',
        category: 'Lab Equipment',
        subcategory: 'Biology',
        images: [
          'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
          'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400'
        ],
        seller: {
          id: 'dept1',
          name: 'Biology Department',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          reputation: 5.0,
          verified: true,
        },
        location: 'Science Building',
        tags: ['microscope', 'laboratory', 'biology', 'research', 'professional'],
        isFree: false,
        isActive: true,
        views: 89,
        likes: 15,
        ownerType: 'university',
        staffOnly: false,
        createdAt: '2024-01-12T11:00:00Z',
        updatedAt: '2024-01-12T11:00:00Z',
      },
      {
        id: '5',
        title: 'iPhone 14 Pro - Mint Condition with Accessories',
        description: 'Barely used iPhone 14 Pro in Space Black, 128GB. Includes original box, charger, unused EarPods, premium case, and screen protector already applied. No scratches or damage.',
        price: 850,
        condition: 'excellent',
        category: 'Personal Tech',
        subcategory: 'Smartphones',
        images: [
          'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400',
          'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400'
        ],
        seller: {
          id: 'seller4',
          name: 'David Nshimiyimana',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          reputation: 4.9,
          verified: true,
        },
        location: 'Student Center',
        tags: ['iphone', 'smartphone', 'apple', 'accessories', 'pristine'],
        isFree: false,
        isActive: true,
        views: 278,
        likes: 52,
        ownerType: 'student',
        createdAt: '2024-01-11T16:45:00Z',
        updatedAt: '2024-01-11T16:45:00Z',
      },
      {
        id: '6',
        title: 'Gaming Setup - Alienware Laptop + Peripherals',
        description: 'Complete gaming setup! Alienware m15 R6 with RTX 3070, mechanical keyboard, gaming mouse, headset, and laptop stand. Perfect for both gaming and intensive coursework. Excellent condition.',
        price: 1450,
        condition: 'good',
        category: 'Personal Tech',
        subcategory: 'Gaming',
        images: [
          'https://images.unsplash.com/photo-1593640408182-31c70c8268f5?w=400',
          'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400'
        ],
        seller: {
          id: 'seller5',
          name: 'Alex Rugamba',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150',
          reputation: 4.6,
          verified: true,
        },
        location: 'Engineering Building',
        tags: ['gaming', 'alienware', 'laptop', 'setup', 'peripherals'],
        isFree: false,
        isActive: true,
        views: 167,
        likes: 38,
        ownerType: 'student',
        createdAt: '2024-01-10T13:30:00Z',
        updatedAt: '2024-01-10T13:30:00Z',
      },
      {
        id: '7',
        title: 'Kitchen Essentials Bundle - Perfect for Dorm Cooking',
        description: 'Complete kitchen starter pack! Includes rice cooker, blender, coffee maker, utensil set, plates, bowls, and storage containers. Everything needed for dorm cooking. Great condition.',
        price: 95,
        condition: 'good',
        category: 'Kitchenware',
        subcategory: 'Appliances',
        images: [
          'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400',
          'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400'
        ],
        seller: {
          id: 'seller6',
          name: 'Grace Umutesi',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
          reputation: 4.8,
          verified: true,
        },
        location: 'Student Residence',
        tags: ['kitchen', 'cooking', 'appliances', 'dorm', 'bundle'],
        isFree: false,
        isActive: true,
        views: 145,
        likes: 25,
        ownerType: 'student',
        createdAt: '2024-01-09T11:20:00Z',
        updatedAt: '2024-01-09T11:20:00Z',
      },
      {
        id: '8',
        title: 'Winter Clothing Collection - Brand Name Items',
        description: 'High-quality winter clothing collection. Includes North Face jacket, wool sweaters, thermal wear, scarves, and gloves. Various sizes available. Perfect for Rwanda\'s cool season.',
        price: 180,
        condition: 'excellent',
        category: 'Clothing',
        subcategory: 'Winter Wear',
        images: [
          'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400',
          'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400'
        ],
        seller: {
          id: 'seller7',
          name: 'Emma Kamanzi',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          reputation: 4.7,
          verified: true,
        },
        location: 'Campus Library Area',
        tags: ['clothing', 'winter', 'jacket', 'brand', 'collection'],
        isFree: false,
        isActive: true,
        views: 98,
        likes: 19,
        ownerType: 'student',
        createdAt: '2024-01-08T14:15:00Z',
        updatedAt: '2024-01-08T14:15:00Z',
      },
      {
        id: '9',
        title: 'Art Supplies Complete Set - Professional Grade',
        description: 'Professional art supplies collection. Includes acrylic paints, brushes, canvases, sketchbooks, pencils, and easel. Perfect for art students or hobbyists. Barely used.',
        price: 125,
        condition: 'excellent',
        category: 'Art & Crafts',
        subcategory: 'Painting',
        images: [
          'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400',
          'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400'
        ],
        seller: {
          id: 'seller8',
          name: 'Samuel Habimana',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
          reputation: 4.9,
          verified: true,
        },
        location: 'Art Department',
        tags: ['art', 'painting', 'supplies', 'professional', 'creative'],
        isFree: false,
        isActive: true,
        views: 76,
        likes: 14,
        ownerType: 'student',
        createdAt: '2024-01-07T10:00:00Z',
        updatedAt: '2024-01-07T10:00:00Z',
      },
      {
        id: '10',
        title: 'FREE Study Materials - Engineering Notes & Past Papers',
        description: 'Comprehensive collection of engineering study materials, handwritten notes, and past examination papers. Covers multiple engineering courses. Free for fellow students!',
        price: 0,
        condition: 'good',
        category: 'Books',
        subcategory: 'Study Materials',
        images: [
          'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400'
        ],
        seller: {
          id: 'seller9',
          name: 'Linda Uwimana',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
          reputation: 4.8,
          verified: true,
        },
        location: 'Engineering Building',
        tags: ['free', 'study', 'notes', 'engineering', 'papers'],
        isFree: true,
        isActive: true,
        views: 234,
        likes: 67,
        ownerType: 'student',
        createdAt: '2024-01-06T09:30:00Z',
        updatedAt: '2024-01-06T09:30:00Z',
      }
    ];
    
    return {
      products: mockProducts,
      total: mockProducts.length,
    };
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setCategory: (state, action: PayloadAction<string>) => {
      state.filters.category = action.payload;
    },
    setPriceRange: (state, action: PayloadAction<[number, number]>) => {
      state.filters.priceRange = action.payload;
    },
    setCondition: (state, action: PayloadAction<string[]>) => {
      state.filters.condition = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<ProductsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    toggleFavorite: (state, action: PayloadAction<string>) => {
      const productId = action.payload;
      const index = state.favorites.indexOf(productId);
      
      if (index > -1) {
        state.favorites.splice(index, 1);
      } else {
        state.favorites.push(productId);
      }
      
      localStorage.setItem('favorites', JSON.stringify(state.favorites));
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.products;
        state.pagination.total = action.payload.total;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch products';
      });
  },
});

export const { 
  setSearchTerm, 
  setCategory, 
  setPriceRange, 
  setCondition,
  setFilters, 
  toggleFavorite, 
  clearFilters 
} = productsSlice.actions;

export default productsSlice.reducer;
