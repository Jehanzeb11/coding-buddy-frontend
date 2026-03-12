import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-background text-foreground animate-in fade-in duration-500">
      {/* Any layout-wide UI components like a Chat Nav could go here */}
      <main className="flex-1 w-full h-full">
        {children}
      </main>
    </div>
  );
}
