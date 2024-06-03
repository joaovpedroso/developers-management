import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { ThemeProvider } from "@mui/material";
import { Layout } from "@/components/Layout";
import theme from "@/theme";

import "./globals.css";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Developers management",
  description: "This is an area for developer management",
  viewport: "initial-scale=1, width=device-width",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <AppRouterCacheProvider>
        <ThemeProvider theme={theme}>
          <Layout className={inter.className}>{children}</Layout>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </html>
  );
}
