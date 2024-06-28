import DrawerProvider from "../../DrawerProvider";

export default function CustLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
