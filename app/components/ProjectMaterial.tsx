"use client";
import { Button } from "@/components/ui/button";
import { SquarePlus } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import { Material, Project, Supplier } from "@prisma/client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

const formSchema = z.object({
  material: z.string(),
  project: z.string(),
  price: z.number(),
  quantity: z.number(),
  date: z.date(),
});

interface MaterialType extends Material {
  supplier: Supplier;
}

const MaterialForm = () => {
  const [materials, setMaterials] = useState<MaterialType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialType[]>(
    []
  );
  const [searchInput, setSeachInput] = useState<string>("");

  useEffect(() => {
    const lowercasedFilter = searchInput.toLowerCase();

    const filtered = materials.filter((item) => {
      return (
        item.name.toLowerCase().includes(lowercasedFilter) ||
        item.category.toLowerCase().includes(lowercasedFilter) ||
        item.material_id.toLowerCase().includes(lowercasedFilter) ||
        item.supplier.name.toLowerCase().includes(lowercasedFilter) ||
        item.supplier?.contact?.includes(lowercasedFilter) ||
        item.supplier?.address?.toLowerCase().includes(lowercasedFilter)
      );
    });

    setFilteredMaterials(filtered);
  }, [searchInput, materials]);

  useEffect(() => {
    fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => {
        setMaterials(data);
        console.log(JSON.stringify(data, null, 2));
      });
    fetch("/api/project")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    const addProjectMaterial = async () => {
      const res = await fetch("/api/project/material", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      if (res.ok) {
        window.location.reload();
      } else {
        console.error("Failed to add material");
      }
    };
    addProjectMaterial();
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="project"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.id.toString()}>
                      {project.alias} - {project.address}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="material"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Material</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a material" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <div className="mb-2">
                    <Input
                      placeholder="Search Materials"
                      onChange={(e) => setSeachInput(e.target.value)}
                    />
                  </div>

                  {searchInput.length === 0 ? (
                    materials.map((material) => (
                      <SelectItem key={material.id} value={material.id + ""}>
                        {material.name} - {material.supplier.name}
                      </SelectItem>
                    ))
                  ) : searchInput.length > 0 && filteredMaterials.length > 0 ? (
                    filteredMaterials.map((material) => (
                      <SelectItem key={material.id} value={material.name + ""}>
                        {material.name} - {material.supplier.name}
                      </SelectItem>
                    ))
                  ) : (
                    <p className="text-sm">No results.</p>
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input
                  placeholder="Price per unit"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="quantity"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Quantity</FormLabel>
              <FormControl>
                <Input
                  placeholder="Matierial Quantity"
                  {...field}
                  onChange={(e) => field.onChange(Number(e.target.value))}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Added Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default function ProjectMaterial() {
  return (
    <div>
      <Drawer>
        <DrawerTrigger className="flex items-center justify-center bg-white py-1 px-3 rounded-md drop-shadow-md hover:bg-[#F1F5F9] text-sm">
          <SquarePlus className="mr-2 w-4 h-4" />
          Add Project Material
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle className="mb-6">New Project Material</DrawerTitle>
            <DrawerDescription>
              <MaterialForm />
            </DrawerDescription>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
