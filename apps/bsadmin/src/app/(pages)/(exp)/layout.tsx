import DrawerProvider from "../../DrawerProvider";

export default function ExpLayout({ children }: { children: React.ReactNode }) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
