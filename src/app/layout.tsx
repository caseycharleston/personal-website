import type { Metadata } from 'next';
import { Sono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const sono = Sono({
  variable: '--font-sono',
  subsets: ['latin'],
});

const themeInit = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark')document.documentElement.classList.add('dark');var a=localStorage.getItem('accent');if(a)document.documentElement.setAttribute('data-accent',a);}catch(e){}})();`;

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={`${sono.variable} antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
