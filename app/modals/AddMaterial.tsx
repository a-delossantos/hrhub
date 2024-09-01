"use client";
import { useRef } from "react";
import { materialsCategories } from "../lib/contants";
import { generateId } from "../lib/db";
import { redirect } from "next/navigation";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";

interface AddMaterialProps {
  setShowMaterialModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function AddMaterial({
  setShowMaterialModal,
}: AddMaterialProps) {
  const materialName = useRef<HTMLInputElement | null>(null);
  const materialCategory = useRef<any>(null);

  const handleClose = () => {
    setShowMaterialModal(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (materialName.current?.value && materialCategory.current?.value) {
      await addMaterial();
      setShowMaterialModal(false);
      window.location.reload();
    } else {
      alert("All fields are required");
    }
  };

  const addMaterial = async () => {
    const res = await fetch("/api/materials", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: materialName.current?.value,
        category: materialCategory.current?.value,
      }),
    });

    if (res.ok) {
      console.log("Material added successfully");
    } else {
      console.error("Failed to add material");
    }
  };

  return (
    <div className="absolute h-full w-full bg-gray-300 inset-0 flex justify-center items-center">
      <form className="min-w-96">
        <h3 className="text-xl mb-9 text-center">Add New Material</h3>
        <div className="flex flex-col gap-4">
          <TextField
            id="outlined-basic"
            label="Material Name"
            variant="outlined"
            inputRef={materialName}
            size="small"
          />
          <TextField
            id="outlined-select-currency"
            select
            label="Select"
            defaultValue="EUR"
            helperText="Please select category"
            size="small"
            inputRef={materialCategory}
          >
            {materialsCategories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </TextField>
        </div>
        <div className="mt-4 flex gap-4">
          <Button variant="contained" size="small" onClick={handleSubmit}>
            Submit
          </Button>
          <Button
            variant="outlined"
            color="error"
            size="small"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}
