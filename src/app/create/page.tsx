import { auth } from "@/lib/auth";
import { Header } from "@/components/header";
import CreatePage from "./CreatePage";

export default async function Create() {
  const session = await auth();

  return (
    <>
      <Header.Container className="bg-white">
        <Header.Content>
          <div className="flex items-center space-x-4">
            {!session?.user.id && (
              <Header.Button href="/login" variant="default">
                Login
              </Header.Button>
            )}

            {session?.user.plan === "FREE" && (
              <Header.PaymentButton session={session} />
            )}

            {session?.user.id && <Header.Account session={session} />}
          </div>
        </Header.Content>
      </Header.Container>
      <div className="min-h-screen bg-gray-50">
        <CreatePage session={session} />
      </div>
    </>
  );
}
