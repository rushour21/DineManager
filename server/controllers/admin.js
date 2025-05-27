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
            totalChefs,
            totalRevenue: totalAmount
        });

    } catch (error) {
        console.error("Dashboard Error:", error);
        res.status(500).json({ message: "Error fetching dashboard content" });
    }
};
