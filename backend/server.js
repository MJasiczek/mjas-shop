import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser';
import cors from 'cors'
import router from './Routes/userRouter.js';
import router_o from './Routes/ordersRouter.js';
import Stripe from 'stripe';
import router_c from './Routes/coffeeRouter.js';



const app = express();
const PORT = process.env.PORT || 5000;
const stripe = new Stripe('xxx')
mongoose.connect('xxx', {
   
    useNewUrlParser:true,
    useUnifiedTopology:true
})

//middleware
app.use(express.json({limit:'50mb'}));
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json({limit:'50mb', extended:true}));
//Routes
app.get('/',(req,res)=>{
    res.send('Server is running')
});


app.use('/stripe/payment/config', async(req,res)=>{
    console.log('Request', req.body);
    var error, status;

    try {
        const {order, token} = req.body;
        const customer = await stripe.customers.create({
            email: token.email,
            source: token.id
        })
        const charge = await stripe.charges.create({
            amount: Math.round(order.fullP*100), 
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `Purchased ${order._id}`,
            shipping:{
                name:token.card.name,
                address:{
                    line1: token.card.address_line1,
                    line2: token.card.address_line2,
                    postal_code: token.card.postCode,
                    city: token.card.address_city,
                    country: token.card.address_country


                }
            }
        })
        console.log("Charge:", {charge})
        status='Success';

    } catch (error) {
        console.log("Errorr:", {error})
        status='Fail';

    }
    res.json({error, status})
})

app.use('/signin', router)
app.use('/signup', router)
app.use('/users', router);
app.use('/coffees', router_c)
app.use('/order', router_o);
app.use((error,req,res,next)=>{
    res.status(500).send({message:error.message})
})
app.listen(PORT, ()=> console.log(`Kozak, Server running on PORT: ${PORT}`));

