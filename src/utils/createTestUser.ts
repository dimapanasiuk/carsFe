// Utility to create a test user for demonstration
import { indexedDB } from './storage';

export const createTestUser = async () => {
  try {
    // Check if test user already exists
    const existingUser = await indexedDB.getUserByEmail('test@example.com');
    
    if (existingUser) {
      console.log('Test user already exists');
      return;
    }

    // Create test user
    const testUser = await indexedDB.createUser({
      email: 'test@example.com',
      firstName: 'Test',
      lastName: 'User',
      phone: '+1 (555) 123-4567',
    });

    // Create auth data for test user
    const passwordHash = await indexedDB.hashPassword('password123');
    await indexedDB.saveAuthData({
      email: 'test@example.com',
      passwordHash,
      rememberMe: false,
      lastLogin: new Date(),
    });

    console.log('Test user created successfully!');
    console.log('Email: test@example.com');
    console.log('Password: password123');
    
    return testUser;
  } catch (error) {
    console.error('Failed to create test user:', error);
  }
};

// Auto-create test user in development
if (import.meta.env.DEV) {
  // Wait a bit for IndexedDB to initialize
  setTimeout(() => {
    createTestUser();
  }, 1000);
}
