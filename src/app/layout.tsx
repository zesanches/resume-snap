import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "ResumeSnap - Create Professional Resumes Online | Free Resume Builder",
  description:
    "Build stunning, professional resumes in minutes with ResumeSnap. Fast signup. Download as PDF instantly. ATS-friendly templates. Start free today!",
  keywords:
    "resume builder, CV maker, professional resume, job application, PDF resume, free resume, online resume builder",
  authors: [{ name: "ResumeSnap" }],
  creator: "ResumeSnap",
  publisher: "ResumeSnap",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resume-snap-app.vercel.app",
    title: "ResumeSnap - Create Professional Resumes Online",
    description:
      "Build stunning, professional resumes in minutes. Fast signup. Download as PDF instantly.",
    siteName: "ResumeSnap",
    images: [
      {
        url: "https://resume-snap-app.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "ResumeSnap - Create Professional Resumes Online",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2563eb" />
      </head>
      <body className={inter.className}>
        <SessionProvider>
          {children}
          <Toaster />
        </SessionProvider>
      </body>
    </html>
  );
}
