import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { TrendingDown } from "lucide-react";
import * as React from "react";

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


interface transactions {
  date: string;
  onlineTransactions:number;
}

const chartConfig = {
  transactions: {
    label: "Transaction",
    color: "hsl(340, 70%, 50%)",
  },
} satisfies ChartConfig;

export function OnlineTransaction() {
  const [Data, setData] = React.useState<transactions[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5200/dashboard-data");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data.transactions);
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
    transactions: item.onlineTransactions,
  }));

  const totalOrders = chartData?.reduce((sum, data) => sum + data.transactions, 0);
  const averageOrders = (totalOrders / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Online transactions - Last 7 Days</CardTitle>
        <CardDescription>
        Total transactions for each day from Jan 05 to Jan 12
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value}
            />
            <YAxis domain={[60, 100]} />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="transactions"
              type="monotone"
              stroke="var(--color-transactions)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <div className="flex w-full items-start gap-2 text-sm">
          <div className="grid gap-2">
            <div className="flex items-center gap-2 font-medium leading-none">
              The average online transactions is {averageOrders}
              <TrendingDown className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing total transactions for each day from Jan 05 to Jan 12.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
