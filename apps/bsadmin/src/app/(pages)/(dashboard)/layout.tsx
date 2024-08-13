import DrawerProvider from "../../DrawerProvider";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
