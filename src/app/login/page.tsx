import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { ArrowLeft, Chrome, FileText, Github } from "lucide-react";
import { signIn } from "@/lib/auth";

export default async function LoginPage() {
  const handleGithubLogin = async () => {
    "use server";

    await signIn("github", { redirectTo: "/create" });
  };

  const handleGoogleLogin = async () => {
    "use server";

    await signIn("google", { redirectTo: "/create" });
  };

  return (
    <div>
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
          </div>
        </div>
      </header>
      <div className="min-h-screen bg-gray-50 flex items-start justify-center">
        <Card className="w-full max-w-md mt-8">
          <CardHeader>
            <CardTitle className="text-center text-2xl font-bold">
              Login to ResumeSnap
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col space-y-4">
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGithubLogin}
            >
              <span className="flex items-center justify-center space-x-2">
                <Github />
                <span>Login with GitHub</span>
              </span>
            </Button>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleGoogleLogin}
            >
              <span className="flex items-center justify-center space-x-2">
                <Chrome />
                <span>Login with Google</span>
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
