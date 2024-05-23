import DrawerProvider from "../../DrawerProvider";

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
