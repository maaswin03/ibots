import express from "express";
import { db } from "./firebaseConfig.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/dashboard-data", async (req, res) => {
  try {
    const revenueData = await db.collection("totalRevenuePerDay").orderBy("date", "asc").get();
    const ordersData = await db.collection("totalOrdersPerDay").orderBy("date", "asc").get();
    const transactionData = await db.collection("onlineTransactionsPerDay").orderBy("date", "asc").get();
    const undeliveredOrdersData = await db.collection("undeliveredOrdersPerDay").orderBy("date", "asc").get();
    const customerSatisfactionData = await db.collection("customerSatisfactionPerDay").orderBy("date", "asc").get();

    const revenue = revenueData.docs.map(doc => doc.data());
    const orders = ordersData.docs.map(doc => doc.data());
    const transactions = transactionData.docs.map(doc => doc.data());
    const undeliveredOrders = undeliveredOrdersData.docs.map(doc => doc.data());
    const customerSatisfaction = customerSatisfactionData.docs.map(doc => doc.data());

    const dashboardData = {
      revenue: revenue,
      orders: orders,
      transactions: transactions,
      undeliveredOrders: undeliveredOrders,
      customerSatisfaction: customerSatisfaction,
    };

    res.status(200).json(dashboardData);
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    res.status(500).json({ message: "An error occurred while fetching data." });
  }
});

const PORT = process.env.PORT || 5200;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
