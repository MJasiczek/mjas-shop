import express from 'express';
import expressAsyncHandler from 'express-async-handler'

import contactSchema from '../Models/contactSchema.js';
import userSchema from '../Models/userSchema.js';
import nodemailer from 'nodemailer'

import dotenv from 'dotenv';
import newsletterSchema from '../Models/newsletterSchema.js';

dotenv.config();

export const getAllContactMessages = expressAsyncHandler(async (req, res) => {

    const messagesArray =  await contactSchema.find({});
    res.send({ messagesArray})
})
export const sendContactMessage = expressAsyncHandler(async (req, res) => {
    const newMessage = new contactSchema({
        email:req.body.email,
        topic:req.body.topic,
        message: req.body.message,
        responded: false
    });
    const createdMessage = await newMessage.save();
   
    res.send({ message: 'Sent'}) 

})

export const adminSendContactMessages = expressAsyncHandler(async (req, res) => {
    

})

export const deleteMessages = expressAsyncHandler(async (req, res) => {
   
    const user = await userSchema.findById(req.query.foo);

    const messageToDelete = await contactSchema.findById(req.params.id);
    if (messageToDelete) {
      const deleteMessage = await messageToDelete.remove();
      
      res.send({ message: 'Message Deleted'});
    } else {
      res.status(404).send({ message: 'Message not found' });
    }
   

})

export const getMessageWindow = expressAsyncHandler(async (req, res) => {

    const showDetailedMessage = await contactSchema.findById(req.params.id);
    if(showDetailedMessage){
        res.send(showDetailedMessage);
    } else{
        res.status(404).send({message: "Error, couldn't find message"})
    }
})

export const sendRespondMessage = expressAsyncHandler(async(req,res)=>{
   
   
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
        to:req.body.email,
        subject: `RESPONSE:${req.body.topic}`,
        text: req.body.yourRespond
    }

    transporter.sendMail(mailOptions,function(data,err){
        if(err){
          
           console.log(`Error: ${err.message} }}}} ${err}`)
        }else{
          
           console.log('sent')
        }
    })
    const contactMessage = await contactSchema.findById(req.body.id);
    contactMessage.responded = true;
    const save = await contactMessage.save();
})

