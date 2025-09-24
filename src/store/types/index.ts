// Re-export store slice types
export type { AuthSlice, AuthState, AuthActions } from '../slices/auth';
export type { UiSlice, UiState, UiActions, Theme } from '../slices/ui';

// Store utility types
export interface StoreSlice<T> {
  (...args: any[]): T;
}

// Store middleware types
export interface StoreMiddleware<T> {
  (config: any): T;
}

// Persist options
export interface PersistOptions<T> {
  name: string;
  storage?: {
    getItem: (name: string) => string | null | Promise<string | null>;
    setItem: (name: string, value: string) => void | Promise<void>;
    removeItem: (name: string) => void | Promise<void>;
  };
  partialize?: (state: T) => Partial<T>;
  version?: number;
  migrate?: (persistedState: any, version: number) => T;
  merge?: (persistedState: any, currentState: T) => T;
}
