import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: Omit<User, 'id'> & { password: string }) => Promise<boolean>;
  updateProfile: (updates: Partial<Omit<User, 'id' | 'email' | 'role'>>) => Promise<boolean>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('hostel-dex-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    
    // Mock authentication - in real app, this would be an API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock users for demo
    const mockUsers: (User & { password: string })[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'student@hostel.com',
        role: 'student',
        roomNumber: '101',
        blockNumber: 'A',
        contactNumber: '+1234567890',
        password: 'password'
      },
      {
        id: '2',
        name: 'Admin User',
        email: 'admin@hostel.com',
        role: 'admin',
        password: 'admin123'
      }
    ];

    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('hostel-dex-user', JSON.stringify(userWithoutPassword));
      setLoading(false);
      return true;
    }
    
    setLoading(false);
    return false;
  };

  const register = async (userData: Omit<User, 'id'> & { password: string }): Promise<boolean> => {
    setLoading(true);
    
    // Mock registration
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      role: userData.role,
      roomNumber: userData.roomNumber,
      blockNumber: userData.blockNumber,
      contactNumber: userData.contactNumber,
    };
    
    setUser(newUser);
    localStorage.setItem('hostel-dex-user', JSON.stringify(newUser));
    setLoading(false);
    return true;
  };

  const updateProfile = async (updates: Partial<Omit<User, 'id' | 'email' | 'role'>>): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('hostel-dex-user', JSON.stringify(updatedUser));
      
      setLoading(false);
      return true;
    } catch (error) {
      setLoading(false);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hostel-dex-user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, loading }}>
      {children}
    </AuthContext.Provider>
  );
};