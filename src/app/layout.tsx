import type { Metadata } from "next";
import { LocaleProvider } from "@/contexts/LocaleContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kyiv Lyceum 'Ukrainian European School'",
  description: "Excellence in education, bridging cultures and knowledge.",
  keywords: ["school", "lyceum", "Kyiv", "education", "Ukrainian European School"],
  icons: {
    icon: '/Home.jpeg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="font-body bg-body text-body antialiased">
        <LocaleProvider>
          {children}
        </LocaleProvider>
      </body>
    </html>
  );
}
