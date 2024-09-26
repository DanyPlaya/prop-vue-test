"use client";
import { ProductType } from "@/entities/product";
import { Input } from "@/shared/ui";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { useState } from "react";
import { File, Upload } from "lucide-react";

type FileUploaderProps = {
  onFileUpload: (productData: ProductType[]) => void;
};

export const FileUploader = (props: FileUploaderProps) => {
  const { onFileUpload } = props;
  const [fileName, setFileName] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      alert("Ошибка: файл не выбран");
      return;
    }

    setFileName(file.name); // Set the file name for display
    const reader = new FileReader();

    reader.onload = (e) => {
      const data = e.target?.result;

      if (file.name.endsWith(".csv")) {
        if (typeof data === "string") {
          Papa.parse<ProductType>(data, {
            header: true,
            skipEmptyLines: "greedy",
            delimiter: ",",
            complete: (results) => {
              onFileUpload(results.data);
            },
          });
        }
      } else if (file.name.endsWith(".xlsx")) {
        if (data instanceof ArrayBuffer) {
          const workbook = XLSX.read(new Uint8Array(data), { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = XLSX.utils.sheet_to_json<ProductType>(
            workbook.Sheets[sheetName]
          );
          onFileUpload(worksheet);
        } else {
          alert("Ошибка: данные файла не корректны");
        }
      } else {
        alert("Ошибка: неподдерживаемый формат файла");
      }
    };

    if (file.name.endsWith(".csv")) {
      reader.readAsText(file);
    } else {
      reader.readAsArrayBuffer(file);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <label className="flex flex-col items-center p-4 bg-green-300 rounded-lg shadow-md cursor-pointer hover:bg-green-400 transition">
        <Upload className="mb-2 text-2xl" />
        <span className="text-lg font-semibold">
          {fileName || "Загрузите файл"}
        </span>
        <span className="text-sm text-gray-600">
          Поддерживаемые форматы: .csv, .xlsx
        </span>
        <Input
          type="file"
          accept=".csv, .xlsx, .xls"
          onChange={(e) => handleFileUpload(e)}
          className="hidden"
        />
      </label>
      <div className="mt-2 text-center">
        {fileName && (
          <div className="flex items-center">
            {fileName.endsWith(".csv") ? (
              <File className="text-green-600" />
            ) : (
              <File className="text-green-600" />
            )}
            <span className="ml-2">{fileName}</span>
          </div>
        )}
      </div>
    </div>
  );
};
