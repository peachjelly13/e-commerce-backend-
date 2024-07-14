import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcrypt"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import { timeStamp } from "console";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter Your Name"]
    },
    email:{
        type:String,
        required:[true,"Entering Email Is Necessary"],
        unique:true
    },
    gender:{
        type:String,
        required:[true,"Please Enter Gender"],
        enum:["F","M","O"]
    },
    password:{
        type:String,
        required:true,
        minLength:[8,"Length of Password Should Be Minimum 8 Characters"],
        select:false
    },
    avatar:{
        public_id:{
            type:String
        },
        url:{
            type:String
        }
    },
    role:{
        type:String,
        default:"User"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    //This field is used to store a unique token that is generated when a user 
    //requests a password reset.
    //this could be sent to the email to verify the user before changing their password
    resetPasswordToken: String,
    //this is for how long my token will be valid
    resetPasswordExpire: Date,
},{
    timestamps:true
});

//if the password has been changed then we would want to hash it again 
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password,10)
    next();
});

//--ACCESS-TOKEN--//

// Including username in the JWT payload can reduce the need for subsequent 
//database queries to retrieve user details when a user's 
//identity or representation is needed during authentication or authorization
userSchema.methods.generateAcessToken = function(){
    //inserting the payload
    return jwt.sign({
        _id:this._id,
        email:this.email,
        name:this.name
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
    expiresIn:process.env.ACCESS_TOKEN_EXPIRY
    }
)}
//above is a function when used on an object it is called a method , this.email will
//give the email of that particular  created instance of object

//--REFRESH TOKEN--//

// Limiting the information in refresh tokens reduces the impact 
//of a potential security breach. If a refresh token is leaked or compromised, 
//having minimal information minimizes the risk of exposing sensitive user details.
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({
        _id:this._id
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
        expiresIn:process.env.REFRESH_TOKEN_EXPIRY
    }
)
}

//--CHECK PASSWORD CORRECT OR NOT--//

userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password,this.password)
}

//--RESET-PASSWORD-TOKEN--//
//this is the token we will be sending the user when they want to reset or change their password 
userSchema.methods.resetPasswordToken = async function(){
    //resetToken is the in the end this link would be clicked opening to our website
    //and this would allow the user to reset their password 
    //the main part here is the reset token
    //https://example.com/reset-password?token=abc123def456ghi789jkl012mno345pqr678stu901
    const resetToken = crypto.randomBytes(20).toString("hex");
    //using hex is :
    //It's a common practice in token generation to use hex strings because they 
    //strike a good balance between length and complexity.
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpire = Date.now() + 15*60*1000;
    return resetToken
}
//--EXPORTING THE MODEL--//
export const User = mongoose.model("User",userSchema)