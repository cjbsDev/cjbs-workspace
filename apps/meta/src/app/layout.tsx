import './globals.css';
import Provider from 'client-provider';
import JeJuProvider from './jejuProvider';
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <title>Meta</title>
      <link rel="icon" href="/favicon.ico" />
      <head />
      <body>
        <JeJuProvider>
          <Provider>{children}</Provider>
        </JeJuProvider>
      </body>
    </html>
  );
}