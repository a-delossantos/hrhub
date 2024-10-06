"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Material, Supplier } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import React from "react";
import { useEffect, useState } from "react";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

type MaterialType = {
  id: number;
  name: string;
  supplier: Supplier;
  material_id: string;
};

export const columns: ColumnDef<MaterialType>[] = [
  {
    accessorKey: "material_id",
    header: "Material ID",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "supplier.name",
    header: "Supplier Name",
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default function MaterialTable() {
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    fetch("/api/materials")
      .then((res) => res.json())
      .then((data) => setMaterials(data));
  }, []);

  return (
    // <div className="mt-6 max-w-[90vw] lg:overflow-x-hidden overflow-x-scroll">
    //   <div className=" min-w-[700px]">
    //     <Table>
    //       <TableCaption>List of Available Suppliers</TableCaption>
    //       <TableHeader>
    //         <TableRow>
    //           <TableHead className="w-[100px]">Supplier ID</TableHead>
    //           <TableHead>Name</TableHead>
    //           <TableHead>Contact</TableHead>
    //           <TableHead className="text-right">Address</TableHead>
    //         </TableRow>
    //       </TableHeader>
    //       <TableBody>
    //         {suppliers.map((supplier) => (
    //           <TableRow key={supplier.id}>
    //             <TableCell key={supplier.id}>{`SPP ${supplier.id}`}</TableCell>
    //             <TableCell>{supplier.name}</TableCell>
    //             <TableCell>{supplier.contact}</TableCell>
    //             <TableCell className="text-right">{supplier.address}</TableCell>
    //           </TableRow>
    //         ))}
    //       </TableBody>
    //     </Table>
    //   </div>
    // </div>

    <div className="mt-6 max-w-[90vw] lg:overflow-x-hidden overflow-x-scroll">
      <div className=" min-w-[700px]">
        <DataTable columns={columns} data={materials} />
      </div>
    </div>
  );
}
