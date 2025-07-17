"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, ArrowLeft } from "lucide-react";
import Link from "next/link";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import PaymentButton from "@/components/PaymentButton";
import type { ResumeData } from "@/types/resume";

export default function CreatePage() {
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      fullName: "",
      email: "",
      phone: "",
      location: "",
      website: "",
    },
    summary: "",
    workExperience: [],
    education: [],
    skills: [],
  });

  const [showUpgrade, setShowUpgrade] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <FileText className="h-6 w-6 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">
                  ResumeSnap
                </span>
              </div>
            </div>
            <PaymentButton onUpgrade={() => setShowUpgrade(false)} />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <span>Build Your Resume</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResumeForm
                  resumeData={resumeData}
                  setResumeData={setResumeData}
                  onUpgradeNeeded={() => setShowUpgrade(true)}
                />
              </CardContent>
            </Card>
          </div>

          {/* Preview Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResumePreview resumeData={resumeData} />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Upgrade Modal */}
        {showUpgrade && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Upgrade to Pro</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  You&apos;ve used your free downloads! Upgrade to Pro for
                  unlimited PDF downloads.
                </p>
                <div className="space-y-2">
                  <PaymentButton onUpgrade={() => setShowUpgrade(false)} />
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
                    onClick={() => setShowUpgrade(false)}
                  >
                    Maybe Later
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
