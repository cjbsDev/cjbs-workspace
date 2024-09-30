import DrawerProvider from "../../DrawerProvider";
// import "../../tailwind.scss"

export default function OrderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
