import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    email:{type: String, required:true},
    topic:{type:String, required:true},
    message: {type:String, required:true},
    responded: {type:Boolean, required:true}
}, {
    timestamps: true,
  })

export default mongoose.model("Contact", contactSchema);
