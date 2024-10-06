import { signOut } from "@/auth";
import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { GoPeople, GoGear } from "react-icons/go";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";
import { GiWoodCabin, GiWoodPile } from "react-icons/gi";
import NavItem from "./NavItem";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Sidemenu() {
  return (
    <div className="w-56 p-4  flex-col justify-between hidden lg:flex">
      <div>
        <Image
          src={"/faec-colored.png"}
          width={150}
          height={100}
          alt="logo"
          className="mb-10"
        />
        <div>
          <div>
            <p className="text-sm font-semibold">Employees</p>
            <ul>
              <NavItem href={"/dashboard"} icon={<FaArrowsDownToPeople />}>
                Dashboard
              </NavItem>
              <NavItem href={"/attendance"} icon={<GoPeople />}>
                Attendance
              </NavItem>
            </ul>
          </div>
          <div className="mt-6">
            <p className="text-sm font-semibold">Materials</p>
            <ul>
              <NavItem href={"/dashboard/materials"} icon={<GiWoodCabin />}>
                Dashboard
              </NavItem>
              <NavItem href={"/attendance"} icon={<GiWoodPile />}>
                Attendance
              </NavItem>
            </ul>
          </div>
        </div>
      </div>

      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button variant={"outline"} className="w-full" type={"submit"}>
            <GoGear className="mr-2 h-4 w-4" />
            Sign out
          </Button>
        </form>
      </div>
    </div>
  );
}
