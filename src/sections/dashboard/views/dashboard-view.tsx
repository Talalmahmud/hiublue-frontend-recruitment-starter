"use client";

import { useAuth } from "@/components/context/ContextProvider";

export default function DashboardView() {
  const auth = useAuth();
  console.log(auth);
  return <>Dashboard View</>;
}
