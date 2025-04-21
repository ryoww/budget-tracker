"use client";

import { Provider } from "@/components/ui/provider";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="jp" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    );
}
