"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";

interface NavItemProps {
  href: string;
  icon: React.ReactElement<IconType>;
  children: React.ReactNode;
}

export default function NavItem({ href, icon, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <li>
      <Link
        href={href}
        className={`flex gap-2 items-center px-2 py-1 text-sm mt-1 ${
          isActive
            ? "bg-gray-300 text-black rounded-md"
            : "hover:bg-zinc-300 rounded-md"
        }`}
      >
        {icon}
        {children}
      </Link>
    </li>
  );
}
