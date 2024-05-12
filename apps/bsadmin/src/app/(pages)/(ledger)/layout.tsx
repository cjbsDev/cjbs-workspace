import DrawerProvider from "../../DrawerProvider";

export default function LedgerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
