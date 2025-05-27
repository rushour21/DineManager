import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true
    },
    assignorders: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order"
    }],
    time:{
        type: Number,
        default: 0
    }
})
export default mongoose.model('Chefs', chefSchema)