import DashboardView from "@/sections/dashboard/views/dashboard-view";
import { redirect } from "next/navigation";

export const metadata = {
  title: "Home",
};

export default function Page() {
  redirect("/login");
  return <>Home</>;
}
