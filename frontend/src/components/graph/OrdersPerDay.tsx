import { TrendingUp } from "lucide-react";
import * as React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  XAxis,
  YAxis,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface OrderData {
  date: string;
  totalOrders: number;
}

const chartConfig = {
  orders: {
    label: "Total Orders",
    color: "hsl(var(--chart-1))",
  },
  label: {
    color: "hsl(var(--background))",
  },
} satisfies ChartConfig;

export function OrdersPerDay() {
  const [Data, setData] = React.useState<OrderData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5200/dashboard-data");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data.orders);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = Data.map((item) => ({
    time: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    orders: item.totalOrders,
  }));

  const totalOrders = chartData?.reduce((sum, data) => sum + data.orders, 0);
  const averageOrders = (totalOrders / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Orders - Last 7 Days</CardTitle>
        <CardDescription>
          Total orders for each day from Jan 05 to Jan 12
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart
            accessibilityLayer
            data={chartData}
            layout="vertical"
            margin={{
              right: 16,
            }}
          >
            <CartesianGrid horizontal={false} />
            <YAxis
              dataKey="time"
              type="category"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <XAxis
              dataKey="orders"
              type="number"
              domain={[0, Math.max(...chartData.map((d) => d.orders)) + 5]} // Adjust dynamically
              tickCount={6}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Bar
              dataKey="orders"
              layout="vertical"
              fill="var(--color-orders)"
              radius={4}
            >
              <LabelList
                dataKey="date"
                position="insideLeft"
                offset={8}
                className="fill-[--color-label]"
                fontSize={12}
              />
              <LabelList
                dataKey="orders"
                position="right"
                offset={8}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          The average total orders are {averageOrders}
          <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Data represents undelivered orders from Jan 05 to Jan 12.
        </div>
      </CardFooter>
    </Card>
  );
}
