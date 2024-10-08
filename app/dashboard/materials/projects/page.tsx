import ProjectMaterial from "@/app/components/ProjectMaterial";
import React from "react";

export default function ProjectMaterialsPage() {
  return (
    <div className="relative min-h-full">
      <div>
        <div>
          <h2 className="text-lg mb-4 uppercase">Project Materials</h2>
          <ProjectMaterial />
        </div>
      </div>
    </div>
  );
}
