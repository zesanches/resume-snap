import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "ResumeSnap - Create Professional Resumes Online | Free Resume Builder",
  description:
    "Build stunning, professional resumes in minutes with ResumeSnap. No signup required. Download as PDF instantly. ATS-friendly templates. Start free today!",
  keywords:
    "resume builder, CV maker, professional resume, job application, PDF resume, free resume, online resume builder",
  authors: [{ name: "ResumeSnap" }],
  creator: "ResumeSnap",
  publisher: "ResumeSnap",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://resumesnap.com",
    title: "ResumeSnap - Create Professional Resumes Online",
    description:
      "Build stunning, professional resumes in minutes. No signup required. Download as PDF instantly.",
    siteName: "ResumeSnap",
  },
  twitter: {
    card: "summary_large_image",
    title: "ResumeSnap - Create Professional Resumes Online",
    description:
      "Build stunning, professional resumes in minutes. No signup required. Download as PDF instantly.",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
