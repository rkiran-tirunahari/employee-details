import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: { isLoggedIn: !!localStorage.getItem('token') },
  reducers: {
    login(state) {
      state.isLoggedIn = true;
    },
    logout(state) {
      state.isLoggedIn = false;
    },
  },
});

// View slice (grid/tile)
const viewSlice = createSlice({
  name: 'view',
  initialState: { view: 'grid' as 'grid' | 'tile' },
  reducers: {
    setView(state, action: PayloadAction<'grid' | 'tile'>) {
      state.view = action.payload;
    },
  },
});

export const { login, logout } = authSlice.actions;
export const { setView } = viewSlice.actions;

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    view: viewSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
