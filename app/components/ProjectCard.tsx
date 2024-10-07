import { Project } from "@prisma/client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function ProjectCard({ project }: { project: Project }) {
  const date = new Date(project.startDate ? project.startDate : new Date());
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  return (
    <Card className="max-w-xl">
      <CardHeader>
        <CardTitle className="uppercase">{project.alias}</CardTitle>
        <CardDescription>{project.address}</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Start Date: {formattedDate}</p>
        <p>Owner: {project.owner_name}</p>
      </CardContent>
    </Card>
  );
}
