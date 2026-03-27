import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { PageContainer } from "@/components/layout/PageContainer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <PageContainer className="py-10 sm:py-12 lg:py-14">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">
        <DashboardSidebar />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </PageContainer>
  );
}
