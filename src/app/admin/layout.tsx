import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Panel - UES Lyceum",
    description: "Content management admin panel for Kyiv Lyceum Ukrainian European School",
    robots: "noindex, nofollow",
};

export default function AdminLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return <>{children}</>;
}
