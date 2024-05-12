export default function PopupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section style={{ padding: 20 }}>{children}</section>;
}
