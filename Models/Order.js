const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema(
    {
       userId:{
        type: String,
        required: true,
    },
    productId:{
        type: String,
        required: true,
    },
    productCode:{
        type: String,
        required: true,
    },
    razorpayId:{
        type: String,
        required: true,
    },
    userNumber:{
        type: String,
        required: true,
    },
    userAddress:{
        type: String,
        required: true,
    },
    productAmount:{
        type: Number,
        required: true,
    },
    instruction:{
        type: String,
    },
    name:{
        type: String,
        required: true,
    },
    image:[],
    areaCode:{
        type: Number,
        required: true,
    },
    timestamp:{
        type:String,
    }
    },
    
)

module.exports = mongoose.model("Order", orderSchema);