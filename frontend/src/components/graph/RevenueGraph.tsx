import * as React from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "../ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

interface RevenueData {
  date: string;
  totalRevenue: number;
}

const chartConfig = {
  revenue: {
    label: "Revenue",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function RevenueGraph() {
  const [timeRange, setTimeRange] = React.useState("7");
  const [revenueData, setRevenueData] = React.useState<RevenueData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ibots.onrender.com/dashboard-data");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setRevenueData(data.revenue);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const chartData = revenueData.map((item) => ({
    time: new Date(item.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    revenue: item.totalRevenue,
  }));

  const filteredData = chartData.filter((item) => {
    const time = new Date(item.time);
    const referenceTime = new Date(chartData[6].time);
    let daysToSubtract = 7;

    if (timeRange === "4") {
      daysToSubtract = 4;
    }

    const startTime = new Date(referenceTime);
    startTime.setDate(startTime.getDate() - daysToSubtract);

    return time >= startTime;
  });


  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>
            Revenue - <span>Last {timeRange} Days</span>
          </CardTitle>
          <CardDescription>
            Showing revenue data for the selected time range
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger
            className="w-[160px] rounded-lg sm:ml-auto"
            aria-label="Select a value"
          >
            <SelectValue placeholder="Last 7 days" />
          </SelectTrigger>
          <SelectContent className="rounded-xl">
            <SelectItem value="7" className="rounded-lg">
              Last 7 days
            </SelectItem>
            <SelectItem value="4" className="rounded-lg">
              Last 4 days
            </SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-revenue)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="time"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => value}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => value}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="revenue"
              type="natural"
              fill="url(#fillRevenue)"
              stroke="var(--color-revenue)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
