import BackgroundProvider from "../../../BackgroundProvider";

export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <BackgroundProvider>{children}</BackgroundProvider>;
}
