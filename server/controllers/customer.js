import Menu from "../models/menuItem.js";
import Order from "../models/orders.js";
import Customers from "../models/customers.js";
import Tables from "../models/tables.js";

export const getmenu = async (req, res) =>{
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        
    }
};

export const savemenu =  async (req, res) =>{
    const { name, category, price, imageUrl, requiredTime } = req.body;

    try {
        const newMenuItem = new Menu({
            name,
            category,
            price,
            imageUrl,
            requiredTime
        });
        await newMenuItem.save();
        res.status(201).json(newMenuItem);
    } catch (error) {
        res.status(500).json({ message: "Error saving menu item" });
    }
};
export const getOrders = async (req, res) => {
    try {
        // Get today's date starting at midnight
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        // Find orders created today
        const orders = await Order.find({ createdAt: { $gte: today } });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders" });
    }
};
export const saveOrder = async (req, res) => {
  const { customerName, mobile, items, orderType, totalAmount, taxes, deliveryCharge, grandTotal, deliveryAddress } = req.body;

  try {
    // Step 1: Create or find customer
    let customer = await Customers.findOne({ mobile });
    if (!customer) {
      customer = new Customers({ name: customerName, mobile });
      await customer.save();
    }

    // Step 2: Auto-assign table if orderType is DINE_IN
    let tableId = null;
    if (orderType === "DINE_IN") {
      const availableTable = await Tables.findOne({ currentOrderId: null });
      if (!availableTable) {
        return res.status(400).json({ message: "No available tables" });
      }
      tableId = availableTable._id;
    }

    // Step 3: Save order with assigned table
    const newOrder = new Order({
      customerId: customer._id,
      tableId,
      items,
      orderType,
      totalAmount,
      taxes,
      deliveryCharge,
      deliveryAddress,
      grandTotal,
    });

    await newOrder.save();

    // Step 4: If table assigned, update it with order ID
    if (tableId) {
      await Tables.findByIdAndUpdate(tableId, { currentOrderId: newOrder._id, isOccupied: true });
    }

    res.status(201).json({
      message: "Order placed successfully",
      order: newOrder,
      tableId: tableId || null,
    });
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Error saving order" });
  }
};


