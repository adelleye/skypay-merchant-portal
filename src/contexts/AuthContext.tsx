
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

// User types for different roles
export type MerchantUser = {
  id: string;
  email: string;
  businessName: string;
  contactName: string;
  phoneNumber: string;
  address: string;
  approved: boolean;
  role: "merchant";
};

export type AdminUser = {
  id: string;
  email: string;
  name: string;
  role: "admin";
};

export type User = MerchantUser | AdminUser;

type AuthContextType = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: Omit<MerchantUser, "id" | "approved" | "role">) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@skypay.com",
    name: "Admin User",
    role: "admin"
  },
  {
    id: "2",
    email: "merchant@example.com",
    businessName: "Sample Business",
    contactName: "John Merchant",
    phoneNumber: "555-1234",
    address: "123 Business St, City",
    approved: true,
    role: "merchant"
  },
  {
    id: "3",
    email: "pending@example.com",
    businessName: "Pending Company",
    contactName: "Jane Pending",
    phoneNumber: "555-5678",
    address: "456 Waiting Ave, Town",
    approved: false,
    role: "merchant"
  }
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("skyPayUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.email === email);
        
        if (foundUser && password === "password") {
          setUser(foundUser);
          localStorage.setItem("skyPayUser", JSON.stringify(foundUser));
          resolve();
        } else {
          reject(new Error("Invalid email or password"));
        }
      }, 800);
    });
  };

  const register = async (userData: Omit<MerchantUser, "id" | "approved" | "role">) => {
    // Simulate API call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find(u => u.email === userData.email);
        
        if (existingUser) {
          reject(new Error("Email already in use"));
        } else {
          const newUser: MerchantUser = {
            ...userData,
            id: `m-${Date.now()}`,
            approved: false,
            role: "merchant"
          };
          
          // In a real app, we would send this to the server
          // Here we just simulate successful registration
          resolve();
        }
      }, 800);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("skyPayUser");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
