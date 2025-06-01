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

export const getRevenue = async (req, res) => {
  try {
    const timeframe = req.params.timeframe.toLowerCase();
    
    let matchCondition = {};
    let groupBy = {};
    let labels = [];
    
    const now = new Date();
    
    switch (timeframe) {
      case 'daily':
        // Last 7 days
        const startOfWeek = new Date(now);
        startOfWeek.setDate(now.getDate() - 6);
        startOfWeek.setHours(0, 0, 0, 0);
        
        matchCondition = {
          createdAt: { $gte: startOfWeek }
        };
        
        groupBy = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' },
          day: { $dayOfMonth: '$createdAt' }
        };
        
        // Generate last 7 days labels
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(now.getDate() - i);
          const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
          labels.push({
            label: dayNames[date.getDay()],
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()
          });
        }
        break;
        
      case 'weekly':
        // Last 7 weeks
        const startOfWeeks = new Date(now);
        startOfWeeks.setDate(now.getDate() - (7 * 7)); // 49 days back (7 weeks)
        startOfWeeks.setHours(0, 0, 0, 0);
        
        matchCondition = {
          createdAt: { $gte: startOfWeeks }
        };
        
        groupBy = {
          year: { $year: '$createdAt' },
          week: { $week: '$createdAt' }
        };
        
        // Generate last 7 weeks labels
        for (let i = 6; i >= 0; i--) {
          const weekDate = new Date(now);
          weekDate.setDate(now.getDate() - (i * 7));
          
          // Get the week number for this date
          const startOfYear = new Date(weekDate.getFullYear(), 0, 1);
          const pastDaysOfYear = (weekDate - startOfYear) / 86400000;
          const weekNumber = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
          
          labels.push({
            label: `W${weekNumber}`,
            year: weekDate.getFullYear(),
            week: weekNumber
          });
        }
        break;
        
      case 'monthly':
        // Last 7 months
        const startOfMonths = new Date(now);
        startOfMonths.setMonth(now.getMonth() - 6);
        startOfMonths.setDate(1);
        
        matchCondition = {
          createdAt: { $gte: startOfMonths }
        };
        
        groupBy = {
          year: { $year: '$createdAt' },
          month: { $month: '$createdAt' }
        };
        
        // Generate last 7 months labels
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                           'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        for (let i = 6; i >= 0; i--) {
          const date = new Date(now);
          date.setMonth(now.getMonth() - i);
          labels.push({
            label: monthNames[date.getMonth()],
            year: date.getFullYear(),
            month: date.getMonth() + 1
          });
        }
        break;
        
      case 'yearly':
        // Last 7 years
        const startOfYears = new Date(now);
        startOfYears.setFullYear(now.getFullYear() - 6);
        startOfYears.setMonth(0, 1);
        
        matchCondition = {
          createdAt: { $gte: startOfYears }
        };
        
        groupBy = {
          year: { $year: '$createdAt' }
        };
        
        // Generate last 7 years labels
        for (let i = 6; i >= 0; i--) {
          const year = now.getFullYear() - i;
          labels.push({
            label: year.toString(),
            year: year
          });
        }
        break;
        
      default:
        return res.status(400).json({ error: 'Invalid timeframe. Use daily, weekly, monthly, or yearly.' });
    }

    // Aggregate revenue data
    const revenueData = await Order.aggregate([
      { $match: matchCondition },
      {
        $group: {
          _id: groupBy,
          value: { $sum: '$grandTotal' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Create a map for quick lookup of actual data
    const dataMap = new Map();
    revenueData.forEach(entry => {
      let key;
      switch (timeframe) {
        case 'daily':
          key = `${entry._id.year}-${entry._id.month}-${entry._id.day}`;
          break;
        case 'weekly':
          key = `${entry._id.year}-${entry._id.week}`;
          break;
        case 'monthly':
          key = `${entry._id.year}-${entry._id.month}`;
          break;
        case 'yearly':
          key = `${entry._id.year}`;
          break;
      }
      dataMap.set(key, entry.value);
    });

    // Find the maximum value to normalize bar heights
    const allValues = labels.map(labelObj => {
      let key;
      switch (timeframe) {
        case 'daily':
          key = `${labelObj.year}-${labelObj.month}-${labelObj.day}`;
          break;
        case 'weekly':
          key = `${labelObj.year}-${labelObj.week}`;
          break;
        case 'monthly':
          key = `${labelObj.year}-${labelObj.month}`;
          break;
        case 'yearly':
          key = `${labelObj.year}`;
          break;
      }
      return dataMap.get(key) || 0;
    });
    
    const maxValue = Math.max(...allValues, 1); // Ensure we don't divide by 0

    // Build response with all 7 periods, filling in zeros where no data exists
    const formatted = labels.map(labelObj => {
      let key;
      switch (timeframe) {
        case 'daily':
          key = `${labelObj.year}-${labelObj.month}-${labelObj.day}`;
          break;
        case 'weekly':
          key = `${labelObj.year}-${labelObj.week}`;
          break;
        case 'monthly':
          key = `${labelObj.year}-${labelObj.month}`;
          break;
        case 'yearly':
          key = `${labelObj.year}`;
          break;
      }
      
      const value = dataMap.get(key) || 0;
      
      return {
        day: labelObj.label,
        value: parseFloat(value.toFixed(2)), // Actual revenue value
        barValue: maxValue // All bars use the same max value for full height
      };
    });

    res.status(200).json(formatted);
    
  } catch (error) {
    console.error('Revenue calculation error:', error);
    res.status(500).json({ error: 'Server error while fetching revenue data.' });
  }
};

export const getOrderSummary = async (req, res) => {
  try {
    const { timeframe } = req.params;

    // Set time filter
    let startDate = new Date();
    switch ((timeframe || 'daily').toLowerCase()) {
      case 'weekly':
        startDate.setDate(startDate.getDate() - 7);
        break;
      case 'monthly':
        startDate.setMonth(startDate.getMonth() - 1);
        break;
      case 'yearly':
        startDate.setFullYear(startDate.getFullYear() - 1);
        break;
      default: // daily
        startDate.setHours(0, 0, 0, 0);
        break;
    }

    const match = {
      createdAt: { $gte: startDate }
    };

    const orders = await Order.find(match);

    const served = orders.filter(order => order.status === 'ORDER_DONE' || order.status === 'PICKED_UP');
    const dineIn = orders.filter(order => order.orderType === 'DINE_IN');
    const takeAway = orders.filter(order => order.orderType === 'TAKEAWAY');

    const total = orders.length;
    const servedCount = served.length;
    const dineInCount = dineIn.length;
    const takeAwayCount = takeAway.length;

    const toPercent = (count) => total === 0 ? 0 : Math.round((count / total) * 100);

    const response = {
      totalOrders: total,
      served: servedCount,
      dineIn: dineInCount,
      takeAway: takeAwayCount,
      percentages: {
        served: toPercent(servedCount),
        dineIn: toPercent(dineInCount),
        takeAway: toPercent(takeAwayCount)
      }
    };

    res.status(200).json({ success: true, data: response });

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};




