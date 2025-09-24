// Car entity types
export interface Car {
  id: string;
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  color?: string;
  fuelType?: 'gasoline' | 'diesel' | 'electric' | 'hybrid';
  transmission?: 'manual' | 'automatic';
  bodyType?: 'sedan' | 'suv' | 'hatchback' | 'coupe' | 'wagon' | 'convertible';
  engineSize?: number;
  power?: number;
  description?: string;
  imageUrl?: string;
  images?: string[];
  features?: string[];
  location?: string;
  ownerId?: string;
  status: 'available' | 'sold' | 'reserved' | 'draft';
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateCarDto {
  name: string;
  brand: string;
  model: string;
  year: number;
  price: number;
  mileage?: number;
  color?: string;
  fuelType?: Car['fuelType'];
  transmission?: Car['transmission'];
  bodyType?: Car['bodyType'];
  engineSize?: number;
  power?: number;
  description?: string;
  imageUrl?: string;
  images?: string[];
  features?: string[];
  location?: string;
}

export interface UpdateCarDto extends Partial<CreateCarDto> {
  status?: Car['status'];
}

export interface CarFilters {
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  minYear?: number;
  maxYear?: number;
  fuelType?: Car['fuelType'];
  transmission?: Car['transmission'];
  bodyType?: Car['bodyType'];
  location?: string;
  status?: Car['status'];
}

// User entity types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  location?: string;
  role: 'user' | 'admin' | 'moderator';
  isEmailVerified: boolean;
  isActive: boolean;
  preferences?: UserPreferences;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  privacy: {
    showEmail: boolean;
    showPhone: boolean;
    showLocation: boolean;
  };
}

export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: string;
  location?: string;
  preferences?: Partial<UserPreferences>;
}

// Authentication types
export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData extends CreateUserDto {
  confirmPassword: string;
  acceptTerms: boolean;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthUser extends Omit<User, 'createdAt' | 'updatedAt'> {
  createdAt: string;
  updatedAt: string;
}
