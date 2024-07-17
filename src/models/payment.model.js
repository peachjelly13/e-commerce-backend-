import mongoose from "mongoose";
//comprehensive details about payment transaction
const paymentSchema = new mongoose.Schema({
    //this result basically is telling you whether the result of my payment what 
    //is its status
    resultInfo:{
        resultStatus:{
            type:String,
            required:true
        },
        resultCode:{
            type:String,
            required:true
        },
        resultMsg:{
            type:String,
            required:true,
        },
    },
    //whenever you make a payment a transaction id is generated to keep track 
    transactionId:{
        type:String,
        required:true
    },
    //this is assciated with that particular bank
    bankTransactionId:{
        type:String,
        required:true
    },
    orderId:{
        type:String,
        required:true
    },
    transactionAmount:{
        type:String,
        required:true
    },
    transactionType:{
        type:String,
        required:true
    },
    //the payment Gateway that we used like paytm etc
    gatewayName:{
        type:String,
        required:true
    },
    bankName:{
        type:String,
        required:true
    },
    //what is a merchant id?
    //Let's assume you have an online store and you've set up an 
    //account with a payment processor like Stripe or PayPal. When you set up
    // your account, 
    //the payment processor assigns you a Merchant ID, let's say MID123456.
    merchantId:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    },
    refundAmount:{
        type:String,
        required:true
    },
    transactionDate:{
        type:Date,
        required:true
    },
    createdAt:{
        type:Date,
        defaulta:Date.now
    }
});

export const Payment = mongoose.model("Payment",paymentSchema)