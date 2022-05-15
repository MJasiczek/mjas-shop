import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userOrders: [
        {
            
            brand_name:{type:String, required:true},
            pID:{type:String, required:true},
            quantity:{type:Number, required:true}, 
            price:{type:Number, required:true},
            roast:{type:String, required:true},
            id:{type: mongoose.Schema.Types.ObjectId,
                ref:'Coffee',
            required:true},
        }
    ],
    shippingInfo:{
      yourName: { type: String, required: true },
      yourAddress: { type: String, required: true },
      yourCity: { type: String, required: true },
      yourPostCode: { type: String, required: true },
      yourCountry: { type: String, required: true },
      yourDelivery:{type: String, required: true},
      lat: Number,
      lng: Number,
    },
    paymentData:{type: String, required:true},
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    user_email: {type: String, required:true},
    itemsP: { type: Number, required: true },
    shippingP: { type: Number, required: true },
    fullP: { type: Number, required: true },
    /*paymentInfo:{
        id:String,
         status: String,
        update_time:String,
         email_address:String
    },*/
    Paid: { type: Boolean, default: false },
    TakenBack: { type: Boolean, default: false },
    paidDate: { type: Date },
    takenBackdDate: { type: Date },
}, {
    timestamps: true,
  });

  const Order = mongoose.model('Order', orderSchema);
export default Order;