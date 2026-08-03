import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Little Weather Club | Weather English",
  description: "A playful English learning companion for the Usborne Beginners Weather book.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="zh-CN"><body>{children}</body></html>;
}
