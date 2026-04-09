import { verifySession } from "@/lib/session";
import { redirect } from "next/navigation";

export default async function ChatLayout({ children }: { children: React.ReactNode }) {
  const { isAuth } = await verifySession();

  if (!isAuth) {
    redirect("/login");
  }

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col bg-white dark:bg-[#030712] text-foreground animate-in fade-in duration-500 relative">
      {/* Background glowing gradients */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/20 dark:bg-violet-600/20 blur-[120px] rounded-full pointer-events-none z-0" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/20 dark:bg-fuchsia-600/20 blur-[140px] rounded-full pointer-events-none z-0" />

      <main className="flex-1 w-full h-full relative z-10">
        {children}
      </main>
    </div>
  );
}
