import mongoose from "mongoose";

const table = new mongoose.Schema({
  tableNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1
  },
  isOccupied: {
    type: Boolean,
    default: false
  },
  chairNumber: {
    type: Number,
    required: true,
    min: 3
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