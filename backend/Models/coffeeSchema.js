import mongoose from 'mongoose';

const coffeeSchema = new mongoose.Schema({
    brand_name:{type: String, required:true},
    category:{type: String, required:true},
    image: String,
    price: {type: Number, required:true},
    description: {type: String, required:true},
    _Grammage: {type: String},
    _Addons: {type: String},
    _ProductionWhere:{type: String},
    roast:[{
        
        roastName:{type:String, required:true},
        inStock:{type: Number, required:true, validate:{
            validator: Number.isInteger,
            message: '{VALUE} is not an integer.'
        }},
    }],
})

export default mongoose.model("Coffee", coffeeSchema);