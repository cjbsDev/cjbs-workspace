import DrawerProvider from "../../DrawerProvider";

export default function SetLayout({ children }: { children: React.ReactNode }) {
  return <DrawerProvider>{children}</DrawerProvider>;
}
