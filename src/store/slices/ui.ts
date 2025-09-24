import { StateCreator } from 'zustand';

export type Theme = 'light' | 'dark';

export interface UiState {
  theme: Theme;
  sidebarCollapsed: boolean;
}

export interface UiActions {
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;
}

export type UiSlice = UiState & UiActions;

// Helper function to get system theme preference
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  return window.matchMedia('(prefers-color-scheme: dark)').matches 
    ? 'dark' 
    : 'light';
};

// Helper function to get stored theme
const getStoredTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  
  const stored = localStorage.getItem('theme') as Theme;
  
  return stored || getSystemTheme();
};

// Helper function to apply theme to document
const applyTheme = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
  } else {
    root.classList.remove('dark');
  }
  
  // Store theme preference
  localStorage.setItem('theme', theme);
};

export const createUiSlice: StateCreator<UiSlice> = (set, get) => {
  // Initialize theme
  const initialTheme = getStoredTheme();
  applyTheme(initialTheme);

  return {
    // Initial state
    theme: initialTheme,
    sidebarCollapsed: false,

    // Actions
    toggleTheme: () => {
      const currentTheme = get().theme;
      const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
      
      set({ theme: newTheme });
      applyTheme(newTheme);
    },

    setTheme: (theme: Theme) => {
      set({ theme });
      applyTheme(theme);
    },

    toggleSidebar: () => {
      const currentCollapsed = get().sidebarCollapsed;
      
      set({ sidebarCollapsed: !currentCollapsed });
    },

    setSidebarCollapsed: (collapsed: boolean) => {
      set({ sidebarCollapsed: collapsed });
    },
  };
};
