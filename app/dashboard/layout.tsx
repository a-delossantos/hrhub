import type { Metadata } from "next";
import Sidemenu from "../components/Sidemenu";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) redirect("/");
  return (
    <div className="flex h-screen">
      <Sidemenu />
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
}
