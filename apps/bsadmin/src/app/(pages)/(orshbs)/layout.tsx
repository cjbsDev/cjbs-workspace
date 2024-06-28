import DrawerProvider from "../../DrawerProvider";

export default function OrshbsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
