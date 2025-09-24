// IndexedDB utility for storing user data and authentication
export interface UserData {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthData {
  email: string;
  passwordHash: string;
  rememberMe: boolean;
  lastLogin: Date;
}

class IndexedDBManager {
  private dbName = 'CarsAppDB';
  private dbVersion = 1;
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.dbVersion);

      request.onerror = () => {
        reject(new Error('Failed to open IndexedDB'));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create users store
        if (!db.objectStoreNames.contains('users')) {
          const usersStore = db.createObjectStore('users', { keyPath: 'id' });
          usersStore.createIndex('email', 'email', { unique: true });
        }

        // Create auth store
        if (!db.objectStoreNames.contains('auth')) {
          const authStore = db.createObjectStore('auth', { keyPath: 'email' });
        }

        // Create cars store (for future use)
        if (!db.objectStoreNames.contains('cars')) {
          const carsStore = db.createObjectStore('cars', { keyPath: 'id' });
          carsStore.createIndex('ownerId', 'ownerId', { unique: false });
        }
      };
    });
  }

  private async ensureDB(): Promise<IDBDatabase> {
    if (!this.db) {
      await this.init();
    }
    return this.db!;
  }

  // User management
  async createUser(userData: Omit<UserData, 'id' | 'createdAt' | 'updatedAt'>): Promise<UserData> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    const user: UserData = {
      ...userData,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    return new Promise((resolve, reject) => {
      const request = store.add(user);

      request.onsuccess = () => {
        resolve(user);
      };

      request.onerror = () => {
        reject(new Error('Failed to create user'));
      };
    });
  }

  async getUserByEmail(email: string): Promise<UserData | null> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['users'], 'readonly');
    const store = transaction.objectStore('users');
    const index = store.index('email');

    return new Promise((resolve, reject) => {
      const request = index.get(email);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error('Failed to get user'));
      };
    });
  }

  async updateUser(userId: string, updates: Partial<UserData>): Promise<UserData> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['users'], 'readwrite');
    const store = transaction.objectStore('users');

    return new Promise((resolve, reject) => {
      const getRequest = store.get(userId);

      getRequest.onsuccess = () => {
        const user = getRequest.result;
        if (!user) {
          reject(new Error('User not found'));
          return;
        }

        const updatedUser: UserData = {
          ...user,
          ...updates,
          updatedAt: new Date(),
        };

        const updateRequest = store.put(updatedUser);

        updateRequest.onsuccess = () => {
          resolve(updatedUser);
        };

        updateRequest.onerror = () => {
          reject(new Error('Failed to update user'));
        };
      };

      getRequest.onerror = () => {
        reject(new Error('Failed to get user for update'));
      };
    });
  }

  // Authentication management
  async saveAuthData(authData: AuthData): Promise<void> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['auth'], 'readwrite');
    const store = transaction.objectStore('auth');

    return new Promise((resolve, reject) => {
      const request = store.put(authData);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error('Failed to save auth data'));
      };
    });
  }

  async getAuthData(email: string): Promise<AuthData | null> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['auth'], 'readonly');
    const store = transaction.objectStore('auth');

    return new Promise((resolve, reject) => {
      const request = store.get(email);

      request.onsuccess = () => {
        resolve(request.result || null);
      };

      request.onerror = () => {
        reject(new Error('Failed to get auth data'));
      };
    });
  }

  async deleteAuthData(email: string): Promise<void> {
    const db = await this.ensureDB();
    const transaction = db.transaction(['auth'], 'readwrite');
    const store = transaction.objectStore('auth');

    return new Promise((resolve, reject) => {
      const request = store.delete(email);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error('Failed to delete auth data'));
      };
    });
  }

  // Utility methods
  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  // Simple password hashing (in production, use proper hashing)
  async hashPassword(password: string): Promise<string> {
    const encoder = new TextEncoder();
    const data = encoder.encode(password + 'cars_app_salt');
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  }

  async verifyPassword(password: string, hash: string): Promise<boolean> {
    const passwordHash = await this.hashPassword(password);
    return passwordHash === hash;
  }
}

// Export singleton instance
export const indexedDB = new IndexedDBManager();

// Initialize on import
indexedDB.init().catch(console.error);
