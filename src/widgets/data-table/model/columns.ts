"use client";

import { ProductType } from "@/entities/product";
import { ColumnDef } from "@tanstack/react-table";
import { TableCell } from "../ui/table-cell";

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "Fulfilment centr",
    accessorFn: (data) => data["Fulfilment centr"],
    header: "Fulfilment centr",
    cell: TableCell,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "Product",
    header: "Product",
    accessorFn: (data) => data.Product,
    cell: TableCell,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "Qty",
    header: "Qty",
    accessorFn: (data) => data.Qty,
    cell: TableCell,
    meta: {
      type: "text",
    },
  },
  {
    accessorKey: "Status",
    accessorFn: (data) => data.Status,
    header: "Status",
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        { value: "Sellable", label: "Sellable" },
        { value: "Unfulfillable", label: "Unfulfillable" },
        { value: "Inbound", label: "Inbound" },
      ],
    },
  },
  {
    accessorKey: "Value",
    accessorFn: (data) => data.Value,
    header: "Value",
    cell: TableCell,
    meta: {
      type: "number",
    },
  },
];
