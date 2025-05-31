import mongoose from "mongoose";
import orders from "./orders.js";

const table = new mongoose.Schema({
  isOccupied: {
    type: Boolean,
    default: false
  }, 
  chairNumber: {
    type: String,
    required: true,
  },
  currentOrderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
    default: null
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});
export default mongoose.model('Tables', table)