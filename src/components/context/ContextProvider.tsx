"use client";
import { useRouter } from "next/navigation";
import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
  useMemo,
  useEffect,
} from "react";

type Children = {
  children: ReactNode;
};

interface AuthContextType {
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: Children) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null); // Use null to track initialization state

  useEffect(() => {
    // Ensure this runs only on the client side
    if (typeof window !== "undefined") {
      try {
        const storedToken = localStorage.getItem("token");
        const parsedToken = storedToken ? JSON.parse(storedToken) : "";
        setToken(parsedToken);
      } catch (error) {
        console.error("Error parsing token from localStorage:", error);
        setToken(""); // Set as empty if parsing fails
      }
    }
  }, []);

  useEffect(() => {
    if (token === null) return; // Prevent redirect before token is initialized

    if (token) {
      router.push("/");
    } else {
      router.push("/login");
    }
  }, [token, router]);

  const value = useMemo(() => ({ token: token || "", setToken }), [token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;

// Custom hook to use AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
