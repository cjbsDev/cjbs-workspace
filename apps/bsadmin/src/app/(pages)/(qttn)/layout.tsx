import DrawerProvider from "../../DrawerProvider";

export default function QttnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
