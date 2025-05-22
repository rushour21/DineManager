import mongoose from "mongoose";

const menuItem = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    imageUrl: {
        type: String,
    },
    isAvailable: {
        type: Boolean,
        default: true
        
    },
    requiredTime: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})
export default mongoose.model('MenuItem', menuItem)