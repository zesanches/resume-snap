"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, Download } from "lucide-react";
import type { ResumeData, WorkExperience, Education } from "@/types/resume";

interface ResumeFormProps {
  resumeData: ResumeData;
  setResumeData: (data: ResumeData) => void;
  onUpgradeNeeded: () => void;
}

export default function ResumeForm({
  resumeData,
  setResumeData,
  onUpgradeNeeded,
}: ResumeFormProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [skillInput, setSkillInput] = useState("");

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData({
      ...resumeData,
      personalInfo: {
        ...resumeData.personalInfo,
        [field]: value,
      },
    });
  };

  const addWorkExperience = () => {
    const newWork: WorkExperience = {
      id: Date.now().toString(),
      jobTitle: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setResumeData({
      ...resumeData,
      workExperience: [...resumeData.workExperience, newWork],
    });
  };

  const updateWorkExperience = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.map((work) =>
        work.id === id ? { ...work, [field]: value } : work
      ),
    });
  };

  const removeWorkExperience = (id: string) => {
    setResumeData({
      ...resumeData,
      workExperience: resumeData.workExperience.filter(
        (work) => work.id !== id
      ),
    });
  };

  const addEducation = () => {
    const newEducation: Education = {
      id: Date.now().toString(),
      degree: "",
      school: "",
      location: "",
      graduationDate: "",
    };
    setResumeData({
      ...resumeData,
      education: [...resumeData.education, newEducation],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu
      ),
    });
  };

  const removeEducation = (id: string) => {
    setResumeData({
      ...resumeData,
      education: resumeData.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && skillInput.trim()) {
      e.preventDefault();
      const newSkill = skillInput.trim();
      if (!resumeData.skills.includes(newSkill)) {
        setResumeData({
          ...resumeData,
          skills: [...resumeData.skills, newSkill],
        });
      }
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setResumeData({
      ...resumeData,
      skills: resumeData.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const generatePDF = async () => {
    // Check download limit
    const downloads = Number.parseInt(
      localStorage.getItem("resumeDownloads") || "0"
    );
    const isPro = localStorage.getItem("resumeProUser") === "true";

    if (!isPro && downloads >= 2) {
      onUpgradeNeeded();
      return;
    }

    setIsGenerating(true);

    try {
      // Dynamic import for SSR safety
      const html2canvas = (await import("html2canvas-pro")).default;
      const { jsPDF } = await import("jspdf");

      const element = document.getElementById("resume-preview");
      if (!element) {
        throw new Error("Resume preview not found");
      }

      // Usa html2canvas-pro com CORS e scale alto para Tailwind
      const canvas = await html2canvas(element, {
        scale: 1,
        useCORS: true,
        allowTaint: true,
        logging: true,
      });

      const imgData = canvas.toDataURL("image/png");

      // Cria PDF usando jspdf
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${resumeData.personalInfo.fullName || "resume"}.pdf`);

      // Atualiza contagem se não for Pro
      if (!isPro) {
        localStorage.setItem("resumeDownloads", (downloads + 1).toString());
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const downloads = Number.parseInt(
    localStorage.getItem("resumeDownloads") || "0"
  );
  const isPro = localStorage.getItem("resumeProUser") === "true";
  const remainingDownloads = isPro ? "∞" : Math.max(0, 2 - downloads);

  return (
    <div className="space-y-6">
      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="fullName">Full Name *</Label>
              <Input
                id="fullName"
                value={resumeData.personalInfo.fullName}
                onChange={(e) => updatePersonalInfo("fullName", e.target.value)}
                placeholder="John Doe"
              />
            </div>
            <div>
              <Label htmlFor="email">Email *</Label>
              <Input
                id="email"
                type="email"
                value={resumeData.personalInfo.email}
                onChange={(e) => updatePersonalInfo("email", e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={resumeData.personalInfo.phone}
                onChange={(e) => updatePersonalInfo("phone", e.target.value)}
                placeholder="(555) 123-4567"
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={resumeData.personalInfo.location}
                onChange={(e) => updatePersonalInfo("location", e.target.value)}
                placeholder="New York, NY"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="website">Website/LinkedIn</Label>
            <Input
              id="website"
              value={resumeData.personalInfo.website}
              onChange={(e) => updatePersonalInfo("website", e.target.value)}
              placeholder="https://linkedin.com/in/johndoe"
            />
          </div>
        </CardContent>
      </Card>

      {/* Professional Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Professional Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={resumeData.summary}
            onChange={(e) =>
              setResumeData({ ...resumeData, summary: e.target.value })
            }
            placeholder="Write a brief summary of your professional background and key achievements..."
            rows={4}
          />
        </CardContent>
      </Card>

      {/* Work Experience */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Work Experience
            <Button onClick={addWorkExperience} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Job
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.workExperience.map((work) => (
            <Card key={work.id} className="border-l-4 border-l-blue-500">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">
                    Job #{resumeData.workExperience.indexOf(work) + 1}
                  </h4>
                  <Button
                    onClick={() => removeWorkExperience(work.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label>Job Title *</Label>
                    <Input
                      value={work.jobTitle}
                      onChange={(e) =>
                        updateWorkExperience(
                          work.id,
                          "jobTitle",
                          e.target.value
                        )
                      }
                      placeholder="Software Engineer"
                    />
                  </div>
                  <div>
                    <Label>Company *</Label>
                    <Input
                      value={work.company}
                      onChange={(e) =>
                        updateWorkExperience(work.id, "company", e.target.value)
                      }
                      placeholder="Tech Corp"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={work.location}
                      onChange={(e) =>
                        updateWorkExperience(
                          work.id,
                          "location",
                          e.target.value
                        )
                      }
                      placeholder="San Francisco, CA"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Label>Start Date</Label>
                      <Input
                        value={work.startDate}
                        onChange={(e) =>
                          updateWorkExperience(
                            work.id,
                            "startDate",
                            e.target.value
                          )
                        }
                        placeholder="Jan 2020"
                      />
                    </div>
                    <div>
                      <Label>End Date</Label>
                      <Input
                        value={work.endDate}
                        onChange={(e) =>
                          updateWorkExperience(
                            work.id,
                            "endDate",
                            e.target.value
                          )
                        }
                        placeholder="Present"
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <Label>Job Description</Label>
                  <Textarea
                    value={work.description}
                    onChange={(e) =>
                      updateWorkExperience(
                        work.id,
                        "description",
                        e.target.value
                      )
                    }
                    placeholder="• Developed web applications using React and Node.js&#10;• Collaborated with cross-functional teams&#10;• Improved system performance by 30%"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          ))}
          {resumeData.workExperience.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No work experience added yet. Click &quot;Add Job&quot; to get
              started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Education
            <Button onClick={addEducation} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add Education
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {resumeData.education.map((edu) => (
            <Card key={edu.id} className="border-l-4 border-l-green-500">
              <CardContent className="pt-4">
                <div className="flex justify-between items-start mb-4">
                  <h4 className="font-medium">
                    Education #{resumeData.education.indexOf(edu) + 1}
                  </h4>
                  <Button
                    onClick={() => removeEducation(edu.id)}
                    size="sm"
                    variant="destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label>Degree *</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) =>
                        updateEducation(edu.id, "degree", e.target.value)
                      }
                      placeholder="Bachelor of Science in Computer Science"
                    />
                  </div>
                  <div>
                    <Label>School *</Label>
                    <Input
                      value={edu.school}
                      onChange={(e) =>
                        updateEducation(edu.id, "school", e.target.value)
                      }
                      placeholder="University of California"
                    />
                  </div>
                  <div>
                    <Label>Location</Label>
                    <Input
                      value={edu.location}
                      onChange={(e) =>
                        updateEducation(edu.id, "location", e.target.value)
                      }
                      placeholder="Berkeley, CA"
                    />
                  </div>
                  <div>
                    <Label>Graduation Date</Label>
                    <Input
                      value={edu.graduationDate}
                      onChange={(e) =>
                        updateEducation(
                          edu.id,
                          "graduationDate",
                          e.target.value
                        )
                      }
                      placeholder="May 2020"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          {resumeData.education.length === 0 && (
            <p className="text-gray-500 text-center py-4">
              No education added yet. Click &quot;Add Education&quot; to get
              started.
            </p>
          )}
        </CardContent>
      </Card>

      {/* Skills */}
      <Card>
        <CardHeader>
          <CardTitle>Skills</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="skills">Add Skills</Label>
            <Input
              id="skills"
              value={skillInput}
              onChange={(e) => setSkillInput(e.target.value)}
              onKeyDown={addSkill}
              placeholder="Type a skill and press Enter (e.g., JavaScript, React.js, Node.js)"
            />
            <p className="text-sm text-gray-500 mt-2">
              Type each skill and press Enter to add it. You can use commas
              within skill names.
            </p>
          </div>

          {resumeData.skills.length > 0 && (
            <div>
              <Label>Your Skills:</Label>
              <div className="flex flex-wrap gap-2 mt-2">
                {resumeData.skills.map((skill, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <span>{skill}</span>
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Download Button */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Download Your Resume</h3>
                <p className="text-sm text-gray-500">
                  {isPro
                    ? "Unlimited downloads"
                    : `${remainingDownloads} downloads remaining`}
                </p>
              </div>
              <Button
                onClick={generatePDF}
                disabled={isGenerating || (!isPro && downloads >= 2)}
                size="lg"
              >
                <Download className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Download PDF"}
              </Button>
            </div>
            {!isPro && downloads >= 2 && (
              <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded">
                You&apos;ve used all your free downloads. Upgrade to Pro for
                unlimited access!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
