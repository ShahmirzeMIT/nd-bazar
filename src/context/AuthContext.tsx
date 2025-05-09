
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { adminCredentials } from "../data/mockData";
import { useToast } from "@/components/ui/use-toast";

interface AdminUser {
  username: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: AdminUser | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is already logged in
    const savedUser = localStorage.getItem("admin_user");
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error("Failed to parse saved user:", error);
        localStorage.removeItem("admin_user");
      }
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    // In a real application, this would involve an API call
    if (username === adminCredentials.username && password === adminCredentials.password) {
      const adminUser = {
        username,
        isAdmin: true
      };
      setUser(adminUser);
      localStorage.setItem("admin_user", JSON.stringify(adminUser));
      toast({
        title: "Giriş uğurlu oldu",
        description: "Admin panelinə xoş gəlmisiniz!",
      });
      return true;
    }
    
    toast({
      variant: "destructive",
      title: "Giriş uğursuz oldu",
      description: "İstifadəçi adı və ya şifrə səhvdir.",
    });
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("admin_user");
    toast({
      title: "Çıxış edildi",
      description: "Admin paneldən çıxış etdiniz.",
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.isAdmin || false
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
