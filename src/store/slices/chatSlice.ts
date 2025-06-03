
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Message {
  id: string;
  senderId: string;
  content: string;
  timestamp: number;
  read: boolean;
}

interface ChatThread {
  id: string;
  productId: string;
  participants: string[];
  messages: Message[];
  lastMessage?: Message;
  unreadCount: number;
}

interface ChatState {
  threads: ChatThread[];
  activeThread: string | null;
  online: boolean;
}

const initialState: ChatState = {
  threads: [],
  activeThread: null,
  online: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setOnlineStatus: (state, action: PayloadAction<boolean>) => {
      state.online = action.payload;
    },
    setActiveThread: (state, action: PayloadAction<string | null>) => {
      state.activeThread = action.payload;
    },
    addMessage: (state, action: PayloadAction<{ threadId: string; message: Omit<Message, 'id'> }>) => {
      const thread = state.threads.find(t => t.id === action.payload.threadId);
      if (thread) {
        const message = {
          ...action.payload.message,
          id: Math.random().toString(36).substr(2, 9),
        };
        thread.messages.push(message);
        thread.lastMessage = message;
        thread.unreadCount += 1;
      }
    },
    markThreadAsRead: (state, action: PayloadAction<string>) => {
      const thread = state.threads.find(t => t.id === action.payload);
      if (thread) {
        thread.unreadCount = 0;
        thread.messages.forEach(msg => msg.read = true);
      }
    },
  },
});

export const { setOnlineStatus, setActiveThread, addMessage, markThreadAsRead } = chatSlice.actions;
export default chatSlice.reducer;
