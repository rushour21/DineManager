import Menu from "../models/menuItem.js";
import Order from "../models/orders.js";
import Tables from "../models/tables.js";
import Customers from '../models/customers.js'
import Chefs from "../models/chefs.js"


export const getTables = async (req, res) => {
    try {
        const tables = await Tables.find();
        res.status(200).json(tables);
    } catch (error) {
        res.status(500).json({ message: "Error fetching tables" });
    }
}


export const saveTables = async (req, res) => {
    const { chairNumber } = req.body;
    try {
        const newTable = new Tables({ chairNumber });
        await newTable.save();
        res.status(201).json(newTable);
        console.log("Table saved successfully:", newTable);
    } catch (error) {
        console.error("Error saving table:", error); // This shows the REAL cause
        res.status(500).json({ message: "Error saving table", error: error.message });
    }
};

export const deleteTable = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTable = await Tables.findByIdAndDelete(id);
        if (!deletedTable) {
            return res.status(404).json({ message: "Table not found" });
        }
        res.status(200).json({ message: "Table deleted successfully" });
    } catch (error) {
        console.error("Error deleting table:", error);
        res.status(500).json({ message: "Error deleting table", error: error.message });
    }
};

export const getdashcontent = async (req, res) => {
    try {
        const customers = await Customers.find();
        const orders = await Order.find();
        const chefs = await Chefs.find();

        const totalAmount = orders.reduce((sum, order) => sum + order.grandTotal, 0);

        res.status(200).json({
            totalCustomers: customers.length,
            totalOrders: orders.length,
            totalChefs: chefs,
            totalRevenue: Math.floor(totalAmount) // Round to two decimal places
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Error fetching dashboard content" });
    }
};

export const getOrderline = async (req, res) => {
  try {
    const orders = await Order.find().populate('tableId');

    if (!orders || orders.length === 0) {
      return res.status(404).json({ message: "No orders found" });
    }

    console.log("Fetched orders:", orders);

    const tableIds = orders
      .filter(order => order.tableId && order.tableId._id)
      .map(order => order.tableId._id.toString());

    const uniqueTableIds = [...new Set(tableIds)];

    const tableNumberMap = {};
    uniqueTableIds.forEach((id, index) => {
      tableNumberMap[id] = index + 1;
    });

    const enrichedOrders = orders.map(order => ({
      ...order._doc,
      tableNumber: order.tableId ? tableNumberMap[order.tableId._id.toString()] : null,
    }));

    res.status(200).json(enrichedOrders);
  } catch (error) {
    console.error("Error fetching order line:", error); // <== This will help debug the real issue
    res.status(500).json({ message: "Error fetching order line", error: error.message });
  }
};

export const updateStatus = async (req, res) => {
  const { id } = req.params;
  console.log(id)
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status: 'PICKED_UP' },
      { new: true }
    );
    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(updatedOrder);
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({ message: 'Server error' });
  }
};




