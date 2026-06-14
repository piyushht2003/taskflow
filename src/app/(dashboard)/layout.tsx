import { GlobalLayout } from "@/components/layout/global-layout"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <GlobalLayout>{children}</GlobalLayout>
}
