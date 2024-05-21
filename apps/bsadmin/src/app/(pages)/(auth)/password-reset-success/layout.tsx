import BackgroundProvider from "../../../BackgroundProvider";

export default function PasswordResetSuccessLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BackgroundProvider>{children}</BackgroundProvider>;
}
