"use client";
import { ProductType } from "@/entities/product";
import { ExportToCsv } from "@/features/export-to-csv";
import { ExportToXlsx } from "@/features/export-to-xlsx";
import { FileUploader } from "@/features/file-uploader";
import { AveragePriceChart } from "@/widgets/average-price-chart";
import { columns, DataTable } from "@/widgets/data-table";
import { useState } from "react";

const MainPage = () => {
  const [productData, setProductData] = useState<ProductType[]>([]);
  console.log(productData);
  return (
    <div className="grid gap-4">
      <FileUploader onFileUpload={setProductData} />
      <div className="grid ">
        <DataTable
          setData={setProductData}
          columns={columns}
          data={productData || []}
        />

        {productData.length > 0 && (
          <div className="flex items-center justify-center gap-10">
            <ExportToCsv productData={productData} />
            <ExportToXlsx productData={productData} />
          </div>
        )}
        {productData.length > 0 && <AveragePriceChart data={productData} />}
      </div>
    </div>
  );
};
export default MainPage;
