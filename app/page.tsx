import { auth, signIn } from "@/auth";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import Image from "next/image";

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
        {/* <button
          type="submit"
          className="text-lg border-black border-2 px-4 py-2 rounded-lg font-semibold hover:bg-black hover:text-white"
        >
          Sign in
        </button> */}

        <Card>
          <CardHeader>
            <CardTitle>
              <Image
                alt="logo"
                src="/faec-colored.png"
                width={250}
                height={200}
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="default" className="w-full mt-2">
              Sign in
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
