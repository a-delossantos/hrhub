import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (session) redirect("/dashboard");

  return (
    <div className="flex h-screen items-center justify-center">
      <form
        action={async () => {
          "use server";
          await signIn("google");
        }}
      >
        <button
          type="submit"
          className="text-lg border-black border-2 px-4 py-2 rounded-lg font-semibold hover:bg-black hover:text-white"
        >
          Sign in
        </button>
      </form>
    </div>
  );
}
