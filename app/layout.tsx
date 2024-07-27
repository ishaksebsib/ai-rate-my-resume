import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PHProvider } from "./postHogProvider";
import PostHogPageView from "./PostHogPageView";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Rate My Resume",
  description: "AI powered resume review",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <PHProvider>
        <body className={inter.className}>
          <PostHogPageView />
          {children}
        </body>
      </PHProvider>
    </html>
  );
}
