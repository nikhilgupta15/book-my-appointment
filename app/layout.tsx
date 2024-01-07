import "./globals.css";
import { inter } from "../components/ui/common/fonts";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: {
    template: "%s | Book My Appointment",
    default: "Book My Appointment",
  },
  description:
    "Your one-stop shop for managing patients, doctors and healthcare easily and efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <main>{children}</main>
        <Toaster />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
