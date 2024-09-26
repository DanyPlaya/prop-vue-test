import { ProductType } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import * as XLSX from "xlsx";
type ExportToCsvProps = {
  productData: ProductType[];
};
export const ExportToXlsx = (props: ExportToCsvProps) => {
  const { productData } = props;
  const handleClick = () => {
    const worksheet = XLSX.utils.json_to_sheet(productData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Products");
    XLSX.writeFile(workbook, "product_data.xlsx");
  };
  return (
    <Button onClick={handleClick} className="bg-green-700">
      Экспортировать в XLSX
    </Button>
  );
};
