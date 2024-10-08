"use client";
import { Project } from "@prisma/client";
import React, { useEffect, useState } from "react";
import ProjectCard from "./ProjectCard";

export default function ProjectGrid() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        console.log(data);
      });
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
}
