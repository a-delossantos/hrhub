import Project from "@/app/components/Project";
import ProjectGrid from "@/app/components/ProjectGrid";
import React from "react";

export default function ProjectPage() {
  return (
    <div className="relative min-h-full">
      <Project />
      <div className="mt-10">
        <h2 className="text-lg mb-4 uppercase">Projects</h2>
        <ProjectGrid />
      </div>
    </div>
  );
}
