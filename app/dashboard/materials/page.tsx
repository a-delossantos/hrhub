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
        <h2 className="text-lg mb-4 uppercase">Suppliers</h2>
        <div>
          <Supplier />
          <SupplierTable />
        </div>
      </div>

      <div>
        {/* <Button
          variant="outlined"
          startIcon={<IoMdAdd />}
          onClick={() => setShowMaterialModal(true)}
          size="small"
        >
          Add Material
        </Button> */}
      </div>

      <div className="mt-6">
        <h3 className="text-xl mb-4">Materials</h3>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Material ID</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell>Category</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {materials.map((material) => (
                  <TableRow
                    key={material.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell>{material.material_id}</TableCell>
                    <TableCell component="th" scope="row">
                      {material.name}
                    </TableCell>
                    <TableCell>{material.category}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
      {showMaterialModal && (
        <AddMaterial setShowMaterialModal={setShowMaterialModal} />
      )}
    </div>
  );
}
