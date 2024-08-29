import { signOut } from "@/auth";
import React from "react";
import { BsHouseDoor } from "react-icons/bs";
import { GoPeople, GoGear } from "react-icons/go";
import { FaArrowsDownToPeople } from "react-icons/fa6";
import { GiWoodCabin, GiWoodPile } from "react-icons/gi";

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
            <li className="flex gap-2 items-center ">
              <GoPeople /> Overview
            </li>
            <li className="flex gap-2 items-center ">
              <FaArrowsDownToPeople /> Attendance
            </li>
          </ul>
          <div className="text-lg mt-5">Projects</div>
          <ul className="pl-2 mt-2">
            <li className="flex gap-2 items-center ">
              <GiWoodCabin /> Overview
            </li>
            <li className="flex gap-2 items-center ">
              <GiWoodPile /> Materials
            </li>
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
          <button
            type="submit"
            className=" border-black border-2 px-4 py-2 rounded-lg font-semibold hover:bg-black hover:text-white flex text-sm items-center gap-2"
          >
            <GoGear />
            Logout
          </button>
        </form>
      </div>
    </div>
  );
}
