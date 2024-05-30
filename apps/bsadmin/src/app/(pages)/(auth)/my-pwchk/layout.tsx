import DrawerProvider from "../../../DrawerProvider";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
