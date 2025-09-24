import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { createAuthSlice, type AuthSlice } from './slices/auth';
import { createUiSlice, type UiSlice } from './slices/ui';

// Combine all slices into the main store type
export type AppStore = AuthSlice & UiSlice;

// Create the main store
export const useAppStore = create<AppStore>()(
  devtools(
    (...args) => ({
      ...createAuthSlice(...args),
      ...createUiSlice(...args),
    }),
    {
      name: 'app-store',
    }
  )
);

// Export individual slice hooks for convenience
export const useAuth = () => useAppStore(state => ({
  user: state.user,
  isAuthenticated: state.isAuthenticated,
  loading: state.authLoading,
  error: state.authError,
  login: state.login,
  logout: state.logout,
  register: state.register,
  clearAuthError: state.clearAuthError,
  initAuth: state.initAuth,
}));

export const useUI = () => useAppStore(state => ({
  theme: state.theme,
  sidebarCollapsed: state.sidebarCollapsed,
  toggleTheme: state.toggleTheme,
  setTheme: state.setTheme,
  toggleSidebar: state.toggleSidebar,
  setSidebarCollapsed: state.setSidebarCollapsed,
}));

// Export types
export type { AuthSlice, UiSlice } from './slices';
export * from './types';
