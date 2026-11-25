import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { absoluteSiteUrl, siteUrl } from "@/lib/site";
import { Analytics } from "@vercel/analytics/next";

const inter = localFont({
  src: "../public/fonts/inter-latin-wght-normal.woff2",
  variable: "--font-inter",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Resumio | Free Resume Builder and PDF Export",
    template: "%s | Resumio",
  },
  description:
    "Build a clear resume with a live preview, organize your experience, and download a searchable A4 PDF. Free to use, no account required.",
  applicationName: "Resumio",
  category: "productivity",
  alternates: siteUrl ? { canonical: absoluteSiteUrl("/") } : undefined,
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Resumio",
    title: "Resumio | Free Resume Builder and PDF Export",
    description:
      "Build a clear resume with a live preview, organize your experience, and download a searchable A4 PDF.",
    url: absoluteSiteUrl("/"),
  },
  twitter: {
    card: "summary_large_image",
    title: "Resumio | Free Resume Builder",
    description:
      "Create a clear resume with a live preview and download a searchable A4 PDF. Free to use, no account required.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          {children}
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
