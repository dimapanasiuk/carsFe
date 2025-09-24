// Utility types for common operations

// Make certain properties optional
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// Make certain properties required
export type RequiredBy<T, K extends keyof T> = T & Required<Pick<T, K>>;

// Nullable and Maybe types
export type Nullable<T> = T | null;
export type Maybe<T> = T | null | undefined;

// Deep partial type
export type DeepPartial<T> = {
  [P in keyof T]?: T[P] extends object ? DeepPartial<T[P]> : T[P];
};

// Deep required type
export type DeepRequired<T> = {
  [P in keyof T]-?: T[P] extends object ? DeepRequired<T[P]> : T[P];
};

// Pick by type
export type PickByType<T, U> = {
  [K in keyof T as T[K] extends U ? K : never]: T[K];
};

// Omit by type
export type OmitByType<T, U> = {
  [K in keyof T as T[K] extends U ? never : K]: T[K];
};

// Function types
export type VoidFunction = () => void;
export type AsyncVoidFunction = () => Promise<void>;
export type EventHandler<T = any> = (event: T) => void;
export type AsyncEventHandler<T = any> = (event: T) => Promise<void>;

// Callback types
export type Callback<T = void> = (value: T) => void;
export type AsyncCallback<T = void> = (value: T) => Promise<void>;

// Error handler types
export type ErrorHandler = (error: Error) => void;
export type AsyncErrorHandler = (error: Error) => Promise<void>;

// Validation types
export type ValidationRule<T = any> = (value: T) => string | undefined;
export type ValidationRules<T = any> = ValidationRule<T>[];

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

// Storage types
export interface StorageAdapter {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
  removeItem(key: string): void;
  clear(): void;
}

// Debounce/Throttle types
export type DebouncedFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel(): void;
  flush(): ReturnType<T> | undefined;
};

export type ThrottledFunction<T extends (...args: any[]) => any> = {
  (...args: Parameters<T>): void;
  cancel(): void;
};

// Logger types
export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  data?: any;
}

export interface Logger {
  debug(message: string, data?: any): void;
  info(message: string, data?: any): void;
  warn(message: string, data?: any): void;
  error(message: string, error?: Error): void;
}

// Environment types
export type Environment = 'development' | 'staging' | 'production';

export interface EnvironmentConfig {
  apiBaseUrl: string;
  apiTimeout: number;
  enableLogging: boolean;
  enableAnalytics: boolean;
  enableMocking: boolean;
}

// Feature flag types
export type FeatureFlag = string;
export type FeatureFlags = Record<FeatureFlag, boolean>;

// Formatter types
export type DateFormat = 'short' | 'medium' | 'long' | 'full' | string;
export type NumberFormat = 'decimal' | 'currency' | 'percent' | string;

export interface FormatOptions {
  locale?: string;
  timezone?: string;
  currency?: string;
}

// Search/Filter utility types
export interface SearchOptions {
  caseSensitive?: boolean;
  matchWholeWord?: boolean;
  useRegex?: boolean;
}

export interface SortOptions<T = any> {
  field: keyof T;
  direction: 'asc' | 'desc';
}

// Generic state types
export interface LoadingState {
  loading: boolean;
  error: string | null;
}

export interface AsyncState<T> extends LoadingState {
  data: T | null;
}

export interface PaginationState {
  page: number;
  pageSize: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Generic CRUD operations
export interface CrudOperations<T, CreateDto = Partial<T>, UpdateDto = Partial<T>> {
  create: (data: CreateDto) => Promise<T>;
  read: (id: string) => Promise<T>;
  update: (id: string, data: UpdateDto) => Promise<T>;
  delete: (id: string) => Promise<void>;
  list: (params?: any) => Promise<T[]>;
}

// Event emitter types
export type EventListener<T = any> = (data: T) => void;

export interface EventEmitter {
  on<T = any>(event: string, listener: EventListener<T>): void;
  off<T = any>(event: string, listener: EventListener<T>): void;
  emit<T = any>(event: string, data?: T): void;
  once<T = any>(event: string, listener: EventListener<T>): void;
}
