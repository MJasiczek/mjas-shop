import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    username: {type: String, required:true},
    password: {type: String, required:true},
    email:{type:String, required:true, unique:true},
    newsletter:{type:Boolean, required:true},
    Admin:{type:Boolean, default: false, required:true},
    personalInfo:{
        yourName: {type:String, default:""},
        yourAddress:{type:String, default:""} ,
        yourCity:  {type:String, default:""} ,
        yourPostCode:  {type:String, default:""},
        yourCountry: {type:String, default:""} ,
        yourDelivery: {type:String, default:""},
        lat: Number,
        lng: Number
        
    }
},{
    timestamps:true
})

export default mongoose.model("User", userSchema);
