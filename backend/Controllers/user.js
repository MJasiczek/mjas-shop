import bcrypt from 'bcryptjs';
import express from 'express'

import userSchema from '../Models/userSchema.js';
import expressAsyncHandler from 'express-async-handler'
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer'
import newsletterSchema from '../Models/newsletterSchema.js';
import coffeeSchema from '../Models/coffeeSchema.js';
import orderSchema from '../Models/orderSchema.js';
import contactSchema from '../Models/contactSchema.js';




export const userLogin = async(req,res)=>{
    const { email, password} = req.body;
    
    try{
        const existingUser = await userSchema.findOne({email:email});

        if(!existingUser){
            return res.status(404).json({message:"Invalid password/email"}) //user doesn't exist
        }

        const isPasswordCorrect = await bcrypt.compare(password,existingUser.password);
        if(!isPasswordCorrect){
            
            return res.status(404).json({message: "Invalid password/email"})
            
        }
       
        
        const token = jwt.sign({username:existingUser.username, id:existingUser._id, email:existingUser.email, Admin:existingUser.Admin}, 'secret', {expiresIn:"5h"})
        res.status(200).json({result:existingUser, token})
    }catch(error){
        
        res.status(500).json({message:'Something went wrong'})
    }
}

export const userRegister = async(req,res)=>{
    const {username, email, password} = req.body;

    try {
        const user = await userSchema.findOne({email:email});

        if(user){
            return res.status(400).json({message:"User already exist"});
        }
        
            const hashedPassword = await bcrypt.hash(password, 12);
            const result = await userSchema.create({email:email, password: hashedPassword, username:username, newsletter:'true'});
            const addToNewsletter = await newsletterSchema.create({email: email})
    
           //const log = await logsSchema.create({user:email, action:`${email} registered under username: ${name}`});
           /*const newLog = new logsSchema({
            user:result._id,
            action:`${result.email} registered nad sign in under username: ${result.name}`,
            Admin: result.Admin? true : false
        })
        const log = await newLog.save();*/
            const token = jwt.sign({email:result.email, id:result._id, username:result.username, admin:false}, 'secret', {expiresIn:"1h"}) 
    
            res.status(200).json({result, token});
        

      
    } catch (error) {
        res.status(500).json({message:"Something went wrong"})
    }
}

/*export const personalInfo = expressAsyncHandler(async(req,res)=>{
    const {id} = req.body;
    
        const user = await userSchema.findById(id);
        if(user){
            user.personalInfo = { yourName: req.body.yourName,
            yourAddress: req.body.yourAddress,
            yourCity: req.body.yourCity,
            yourPostCode: req.body.yourPostCode,
            yourCountry: req.body.yourCountry,
            yourDelivery:req.body.yourDelivery};
     
    
        const updateUser = await user.save();
        const token = jwt.sign({name:updateUser.name, id:updateUser._id, email:updateUser.email, admin:updateUser.Admin}, 'secret', {expiresIn:"1h"})

        res.send({userPersonalInformation: updateUser})
        }else{
            res.status(500).json({message:"Something went wrong/ user update"})
        }
     
})*/
export const getAllUsers = expressAsyncHandler(async(req,res)=>{
  
        const allUsers = await userSchema.find({});
        res.send(allUsers);
   
})

export const userUpdateProfile = expressAsyncHandler(async (req, res) =>{
    const userToUpdate = await userSchema.findById(req.query.foo);
    if(userToUpdate){
        /*userToUpdate.name = req.body.username|| userToUpdate.name;
        userToUpdate.email = req.body.email || userToUpdate.email;*/
      
        userToUpdate.username = req.body.username;
        userToUpdate.email = req.body.email;
        if(req.body.password){
            userToUpdate.password = bcrypt.hashSync(req.body.password, 12);
        }
        if(req.body.newsletter == 'true'){
            userToUpdate.newsletter = true;
            const updateFroNewsletter = await newsletterSchema.find({email:userToUpdate.email});
            updateFroNewsletter.newsletter=true;
           // const userUpdated = await updateFroNewsletter.save();
            if(userToUpdate.newsletter){
                const addToNewsletter = await newsletterSchema.create({email: userToUpdate.email})

            }
        }
        else{
            userToUpdate.newsletter = false;
            const removeFromNewsletter = await newsletterSchema.find({email:userToUpdate.email}).remove();
           // const removeUserFromNewsletter = await removeFromNewsletter.remove();

        }
        const userUpdated = await userToUpdate.save();
        //const result = userUpdated;
       
        const token = jwt.sign({name:userUpdated.name, id:userUpdated._id, email:userUpdated.email, admin:userUpdated.Admin}, 'secret', {expiresIn:"1h"})
       
       
        res.status(202).json({result:userUpdated, token})
        /*res.send(result:{
            _id: userUpdated._id,
            name: userUpdated.name,
            email:userUpdated.email,
            isAdmin: userUpdated.isAdmin,
        },
        token:{

        }
        )*/
    }
})

    export const userUpdatePersonalInfo = expressAsyncHandler(async (req, res) =>{
        const userToUpdate = await userSchema.findById(req.query.foo);
        if(userToUpdate){
            userToUpdate.personalInfo.yourName = req.body.yourName || userToUpdate.personalInfo.yourName ;
            userToUpdate.personalInfo.yourAddress = req.body.yourAddress|| userToUpdate.personalInfo.yourAddress;
            userToUpdate.personalInfo.yourCity = req.body.yourCity || userToUpdate.personalInfo.yourCity
            userToUpdate.personalInfo.yourPostCode = req.body.yourPostCode || userToUpdate.personalInfo.yourPostCode;
            userToUpdate.personalInfo.yourCountry = req.body.yourCountry || userToUpdate.personalInfo.yourCountry
            userToUpdate.personalInfo.yourDelivery = req.body.yourDelivery ||  userToUpdate.personalInfo.yourDelivery
         
            const userUpdated = await userToUpdate.save();
           
            const token = jwt.sign({name:userUpdated.name, id:userUpdated._id, email:userUpdated.email, admin:userUpdated.Admin}, 'secret', {expiresIn:"1h"})
            res.status(202).json({result:userUpdated, token})
            //res.send({profile:userUpdated, token})


        }
})

export const deleteUser = expressAsyncHandler(async(req,res)=>{
    const userToDelete = await userSchema.findById(req.params.id);
    if (userToDelete ) {
      const deleteUser = await userToDelete.remove();
      res.send({ user: deleteUser  });
    } else {
      res.status(404).send({ message: 'USER Not Found' });
    }
})

export const sendNewsletter = expressAsyncHandler(async(req,res)=>{
    const allUsersInNewsletter = await newsletterSchema.find({});
    const allUsersEmail=[];
    //const allUsersEmail;
    /*allUsersInNewsletter.forEach(e=>allUsersEmail.push(e.email));
    const usersInNewsletterToSend = allUsersEmail.join(',');*/
    allUsersInNewsletter.forEach(e=>{
        let transporter = nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'xx',
                pass:'xx'
            },
            tls:{
                rejectUnauthorized: false
            }
        })
        let mailOptions = {
            from:'Shoply',
            to:e.email,
            subject: `${req.body.yourTopic}`,
            text: req.body.yourRespond
        }
    
        transporter.sendMail(mailOptions,function(data,err){
            if(err){
               // res.status(404).send({ message: `Error: ${err}` });
               console.log(`Error: ${err.message} }}}} ${err}`)
            }else{
               //res.status(202).send({message:'sent', data:data})
               console.log('sent')
            }
        })
    })
    
    /*let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'shoplytest007@gmail.com',
            pass:'12x$OP7Y..#'
        },
        tls:{
            rejectUnauthorized: false
        }
    })
    let mailOptions = {
        from:'shoplytest007@gmail.com',
        to:usersInNewsletterToSend,
        subject: `${req.body.yourTopic}`,
        text: req.body.yourRespond
    }

    transporter.sendMail(mailOptions,function(data,err){
        if(err){
           // res.status(404).send({ message: `Error: ${err}` });
           console.log(`Error: ${err.message} }}}} ${err}`)
        }else{
           //res.status(202).send({message:'sent', data:data})
           console.log('sent')
        }
    })*/
    const idUser = req.query.foo;
    const user = await userSchema.findById({idUser})
   
})

export const adminSearch = expressAsyncHandler(async(req,res)=>{

    if(req.query.where == 'coffees'){
        const brand_name = req.query.brand_name || '';
    

        const filterName = {brand_name:{$regex: brand_name , $options:'i'}};
       
        const coffees = await coffeeSchema.find({...filterName});
        res.json({ coffees:coffees });
    }
    if(req.query.where == 'orders'){
        const email = req.query.email;
        const orders = await orderSchema.find({user_email:email})
        res.json({ data:orders });
      

    }
    if(req.query.where =='users'){
        const email = req.query.email || '';
        
        //const filterName = {name:{$regex: name , $options:'i'}};
        //const filterEmail = {email:{$regex: email , $options:'i'}};

        const users = await userSchema.find({email:email});
        res.json({data:users})
    }
    if(req.query.where=='contact'){
        const email = req.query.email;
        const messagesArray = await contactSchema.find({email:email});
        res.json({messagesArray})
    }
  
     

    
/*
    //const filterName = name? {name: {$regex:name, $options:'i'}}:{};
    if(name){
        const filterName = {name: {$regex:name, $options:'i'}};
    }
    if(id){
        const filterID = id;
    }
    

    const coffees = await coffeeSchema.find({...filterName, ...filterID})
    
    res.json({ coffees:coffees });*/
})