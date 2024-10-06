"use client";
import AddProject from "@/app/modals/AddProject";
// import Button from "@mui/material/Button";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { BsHouseAdd } from "react-icons/bs";

export default function ProjectPage() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <div className="relative min-h-full">
      <div>
        <Button
          variant="default"
          className="gap-2"
          onClick={() => setShowModal(true)}
        >
          <BsHouseAdd />
          New Project
        </Button>
      </div>

      {showModal && (
        <AddProject setShowModal={setShowModal} showModal={showModal} />
      )}
    </div>
  );
}
