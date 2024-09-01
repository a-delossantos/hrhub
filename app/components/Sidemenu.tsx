import { signOut } from "@/auth";
import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { GoPeople, GoGear } from "react-icons/go";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { IoMdListBox } from "react-icons/io";
import { GiWoodCabin, GiWoodPile } from "react-icons/gi";
import NavItem from "./NavItem";
import { Button } from "@mui/material";

export default function Sidemenu() {
  return (
    <div className="w-56 p-4 flex flex-col justify-between">
      <div>
        <h1 className="text-2xl font-bold mb-10 flex gap-2 items-center">
          <BsHouseDoor />
          First Asia
        </h1>
        <nav>
          <div className="text-lg">Employees</div>
          <ul className="pl-2 mt-2">
            <NavItem href="/dashboard/employees" icon={<GoPeople />}>
              Overview
            </NavItem>
            <NavItem
              href="/dashboard/employees/attendance"
              icon={<FaArrowsDownToPeople />}
            >
              Attendance
            </NavItem>
          </ul>
          <div className="text-lg mt-5">Projects</div>
          <ul className="pl-2 mt-2">
            <NavItem href="/dashboard/projects" icon={<GiWoodCabin />}>
              Overview
            </NavItem>
            <NavItem href="/dashboard/projects/materials" icon={<GiWoodPile />}>
              Project Materials
            </NavItem>
          </ul>
          <div className="text-lg mt-5">Materials</div>
          <ul className="pl-2 mt-2">
            <NavItem href="/dashboard/materials" icon={<IoMdListBox />}>
              List
            </NavItem>
          </ul>
        </nav>
      </div>
      <div>
        <form
          action={async () => {
            "use server";
            await signOut();
          }}
        >
          <Button startIcon={<GoGear />} type="submit">
            Logout
          </Button>
        </form>
      </div>
    </div>
  );
}
