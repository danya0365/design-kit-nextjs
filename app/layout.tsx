import { LayoutProvider } from "@/src/presentation/components/providers/LayoutProvider";
import { ThemeProvider } from "@/src/presentation/components/providers/ThemeProvider";
import { SearchModal } from "@/src/presentation/components/ui/SearchModal";
import { ToastContainer } from "@/src/presentation/components/ui/ToastContainer";
import type { Metadata } from "next";
import "../public/styles/index.css";

export const metadata: Metadata = {
  title: "Design Kit - Component Marketplace",
  description: "Discover and export beautiful UI components for HTML, React, and Next.js. Design once, export anywhere.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <ThemeProvider>
          <LayoutProvider>
            {children}
            <ToastContainer />
            <SearchModal />
          </LayoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
