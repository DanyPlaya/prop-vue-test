import { ProductType } from "@/entities/product";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/shared/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DashboardProps = {
  data: ProductType[];
};

const chartConfig = {
  Value: {
    label: "Value",
    color: "#2563eb",
  },
  Qty: {
    label: "Quantity",
    color: "#16a34a",
  },
} satisfies ChartConfig;

export const AveragePriceChart = (props: DashboardProps) => {
  const { data } = props;

  const totalStockData = data.map((item) => ({
    name: item.Product,
    qty: item.Qty,
  }));

  const maxStockQty = Math.max(...totalStockData.map((item) => item.qty));

  const averagePriceData = data.map((item) => ({
    name: item.Product,
    value: item.Value,
  }));

  const maxPriceValue = Math.max(...averagePriceData.map((item) => item.value));

  const totalUnitsData = data.map((item) => ({
    name: item.Product,
    qty: item.Qty,
  }));

  const maxUnitsQty = Math.max(...totalUnitsData.map((item) => item.qty));

  return (
    <div className="flex flex-col gap-6">
      {/* График общего объема запасов */}
      <div>
        <h2 className="mb-4">Общий объем запасов</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={totalStockData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis dataKey="qty" domain={[0, maxStockQty]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="qty" fill={chartConfig.Qty.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* График средней цены товара */}
      <div>
        <h2 className="mb-4">Средняя цена товара</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={averagePriceData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis dataKey="value" domain={[0, maxPriceValue]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="value" fill={chartConfig.Value.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>

      {/* График общего количества единиц товаров на складе */}
      <div>
        <h2 className="mb-4">Общее количество единиц товаров на складе</h2>
        <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
          <BarChart data={totalUnitsData}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey="name" axisLine={false} />
            <YAxis dataKey="qty" domain={[0, maxUnitsQty]} />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Bar dataKey="qty" fill={chartConfig.Qty.color} radius={4} />
          </BarChart>
        </ChartContainer>
      </div>
    </div>
  );
};
