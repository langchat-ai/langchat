'use client';
import { Inter } from "next/font/google";
import "./globals.css";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";
import { ThemeProvider } from "next-themes";
import Head from 'next/head';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <Head>
        <title>LangChat</title>
      </Head>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class">
          <Theme>{children}</Theme>
        </ThemeProvider>
      </body>
    </html>
  );
}
