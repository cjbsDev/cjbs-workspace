import Providers from 'client-provider';
import './globals.css';
import JeJuProvider from './jejuProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Ez-Cx</title>
      <link rel="icon" href="/favicon.ico" />
      <head />
      <body>
        <JeJuProvider>
          <Providers>{children}</Providers>
        </JeJuProvider>
      </body>
    </html>
  );
}
