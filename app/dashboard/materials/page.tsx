"use client";
import AddMaterial from "@/app/modals/AddMaterial";
import { Material } from "@prisma/client";
import { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Supplier from "@/app/components/Supplier";
import SupplierTable from "@/app/components/SupplierTable";
import Materials from "@/app/components/Materials";
import MaterialTable from "@/app/components/MaterialTable";

export default function MaterialsPage() {
  const [showMaterialModal, setShowMaterialModal] = useState(false);
  const [materials, setMaterials] = useState<Material[]>([]);

  useEffect(() => {
    fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));
  }, []);

  return (
    <div className="relative min-h-full">
      <div>
        <div>
          <h2 className="text-lg mb-4 uppercase">Suppliers</h2>
          <Supplier />
          <SupplierTable />
        </div>
        <div className="mt-12">
          <h2 className="text-lg mb-4 uppercase">Materials</h2>
          <Materials />
          <MaterialTable />
        </div>
      </div>
    </div>
  );
}
