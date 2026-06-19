import type { Metadata } from 'next';
import { Sono } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';

const sono = Sono({
  variable: '--font-sono',
  subsets: ['latin'],
});

const themeInit = `(function(){var d=document.documentElement;try{var t=localStorage.getItem('theme');if(t!=='light')d.classList.add('dark');var a=localStorage.getItem('accent');d.setAttribute('data-accent',a||'amber');}catch(e){d.classList.add('dark');d.setAttribute('data-accent','amber');}})();`;

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
