// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API request configuration
export interface ApiRequestConfig {
  method?: HttpMethod;
  headers?: Record<string, string>;
  params?: Record<string, any>;
  data?: any;
  timeout?: number;
  withCredentials?: boolean;
}

// API response types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
}

export interface ApiError {
  message: string;
  status?: number;
  code?: string;
  details?: any;
  timestamp?: string;
}

// Pagination types for API
export interface PaginationQuery {
  page?: number;
  limit?: number;
  offset?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedApiResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

// Search and filter types
export interface SearchQuery {
  q?: string;
  filters?: Record<string, any>;
}

// API endpoints configuration
export interface ApiEndpoints {
  // Auth endpoints
  auth: {
    login: string;
    register: string;
    refresh: string;
    logout: string;
    profile: string;
    forgotPassword: string;
    resetPassword: string;
  };
  
  // Cars endpoints
  cars: {
    list: string;
    create: string;
    getById: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
    search: string;
    featured: string;
  };
  
  // Users endpoints
  users: {
    list: string;
    create: string;
    getById: (id: string) => string;
    update: (id: string) => string;
    delete: (id: string) => string;
    updateProfile: string;
    changePassword: string;
  };
}

// Request/Response types for specific endpoints
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface LoginResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
  };
  tokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export interface RegisterResponse {
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
  message: string;
}

// API client interface
export interface ApiClient {
  get<T = any>(url: string, config?: ApiRequestConfig): Promise<T>;
  post<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
  put<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
  patch<T = any>(url: string, data?: any, config?: ApiRequestConfig): Promise<T>;
  delete<T = any>(url: string, config?: ApiRequestConfig): Promise<T>;
  
  // Interceptors
  setAuthToken(token: string): void;
  clearAuthToken(): void;
  
  // Request/Response interceptors
  onRequest(callback: (config: ApiRequestConfig) => ApiRequestConfig): void;
  onResponse<T>(callback: (response: ApiResponse<T>) => ApiResponse<T>): void;
  onError(callback: (error: ApiError) => Promise<never>): void;
}

// Upload types
export interface FileUploadConfig {
  maxSize?: number; // in bytes
  allowedTypes?: string[];
  multiple?: boolean;
}

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  type: string;
}
