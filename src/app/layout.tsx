import type { Metadata } from 'next';
import { Sono } from 'next/font/google';
import './globals.css';

const sono = Sono({
  variable: '--font-sono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: "Casey's Personal Website",
  description: 'Everything about Casey!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${sono.variable} antialiased`}>{children}</body>
    </html>
  );
}
