
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
    // Mock API call with realistic data
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockProducts: Product[] = [
      {
        id: '1',
        title: 'Engineering Mathematics Textbook Bundle',
        description: 'Complete set of engineering math books including Calculus I-III, Linear Algebra, and Differential Equations. Excellent condition with minimal highlighting.',
        price: 85,
        condition: 'excellent',
        category: 'Books',
        subcategory: 'Engineering',
        images: [
          'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400',
          'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400'
        ],
        seller: {
          id: 'seller1',
          name: 'Marie Uwimana',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150',
          reputation: 4.9,
          verified: true,
        },
        location: 'Campus Library Area',
        tags: ['mathematics', 'engineering', 'textbooks', 'calculus'],
        isFree: false,
        isActive: true,
        views: 124,
        likes: 15,
        createdAt: '2024-01-15T10:30:00Z',
        updatedAt: '2024-01-15T10:30:00Z',
      },
      {
        id: '2',
        title: 'MacBook Air M2 (2022) - Perfect for Students',
        description: 'Excellent condition MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Used for one semester, includes original charger, box, and protective case.',
        price: 950,
        condition: 'excellent',
        category: 'Electronics',
        subcategory: 'Laptops',
        images: [
          'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400',
          'https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?w=400'
        ],
        seller: {
          id: 'seller2',
          name: 'Jean Baptiste',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
          reputation: 4.7,
          verified: true,
        },
        location: 'Engineering Building',
        tags: ['laptop', 'apple', 'macbook', 'student'],
        isFree: false,
        isActive: true,
        views: 89,
        likes: 23,
        createdAt: '2024-01-14T14:20:00Z',
        updatedAt: '2024-01-14T14:20:00Z',
      },
      {
        id: '3',
        title: 'Complete Dorm Furniture Set - Moving Out Sale',
        description: 'Selling my entire dorm setup! Includes desk, ergonomic chair, bookshelf, desk lamp, and storage containers. Everything in great condition.',
        price: 180,
        condition: 'good',
        category: 'Furniture',
        subcategory: 'Dorm',
        images: [
          'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400',
          'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400'
        ],
        seller: {
          id: 'seller3',
          name: 'Aisha Mutoni',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
          reputation: 4.8,
          verified: true,
        },
        location: 'Student Residence',
        tags: ['furniture', 'dorm', 'desk', 'chair', 'storage'],
        isFree: false,
        isActive: true,
        views: 67,
        likes: 12,
        createdAt: '2024-01-13T09:15:00Z',
        updatedAt: '2024-01-13T09:15:00Z',
      },
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

export const { setSearchTerm, setFilters, toggleFavorite, clearFilters } = productsSlice.actions;
export default productsSlice.reducer;
