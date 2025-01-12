import { AppSidebar } from "@/components/app-sidebar";
import { CustomerSatisfaction } from "@/components/graph/CustomerSatisfaction";
import { RevenueGraph } from "@/components/graph/RevenueGraph";
import * as React from "react";
import { OnlineTransaction } from "@/components/graph/OnlineTransaction";
import { UndeliveredOrders } from "@/components/graph/UndeliveredOrders";
import { OrdersPerDay } from "@/components/graph/OrdersPerDay";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

interface Satisfaction {
  date: string;
  satisfactionScore: number;
}

interface RevenueData {
  date: string;
  totalRevenue: number;
}

interface Transactions {
  date: string;
  onlineTransactions: number;
}

interface OrderData {
  date: string;
  totalOrders: number;
}

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

export default function Dashboard() {
  const position: [number, number] = [11.024272571929046,76.9277704373467];
  
  const [satisfactionData, setSatisfactionData] = React.useState<Satisfaction[]>([]);
  const [revenueData, setRevenueData] = React.useState<RevenueData[]>([]);
  const [transactionsData, setTransactionsData] = React.useState<Transactions[]>([]);
  const [orderData, setOrderData] = React.useState<OrderData[]>([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://ibots.onrender.com/dashboard-data");

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setTransactionsData(data.transactions);
        setOrderData(data.orders);
        setRevenueData(data.revenue);
        setSatisfactionData(data.customerSatisfaction);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="/HealthTracking">
                    Services
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Admin Panel</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <RevenueGraph />
          <div className="grid auto-rows-min gap-4 md:grid-cols-2">
            <OrdersPerDay />
            <OnlineTransaction />
            <CustomerSatisfaction />
            <UndeliveredOrders />
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <h1 className="text-2xl font-extrabold mt-2 mb-0">
            Current Readings
          </h1>
          <p className="text-sm mt-0 mb-3">
            This displays the current readings for various parameters.
          </p>
          <div className="grid auto-rows-min gap-4 md:grid-cols-4">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Total Revenue</CardTitle>
                  <CardDescription>11 Jan 2025</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-extrabold text-primary">
                    ₹ {revenueData[6]?.totalRevenue || "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>Updated 5 minutes ago</CardDescription>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Online Transactions</CardTitle>
                  <CardDescription>11 Jan 2025</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-extrabold text-primary">
                    {transactionsData[6]?.onlineTransactions || "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>Updated 5 minutes ago</CardDescription>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Total Orders</CardTitle>
                  <CardDescription>11 Jan 2025</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-extrabold text-primary">
                    {orderData[6]?.totalOrders || "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>Updated 5 minutes ago</CardDescription>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Customer Satisfaction</CardTitle>
                  <CardDescription>11 Jan 2025</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-2xl font-extrabold text-primary">
                    {satisfactionData[6]?.satisfactionScore || "N/A"}
                  </p>
                </CardContent>
                <CardFooter>
                  <CardDescription>Updated 5 minutes ago</CardDescription>
                </CardFooter>
              </Card>
            </div>
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>

        <div className="flex flex-1 flex-col gap-4 p-4 pt-0 mb-3">
          <div className="grid auto-rows-min gap-4">
            {position ? (
              <MapContainer
                center={position}
                zoom={10}
                style={{ height: "500px", width: "100%", borderRadius: "10px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position} icon={markerIcon}>
                  <Popup>
                    <strong style={{ fontWeight: "700" }}>
                      Ibots
                    </strong>
                    <br />
                    Total revenue : {revenueData[6]?.totalRevenue || "N/A"}
                    <br />
                    Online Transaction : {transactionsData[6]?.onlineTransactions || "N/A"}
                    <br />
                    Satisfaction : {satisfactionData[6]?.satisfactionScore || "N/A"}
                    <br />
                    Online Orders : {orderData[6]?.totalOrders || "N/A"}
                    <br />
                    Date : Jan 11
                    <br />
                  </Popup>
                </Marker>
              </MapContainer>
            ) : (
              <div>Loading map...</div>
            )}
          </div>
          <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
