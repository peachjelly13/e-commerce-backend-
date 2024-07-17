import mongoose from "mongoose";
//this is us describing our product think of it like you have a product 
//you go to your favourite ecommerce and see a product what all do you see
//you can actually go to amazon right now and check it
//i have made this product schema keeping in mind that 
const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim:true
    },
    description:{
        type:String,
        required:[true,"Please enter product description"],
    },
    highlights:[
        //highlights: ["High quality", "Durable", "Eco-friendly"]
        // it is an array of strings 
        {
            type:String,
            required:true
        }
    ],
    specifications:[{
        //array of objects
        //specifications: [
        //{ title: "Material", description: "100% Cotton" },
        //{ title: "Size", description: "Medium" },
        //{ title: "Color", description: "Blue" }]
        title:{
            type:String,
            required:true
        },
        description:{
            type:String,
            required:true
        }
    }],
    price:{
        type:Number,
        required:[true,"Please enter the price of the product"]
    },
    reducedPrice:{
        type:Number,
        required:[true,"Please enter the reduced price of the product"]
    },
    //for various security and effecient manegment and retrieval and deleyion purpose we
    //use both url and id for our image
    image:[
        {
            image_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    ],
    brand:{
        //here we have more objects inside the brand because we will only take
        //one such value hence there is no need of an array
        name:{
            type:String,
            required:true
        },
        logo:{
            logo_id:{
                type:String,
                required:true
            },
            url:{
                type:String,
                required:true
            }
        }
    },
    category:{
        type:String,
        required:[true,"Please enter product category"]
    },
    stock:{
        type:Number,
        required:[true,"Please enter the stock number"],
        minLength:[1,"Stock cannot be lesser than this"],
        default:1
    },
    warranty:{
        type:Number,
        default:1
    },
    ratings:{
        type:Number,
        default:0
    },
    numberOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
            user:{
                type:mongoose.Schema.ObjectId,
                ref:"User",
                required:true
            },
            name:{
                type:String,
                required:true
            },
            rating:{
                type:Number,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
        type:mongoose.Schema.ObjectId,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
});

export default Product = mongoose.model("Product",productSchema)
