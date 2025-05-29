import mongoose from "mongoose";

const order = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tableId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tables',
    default: null // Only required for DINE_IN orders
  },
  items: [
    {
      itemId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
      },
      itemName: {
        type: String,
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      },
      instructions: {
        type: String,
        default: ''
      }
    }
  ],
  orderType: {
    type: String,
    enum: ['DINE_IN', 'TAKEAWAY'],
    required: true
  },
  status: {
    type: String,
    enum: ['PREPARING', 'READY', 'SERVED', 'COMPLETED'],
    default: 'PREPARING'
  },
  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },
  totalTime:{
    type: Number,
  },
  taxes: {
    type: Number,
    required: true,
    min: 0
  },
  deliveryCharge: {
    type: Number,
    default: 0,
    min: 0
  },
  deliveryAddress: {
    type: String,
    default: ''
  },
  grandTotal: {
    type: Number,
    required: true,
    min: 0
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields
});

export default mongoose.model('Orders', order)