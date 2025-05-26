import Menu from "../models/menuItem.js";
import Order from "../models/orders.js";
import Tables from "../models/tables.js";


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
