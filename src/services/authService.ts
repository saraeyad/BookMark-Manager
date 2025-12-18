import { LoginType, SignupType, AuthUserData } from "@/schemas";
import { storage } from "@/utils/storage";
import { apiRequest } from "@/utils/api";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

// Development mode - set to true to use mock authentication (no backend needed)
const DEV_MODE = true;

const STORAGE_KEYS = {
  USERS: "dev_users",
  TOKEN: "token",
  USER: "user",
} as const;

// Helper to generate a mock token
const generateMockToken = () => `mock-token-${Date.now()}-${Math.random().toString(36).substring(7)}`;

// Helper to get stored users from localStorage (for dev mode)
const getStoredUsers = (): Array<{ email: string; password: string; fullName: string }> => {
  return storage.getItem<Array<{ email: string; password: string; fullName: string }>>(
    STORAGE_KEYS.USERS,
    []
  ) || [];
};

// Helper to save users to localStorage (for dev mode)
const saveStoredUsers = (users: Array<{ email: string; password: string; fullName: string }>) => {
  storage.setItem(STORAGE_KEYS.USERS, users);
};

export const authService = {
  async login(data: LoginType): Promise<{ success: boolean; token?: string; user?: AuthUserData; message?: string }> {
    // Development mode - mock login
    if (DEV_MODE) {
      const users = getStoredUsers();
      const foundUser = users.find(u => u.email === data.email && u.password === data.password);
      
      if (foundUser) {
        return {
          success: true,
          token: generateMockToken(),
          user: {
            id: `user-${Date.now()}`,
            email: foundUser.email,
            name: foundUser.fullName,
          },
        };
      }
      return { success: false, message: "Invalid email or password" };
    }

    // Production mode - call API
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Login failed" }));
        throw new Error(error.message || "Login failed");
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        return { success: false, message: "API endpoint not available" };
      }
      throw error;
    }
  },

  async signup(data: SignupType): Promise<{ success: boolean; token?: string; user?: AuthUserData; message?: string }> {
    // Development mode - mock signup
    if (DEV_MODE) {
      const users = getStoredUsers();
      
      // Check if email already exists
      if (users.find(u => u.email === data.email)) {
        return { success: false, message: "Email already registered" };
      }
      
      // Add new user
      users.push({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
      });
      saveStoredUsers(users);
      
      // Return success with token and user data
      return {
        success: true,
        token: generateMockToken(),
        user: {
          id: `user-${Date.now()}`,
          email: data.email,
          name: data.fullName,
        },
      };
    }

    // Production mode - call API
    try {
      const response = await fetch(`${API_BASE_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: "Signup failed" }));
        throw new Error(error.message || "Signup failed");
      }
      return response.json();
    } catch (error) {
      if (error instanceof TypeError && error.message.includes("fetch")) {
        return { success: false, message: "API endpoint not available" };
      }
      throw error;
    }
  },

  async logout() {
    // In dev mode, just return success
    if (DEV_MODE) {
      return { success: true };
    }
    
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
    });
    if (!response.ok) {
      throw new Error("Logout failed");
    }
    return response.json();
  },

  async getSession() {
    // In dev mode, check localStorage
    if (DEV_MODE) {
      const token = storage.getItem<string>(STORAGE_KEYS.TOKEN);
      const user = storage.getItem<AuthUserData>(STORAGE_KEYS.USER);
      if (token && user) {
        return { token, user };
      }
      return null;
    }
    
    const result = await apiRequest<{ token: string; user: AuthUserData }>(
      "/auth/session"
    );
    return result.success && result.data ? result.data : null;
  },
};

