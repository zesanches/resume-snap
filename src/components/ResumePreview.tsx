"use client";

import type { ResumeData } from "@/types/resume";
import { Mail, Phone, MapPin, Globe } from "lucide-react";

interface ResumePreviewProps {
  resumeData: ResumeData;
}

export default function ResumePreview({ resumeData }: ResumePreviewProps) {
  const { personalInfo, summary, workExperience, education, skills } =
    resumeData;

  return (
    <div className="bg-white border rounded-lg overflow-hidden">
      <div
        id="resume-preview"
        className="p-8 max-w-[8.5in] mx-auto bg-white text-black break-words overflow-wrap-anywhere"
        style={{ minHeight: "11in" }}
      >
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {personalInfo.fullName || "Your Name"}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            {personalInfo.email && (
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                <span className="break-words">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span className="break-words">{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <span className="break-all overflow-wrap-anywhere">
                  {personalInfo.website}
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Professional Summary */}
        {summary && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-3 border-b-2 border-gray-200 pb-1">
              Professional Summary
            </h2>
            <p className="text-gray-700 leading-relaxed break-words">
              {summary}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {workExperience.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
              Work Experience
            </h2>
            <div className="space-y-6">
              {workExperience.map((work) => (
                <div key={work.id}>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 break-words">
                        {work.jobTitle || "Job Title"}
                      </h3>
                      <p className="text-gray-700 font-medium break-words">
                        {work.company || "Company Name"}
                        {work.location && (
                          <>
                            {" • "}
                            <span className="break-words">{work.location}</span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-sm text-gray-600 text-right">
                      {work.startDate && (
                        <span>
                          {work.startDate}
                          {work.endDate && ` - ${work.endDate}`}
                        </span>
                      )}
                    </div>
                  </div>
                  {work.description && (
                    <div className="text-gray-700 text-sm leading-relaxed break-words">
                      {work.description.split("\n").map((line, index) => (
                        <p key={index} className="mb-1 break-words">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 break-words">
                        {edu.degree || "Degree"}
                      </h3>
                      <p className="text-gray-700 break-words">
                        {edu.school || "School Name"}
                        {edu.location && (
                          <>
                            {" • "}
                            <span className="break-words">{edu.location}</span>
                          </>
                        )}
                      </p>
                    </div>
                    {edu.graduationDate && (
                      <div className="text-sm text-gray-600">
                        {edu.graduationDate}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b-2 border-gray-200 pb-1">
              Skills
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm break-words"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Empty State */}
        {!personalInfo.fullName &&
          !summary &&
          workExperience.length === 0 &&
          education.length === 0 &&
          skills.length === 0 && (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg mb-2">
                Your resume preview will appear here
              </p>
              <p className="text-sm">
                Start filling out the form to see your resume come to life!
              </p>
            </div>
          )}
      </div>
    </div>
  );
}
