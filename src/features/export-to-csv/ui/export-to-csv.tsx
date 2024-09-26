import { ProductType } from "@/entities/product";
import { Button } from "@/shared/ui/button";
import Papa from "papaparse";
type ExportToCsvProps = {
  productData: ProductType[];
};
export const ExportToCsv = (props: ExportToCsvProps) => {
  const { productData } = props;

  const handleClick = () => {
    const csvData = Papa.unparse(productData);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "product_data.csv");
    link.click();
  };
  return (
    <Button onClick={handleClick} className="bg-green-700">
      Экспортировать в CSV
    </Button>
  );
};
