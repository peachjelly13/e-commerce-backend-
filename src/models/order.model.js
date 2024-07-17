import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
    //this means only one value for this it is not an array so we do not expect multiple values
    shippingInfo:{
        address:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        state:{
            type:String,
            required:true
        },
        country:{
            type:String,
            required:true
        },
        pincode:{
            type:String,
            required:true
        },
        phoneNo:{
            type:String,
            required:true
        },
    },
    orderItems:[
        {
            name:{
                type:String,
                required:true
            },
            price:{
                type:Number,
                required:true
            },
            quantity:{
                type:Number,
                required:true
            },
            image:{
                type:String,
                required:true
            },
            

        }
    ]



})