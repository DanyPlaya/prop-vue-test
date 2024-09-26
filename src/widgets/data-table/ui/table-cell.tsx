/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { ProductType } from "@/entities/product";
import { Input } from "@/shared/ui";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";
import { Column, Getter, Row, Table } from "@tanstack/react-table";
import { KeyboardEvent, useEffect, useRef, useState } from "react";
type TableCellProps = {
  getValue: Getter<unknown>;
  row: Row<ProductType>;
  column: Column<ProductType, unknown>;
  table: Table<ProductType>;
};
type Option = {
  label: string;
  value: string;
};
//TODO правильно типизировать table.options.meta?.updateData
export const TableCell = (props: TableCellProps) => {
  const { column, getValue, row, table } = props;
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const initialValue = getValue() as string;
  const ref = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState(initialValue);
  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    table.options.meta?.updateData(row.index, column.id, value);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      table.options.meta?.updateData(row.index, column.id, value);
      ref.current?.blur();
    }
  };
  const onSelectChange = (value: string) => {
    setValue(value);

    tableMeta?.updateData(row.index, column.id, value);
  };

  return columnMeta?.type === "select" ? (
    <Select onValueChange={(e) => onSelectChange(e)}>
      <SelectTrigger className="w-[180px]">
        <SelectValue defaultValue={initialValue} placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        {columnMeta?.options?.map((option: Option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  ) : (
    <Input
      ref={ref}
      onKeyDown={handleKeyDown}
      value={value}
      type={column.columnDef.meta?.type || "text"}
      onChange={(e) => setValue(e.target.value)}
      onBlur={onBlur}
    />
  );
};
