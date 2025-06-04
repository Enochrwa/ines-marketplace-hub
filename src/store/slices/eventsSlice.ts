
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  coverImage: string;
  organizer: {
    id: string;
    name: string;
    avatar?: string;
    type: 'club' | 'department' | 'student';
  };
  ticketInfo: {
    type: 'free' | 'paid';
    price?: number;
    capacity: number;
    registered: number;
    maxPerUser: number;
  };
  tags: string[];
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  isApproved: boolean;
  createdAt: string;
}

interface EventsState {
  events: Event[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  filters: {
    category: string;
    ticketType: string;
    dateRange: string;
    status: string;
  };
}

const initialState: EventsState = {
  events: [],
  loading: false,
  error: null,
  searchTerm: '',
  filters: {
    category: 'All',
    ticketType: 'All',
    dateRange: 'All',
    status: 'upcoming',
  },
};

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockEvents: Event[] = [
      {
        id: '1',
        title: 'Tech Innovation Summit 2024',
        description: 'Join us for a day of tech talks, networking, and innovation. Featuring guest speakers from leading tech companies.',
        date: '2024-02-15',
        time: '09:00',
        location: 'Main Auditorium',
        category: 'Technology',
        coverImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        organizer: {
          id: 'org1',
          name: 'Engineering Club',
          avatar: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=150',
          type: 'club',
        },
        ticketInfo: {
          type: 'free',
          capacity: 200,
          registered: 45,
          maxPerUser: 2,
        },
        tags: ['technology', 'innovation', 'networking'],
        status: 'upcoming',
        isApproved: true,
        createdAt: '2024-01-10T14:20:00Z',
      },
      {
        id: '2',
        title: 'Career Fair 2024',
        description: 'Meet with top employers and explore career opportunities. Bring your CV and dress professionally.',
        date: '2024-02-20',
        time: '10:00',
        location: 'Sports Complex',
        category: 'Career',
        coverImage: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400',
        organizer: {
          id: 'org2',
          name: 'Career Services',
          avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150',
          type: 'department',
        },
        ticketInfo: {
          type: 'free',
          capacity: 500,
          registered: 234,
          maxPerUser: 1,
        },
        tags: ['career', 'jobs', 'networking'],
        status: 'upcoming',
        isApproved: true,
        createdAt: '2024-01-08T10:15:00Z',
      },
    ];
    
    return mockEvents;
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
    },
    setEventFilters: (state, action: PayloadAction<Partial<EventsState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearEventFilters: (state) => {
      state.filters = initialState.filters;
      state.searchTerm = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch events';
      });
  },
});

export const { 
  setEventSearchTerm,
  setEventFilters, 
  clearEventFilters 
} = eventsSlice.actions;

export default eventsSlice.reducer;
