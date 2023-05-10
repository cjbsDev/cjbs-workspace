export default function RootLayout({children,}: {children: React.ReactNode;}) {
  return (
    <html lang="en">
    <title>bsadmin</title>
    <body>{children}</body>
    </html>
  );
}
