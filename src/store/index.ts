
import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import productsSlice from './slices/productsSlice';
import servicesSlice from './slices/servicesSlice';
import eventsSlice from './slices/eventsSlice';
import resourcesSlice from './slices/resourcesSlice';
import uiSlice from './slices/uiSlice';
import chatSlice from './slices/chatSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    products: productsSlice,
    services: servicesSlice,
    events: eventsSlice,
    resources: resourcesSlice,
    ui: uiSlice,
    chat: chatSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
