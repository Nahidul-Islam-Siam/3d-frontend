import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export interface UIState {
  modals: Record<string, boolean>;
  toasts: Array<{
    id: string;
    type: 'success' | 'error' | 'info' | 'warning';
    message: string;
  }>;
  loading: Record<string, boolean>;
  sidebar: {
    isOpen: boolean;
  };
}

const initialState: UIState = {
  modals: {},
  toasts: [],
  loading: {},
  sidebar: {
    isOpen: true,
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<{ id: string; isOpen: boolean }>) => {
      state.modals[action.payload.id] = action.payload.isOpen;
    },
    addToast: (
      state,
      action: PayloadAction<{
        type: 'success' | 'error' | 'info' | 'warning';
        message: string;
      }>,
    ) => {
      state.toasts.push({
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        ...action.payload,
      });
    },
    removeToast: (state, action: PayloadAction<string>) => {
      state.toasts = state.toasts.filter((toast) => toast.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<{ key: string; isLoading: boolean }>) => {
      state.loading[action.payload.key] = action.payload.isLoading;
    },
    toggleSidebar: (state) => {
      state.sidebar.isOpen = !state.sidebar.isOpen;
    },
  },
});

export const { setModal, addToast, removeToast, setLoading, toggleSidebar } = uiSlice.actions;
export default uiSlice.reducer;

