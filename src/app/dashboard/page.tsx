import type { Metadata } from "next";

import { DashboardOverview } from "@/components/dashboard/dashboard-overview";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Admin overview — products from seed data and orders from localStorage.",
};

export default function DashboardPage() {
  return <DashboardOverview />;
}
