import express from 'express';
import expressAsyncHandler from 'express-async-handler'


import orderSchema from '../Models/orderSchema.js'
import coffeeSchema from '../Models/coffeeSchema.js';
import userSchema from '../Models/userSchema.js';
import pdf from 'html-pdf';
import { fv } from '../Middleware/fv.js';
import nodemailer from 'nodemailer'
import path from 'path'
export const sendOrder = expressAsyncHandler(async (req, res) => {
   if (req.body.userOrders.length === 0) {
     return res.status(400).send({ message: 'Your cart is empty' });
    } 

    else {
      const order = new orderSchema({
        user: req.body.user,
        user_email: req.body.email,
        userOrders: req.body.userOrders,
        shippingInfo: req.body.shippingInfo,
        paymentData: req.body.paymentData,
        itemsP: req.body.itemsP,
        shippingP: req.body.shippingP,
        fullP: req.body.fullP,
      });
     
        const createdOrder = await order.save();
        const givingOrderUser = await userSchema.findById(req.body.user);
       
      
  
      for (const i in createdOrder.userOrders) {
        const eachOrder = createdOrder.userOrders[i];
        const coffee = await coffeeSchema.findOne({_id:`${eachOrder.id}`}).exec();
       
        for(const y in coffee.roast){
          const eachroast = coffee.roast[y];
          if(eachroast._id ==eachOrder.pID){
            if(eachroast.inStock<=0){
              const deleteOrder =  await createdOrder.remove();

              return res.status(404).send({message:`Sorry but your order: ${coffee.name} roast: ${eachroast.roastName} is already out!`})
            }else{
              eachroast.inStock -= eachOrder.quantity;
              await coffee.save();
            }
           
          }
        }
       
      }
  
         
         
         return res
          .status(201)
          .send({ message: 'New Order Created', order: createdOrder });
      }
     

})

  export const getOrders = expressAsyncHandler(async(req,res)=>{
        
        const getOrder = await orderSchema.findById(req.params.id);
    if (getOrder) {
      res.send(getOrder); //order
    } else {
      res.status(404).send({ message: 'Couldnt find order' });
    }
  })
 export const sendRecipt = expressAsyncHandler(async(req,res)=>{
   const __dirname = path.resolve();
  const order  = await orderSchema.findById(req.query.foo)
  const user = await userSchema.findById(order.user)
   let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'xxx',
        pass:'xxx'
    },
    tls:{
        rejectUnauthorized: false
    }
})

let mailOptions = {
  from:'xxx',
  to:`${user.email}, xxx`,
  subject: `FV for order ID :${order._id}`,
  html:fv(order),
  attachments:[{
    filename:'FV.pdf',
    path:`${__dirname}/FV.pdf`,
    contentType:'application/pdf'
  }]
}
transporter.sendMail(mailOptions,function(data,err){
if(err){
   
   console.log(`Error: ${err.message} }}}} ${err}`)
}else{
  
   console.log('sent')
}
})

 })
  export const payOrder = expressAsyncHandler(async(req,res)=>{
    const __dirname = path.resolve();
    const id = req.params.id;
    const orderToBePaid = await orderSchema.findById(id);
    if(orderToBePaid){
      orderToBePaid.Paid = true;
      orderToBePaid.paidDate = Date.now();
      orderToBePaid.paymentInfo = {id:req.body.id, status: req.body.status, update_time:req.body.update_time, email_address:req.body.email_address}
    
    const paidOrder = await orderToBePaid.save();
    const payingUser = await userSchema.findById(req.body.userData)
    
    pdf.create(fv(orderToBePaid),{}).toFile('FV.pdf', (err)=>{
      if(err){
      
       return  res.send( Promise.reject());
      }
     
     return res.send(Promise.resolve());
    })
   
  
    }else{
      res.status(404).send({message:'Something went wrong'})
    }
  })
  
  
  export const userOrderList = expressAsyncHandler(async (req, res) => {
    
    const orders = await orderSchema.find({ user: req.query.foo});
   console.log(req.user)
    res.send(orders);
  })

  export const getAllOrders = expressAsyncHandler(async(req,res)=>{
      const allOrders = await orderSchema.find({});
     
      res.send(allOrders)

  })

  export const deleteOrder = expressAsyncHandler(async(req,res)=>{
    const orderToDelete = await orderSchema.findById(req.params.id);
    if (orderToDelete ) {
      const deleteOrder = await orderToDelete.remove();

      const user = await userSchema.findById(req.query.foo)
      
     
      res.send({ coffee: deleteOrder });
    } else {
      res.status(404).send({ message: 'coffee Not Found' });
    }
  })
  export const takeBackOrder = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const orderToBeTakenBack= await orderSchema.findById(id);
    if(orderToBeTakenBack){
      orderToBeTakenBack.TakenBack = true;
      orderToBeTakenBack.takenBackdDate = Date.now();
    
    const orderBackOrder = await orderToBeTakenBack.save();
   
      for (const i in orderBackOrder.userOrders) {
        const eachOrder = orderBackOrder.userOrders[i];
        const coffee = await coffeeSchema.findOne({_id:`${eachOrder.id}`}).exec();
       
        for(const y in coffee.roast){
          const eachroast = coffee.roast[y];
          if(eachroast._id ==eachOrder.pID){
           
              eachroast.inStock += eachOrder.quantity;
              await coffee.save();
            
           
          }
        }
       
      }

      res.send({order: orderToBeTakenBack})
      }else{
        res.status(404).send({message:'Something went wrong'})
    }
  })