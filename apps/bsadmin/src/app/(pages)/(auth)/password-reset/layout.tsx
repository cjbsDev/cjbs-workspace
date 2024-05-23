import BackgroundProvider from "../../../BackgroundProvider";

export default function PasswordResetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BackgroundProvider>{children}</BackgroundProvider>;
}
