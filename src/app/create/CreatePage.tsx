"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import type { ResumeData } from "@/types/resume";
import { Session } from "next-auth";

type CreatePageProps = {
  session: Session | null;
};

export default function CreatePage({ session }: CreatePageProps) {
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

  return (
    <div className="min-h-screen bg-gray-50">
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
                  session={session}
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
      </div>
    </div>
  );
}
