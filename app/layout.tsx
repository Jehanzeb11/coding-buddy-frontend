import type { Metadata, Viewport } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Providers from "@/components/Providers";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeBuddy | Your AI Coding Partner",
    template: "%s | CodeBuddy",
  },
  description: "Get intelligent code suggestions, instant bug fixes, and expert technical assistance. Level up your development with AI-powered guidance.",
  keywords: ["AI Coding", "Developer Tools", "Programming Assistant", "CodeBuddy"],
  authors: [{ name: "CodeBuddy Team" }],
  creator: "CodeBuddy",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://codebuddy.ai",
    title: "CodeBuddy | Your AI Coding Partner",
    description: "Intelligent code suggestions and expert technical assistance.",
    siteName: "CodeBuddy",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeBuddy | Your AI Coding Partner",
    description: "Intelligent code suggestions and expert technical assistance.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "#071024" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} ${robotoMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}

