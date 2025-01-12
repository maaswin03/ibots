import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
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

interface Satisfaction {
  date: string;
  satisfactionScore: number;
}

const chartConfig = {
  Score: {
    label: "Score",
    color: "hsl(200, 70%, 50%)",
  },
} satisfies ChartConfig;

export function CustomerSatisfaction() {
  const [Data, setData] = React.useState<Satisfaction[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5200/dashboard-data");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data.customerSatisfaction);
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
    satisfactionScore: item.satisfactionScore,
  }));

  const totalsatisfactionScore = chartData?.reduce(
    (sum, data) => sum + data.satisfactionScore,
    0
  );
  const averagesatisfactionScore = (totalsatisfactionScore / chartData.length).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Customer Satisfaction - Last 7 Days</CardTitle>
        <CardDescription>
        Total satisfaction score for each day from Jan 05 to Jan 12
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            margin={{
              top: 20,
              left: -30,
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
            <YAxis />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Line
              dataKey="satisfactionScore"
              type="monotone"
              stroke="var(--color-Score)"
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
            The average satisfaction score is {averagesatisfactionScore}
              <TrendingUp className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-2 leading-none text-muted-foreground">
            Showing satisfaction score for each day from Jan 05 to Jan 12.
            </div>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
