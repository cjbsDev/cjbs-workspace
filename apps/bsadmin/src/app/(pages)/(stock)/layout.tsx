import DrawerProvider from "../../DrawerProvider";

export default function StockLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
