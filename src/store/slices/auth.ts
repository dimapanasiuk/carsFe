import { StateCreator } from 'zustand';
import type { AuthUser, LoginCredentials, RegisterData } from '@/types';
import { indexedDB, type UserData, type AuthData } from '@/utils/storage';

export interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
  authError: string | null;
}

export interface AuthActions {
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  register: (data: RegisterData) => Promise<void>;
  setUser: (user: AuthUser | null) => void;
  clearAuthError: () => void;
  initAuth: () => Promise<void>;
}

export type AuthSlice = AuthState & AuthActions;

export const createAuthSlice: StateCreator<AuthSlice> = (set, get) => ({
  // Initial state
  user: null,
  isAuthenticated: false,
  authLoading: false,
  authError: null,

  // Actions
  login: async (credentials: LoginCredentials) => {
    try {
      set({ authLoading: true, authError: null });

      // Get auth data from IndexedDB
      const authData = await indexedDB.getAuthData(credentials.email);
      
      if (!authData) {
        throw new Error('User not found. Please register first.');
      }

      // Verify password
      const isValidPassword = await indexedDB.verifyPassword(credentials.password, authData.passwordHash);
      
      if (!isValidPassword) {
        throw new Error('Invalid password');
      }

      // Get user data
      const userData = await indexedDB.getUserByEmail(credentials.email);
      
      if (!userData) {
        throw new Error('User data not found');
      }

      // Update last login
      const updatedAuthData: AuthData = {
        ...authData,
        lastLogin: new Date(),
        rememberMe: credentials.rememberMe || false,
      };
      
      await indexedDB.saveAuthData(updatedAuthData);

      // Convert UserData to AuthUser
      const user: AuthUser = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        avatar: userData.avatar,
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        createdAt: userData.createdAt.toISOString(),
        updatedAt: userData.updatedAt.toISOString(),
      };

      set({
        user,
        isAuthenticated: true,
        authLoading: false,
        authError: null,
      });

      // Store in localStorage if remember me is checked
      if (credentials.rememberMe) {
        localStorage.setItem('auth_user_email', credentials.email);
      }
      
    } catch (error) {
      set({
        authLoading: false,
        authError: error instanceof Error ? error.message : 'Login failed',
      });
    }
  },

  logout: () => {
    set({
      user: null,
      isAuthenticated: false,
      authLoading: false,
      authError: null,
    });

    // Remove stored email from localStorage
    localStorage.removeItem('auth_user_email');
  },

  register: async (data: RegisterData) => {
    try {
      set({ authLoading: true, authError: null });

      // Validate passwords match
      if (data.password !== data.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      // Check if user already exists
      const existingUser = await indexedDB.getUserByEmail(data.email);
      if (existingUser) {
        throw new Error('User with this email already exists');
      }

      // Create user data
      const userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'> = {
        email: data.email,
        firstName: data.firstName,
        lastName: data.lastName,
        phone: data.phone,
      };

      // Create user in IndexedDB
      const newUser = await indexedDB.createUser(userData);

      // Hash password and save auth data
      const passwordHash = await indexedDB.hashPassword(data.password);
      const authData: AuthData = {
        email: data.email,
        passwordHash,
        rememberMe: false,
        lastLogin: new Date(),
      };

      await indexedDB.saveAuthData(authData);

      set({
        authLoading: false,
        authError: null,
      });

      // Auto-login after registration
      await get().login({
        email: data.email,
        password: data.password,
        rememberMe: false,
      });
      
    } catch (error) {
      set({
        authLoading: false,
        authError: error instanceof Error ? error.message : 'Registration failed',
      });
    }
  },

  setUser: (user: AuthUser | null) => {
    set({
      user,
      isAuthenticated: !!user,
    });
  },

  clearAuthError: () => {
    set({ authError: null });
  },

  initAuth: async () => {
    try {
      const storedEmail = localStorage.getItem('auth_user_email');
      
      if (!storedEmail) {
        return;
      }

      // Check if auth data exists and user wanted to be remembered
      const authData = await indexedDB.getAuthData(storedEmail);
      
      if (!authData || !authData.rememberMe) {
        localStorage.removeItem('auth_user_email');
        return;
      }

      // Get user data
      const userData = await indexedDB.getUserByEmail(storedEmail);
      
      if (!userData) {
        localStorage.removeItem('auth_user_email');
        return;
      }

      // Convert UserData to AuthUser
      const user: AuthUser = {
        id: userData.id,
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        avatar: userData.avatar,
        role: 'user',
        isEmailVerified: true,
        isActive: true,
        createdAt: userData.createdAt.toISOString(),
        updatedAt: userData.updatedAt.toISOString(),
      };

      set({
        user,
        isAuthenticated: true,
        authError: null,
      });
      
    } catch (error) {
      console.error('Failed to initialize auth:', error);
      localStorage.removeItem('auth_user_email');
    }
  },
});
