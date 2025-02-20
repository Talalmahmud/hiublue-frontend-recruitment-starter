"use client";

import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { useAuth } from "./ContextProvider";

const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const { token } = useAuth();

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
  }, [token, router]);

  if (!token) {
    return <p>Loading...</p>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default ProtectedRoute;
