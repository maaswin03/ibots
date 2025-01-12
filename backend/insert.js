import { db } from "./firebaseConfig.js";

const data = {
  totalRevenuePerDay: [
    { date: "2025-01-05", totalRevenue: 1200 },
    { date: "2025-01-06", totalRevenue: 1500 },
    { date: "2025-01-07", totalRevenue: 1100 },
    { date: "2025-01-08", totalRevenue: 1700 },
    { date: "2025-01-09", totalRevenue: 2000 },
    { date: "2025-01-10", totalRevenue: 1400 },
    { date: "2025-01-11", totalRevenue: 1800 },
  ],
  totalOrdersPerDay: [
    { date: "2025-01-05", totalOrders: 45 },
    { date: "2025-01-06", totalOrders: 50 },
    { date: "2025-01-07", totalOrders: 38 },
    { date: "2025-01-08", totalOrders: 55 },
    { date: "2025-01-09", totalOrders: 60 },
    { date: "2025-01-10", totalOrders: 42 },
    { date: "2025-01-11", totalOrders: 58 },
  ],
  onlineTransactionsPerDay: [
    { date: "2025-01-05", onlineTransactions: 30 },
    { date: "2025-01-06", onlineTransactions: 35 },
    { date: "2025-01-07", onlineTransactions: 28 },
    { date: "2025-01-08", onlineTransactions: 40 },
    { date: "2025-01-09", onlineTransactions: 45 },
    { date: "2025-01-10", onlineTransactions: 32 },
    { date: "2025-01-11", onlineTransactions: 38 },
  ],
  undeliveredOrdersPerDay: [
    { date: "2025-01-05", undeliveredOrders: 5 },
    { date: "2025-01-06", undeliveredOrders: 4 },
    { date: "2025-01-07", undeliveredOrders: 6 },
    { date: "2025-01-08", undeliveredOrders: 3 },
    { date: "2025-01-09", undeliveredOrders: 8 },
    { date: "2025-01-10", undeliveredOrders: 7 },
    { date: "2025-01-11", undeliveredOrders: 4 },
  ],
  customerSatisfactionPerDay: [
    { date: "2025-01-05", satisfactionScore: 4.5 },
    { date: "2025-01-06", satisfactionScore: 4.6 },
    { date: "2025-01-07", satisfactionScore: 4.3 },
    { date: "2025-01-08", satisfactionScore: 4.7 },
    { date: "2025-01-09", satisfactionScore: 4.8 },
    { date: "2025-01-10", satisfactionScore: 4.4 },
    { date: "2025-01-11", satisfactionScore: 4.6 },
  ],
};

async function seedData() {
  for (const [collectionName, documents] of Object.entries(data)) {
    for (const doc of documents) {
      await db.collection(collectionName).add(doc);
    }
    console.log(`Seeded ${collectionName}`);
  }
}

seedData().catch(console.error);
