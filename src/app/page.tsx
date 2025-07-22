import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, Download, Zap, Check } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileText className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900">ResumeSnap</span>
          </div>
          <Link href="/create">
            <Button variant="outline">Create Resume</Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Create Your Professional Resume
          <span className="text-blue-600"> in Minutes</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Build a stunning, professional resume with our easy-to-use online
          builder. No design skills required. Download as PDF instantly.
        </p>
        <Link href="/create">
          <Button size="lg" className="text-lg px-8 py-4">
            Start Building Now - It&apos;s Free
          </Button>
        </Link>
        <p className="text-sm text-gray-500 mt-4">
          ✨ 2 free PDF downloads • Fast signup • Works offline
        </p>
      </section>

      {/* How It Works */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Fill Out Form</h3>
              <p className="text-gray-600">
                Enter your personal information, work experience, education, and
                skills in our simple form.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Live Preview</h3>
              <p className="text-gray-600">
                See your resume come to life with our real-time preview as you
                type.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Download className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Download PDF</h3>
              <p className="text-gray-600">
                Download your professional resume as a high-quality PDF ready
                for job applications.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Choose ResumeSnap?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Fast signup",
              "Works completely offline",
              "Professional templates",
              "Instant PDF download",
              "Mobile responsive",
              "Your data stays private",
              "ATS-friendly format",
              "Free to start",
            ].map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Check className="h-5 w-5 text-green-500" />
                <span className="text-gray-700">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Land Your Dream Job?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Join thousands of job seekers who&apos;ve created their perfect
            resume with ResumeSnap.
          </p>
          <Link href="/create">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Create Your Resume Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6" />
            <span className="text-xl font-bold">ResumeSnap</span>
          </div>
          <p className="text-gray-400 text-sm">
            © 2024 ResumeSnap. Your data is never stored on our servers.
            Everything happens in your browser for maximum privacy.
          </p>
        </div>
      </footer>
    </div>
  );
}
