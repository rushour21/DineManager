import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import customerRoutes from "./routes/customerRoutes.js";
import adminRoutes from "./routes/adminRoutes.js"; 
import cron from 'node-cron';
import Order from './models/orders.js'; // Update path as needed
import Table from "./models/tables.js";
import Chefs from "./models/chefs.js";
import dotenv from "dotenv";
import chefs from "./models/chefs.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api', customerRoutes);
app.use('/api/admin', adminRoutes);

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};
connectDB();

cron.schedule('*/1 * * * *', async () => {
  console.log("Running cron...");

  try {
    // 1. Update PREPARING orders to ORDER_DONE or NOT_PICKED_UP
    const orders = await Order.find({ status: 'PREPARING' });
    const now = new Date();

    for (let i = 0; i < orders.length; i++) {
      const order = orders[i];
      const createdAt = new Date(order.createdAt);
      const totalTime = order.totalTime || 0;
      const readyTime = new Date(createdAt.getTime() + totalTime * 60000);

      if (now >= readyTime) {
        if (order.orderType === 'DINE_IN') {
          order.status = 'ORDER_DONE';
        } else if (order.orderType === 'TAKEAWAY') {
          order.status = 'NOT_PICKED_UP';
        }
        await order.save();
        console.log(`Order ${order._id} updated to ${order.status}`);
      }
    }

    // 2. Free up tables that point to completed orders
    const tables = await Table.find({ isOccupied: true, currentOrderId: { $ne: null } });

    for (let j = 0; j < tables.length; j++) {
      const table = tables[j];
      const order = await Order.findById(table.currentOrderId);

      if (order && (order.status === 'ORDER_DONE' || order.status === 'PICKED_UP')) {
        table.isOccupied = false;
        table.currentOrderId = null;
        await table.save();
        console.log(`Table ${table._id} freed`);
      }
    }

    // 3. Update chef's assignorders & time if assigned orders are done
    const chefs = await Chefs.find({});

    for (let i = 0; i < chefs.length; i++) {
    const chef = chefs[i];
    let updated = false;

    for (let j = chef.assignorders.length - 1; j >= 0; j--) {
        const orderId = chef.assignorders[j];
        const order = await Order.findById(orderId);

        if (order && (order.status === 'ORDER_DONE' || order.status === 'PICKED_UP')) {
        chef.assignorders.splice(j, 1); // remove the completed order
        chef.time -= order.totalTime || 0;
        updated = true;
        }
    }

    if (updated) {
        if (chef.time < 0) chef.time = 0;
        await chef.save();
        console.log(`Chef ${chef.name} updated`);
    }
    }

  } catch (err) {
    console.error("Cron job error:", err);
  }
});  

app.listen(port, () => {
    console.log(`Server is running on port ${port}`); 
});
app.get("/", (req, res) => {
    res.send("Hello World!");
});