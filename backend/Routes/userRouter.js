import express from 'express';

import User from '../Models/userSchema.js';
import expressAsyncHandler from 'express-async-handler'
import { adminSearch, deleteUser, getAllUsers,  sendNewsletter, userLogin, userRegister, userUpdatePersonalInfo, userUpdateProfile} from '../Controllers/user.js'
import userAuth from '../Middleware/userAuth.js';
import { deleteMessages, getAllContactMessages, getMessageWindow, sendContactMessage, sendRespondMessage } from '../Controllers/contact.js';

const router = express.Router();


router.get('/allUsers',userAuth, getAllUsers)
router.post('/login', userLogin)
router.get('/get/message/:id', userAuth, getMessageWindow)
router.post('/register', userRegister)
router.post('/newsletter/send', sendNewsletter)
router.get('/admin/coffees/search', userAuth, adminSearch)
router.get('/admin/orders/search', userAuth, adminSearch)
router.get('/admin/user/search', userAuth, adminSearch)
router.get('/admin/contact/search',userAuth, adminSearch)
//
router.get('/contact/messages', userAuth, getAllContactMessages)
router.post('/contact/send', sendContactMessage)
router.post('/contact/respond', userAuth, sendRespondMessage)
router.delete('/messages/delete/:id', userAuth, deleteMessages)
//
router.put('/profile/personal', userAuth, userUpdatePersonalInfo)
router.put('/profile/info', userAuth, userUpdateProfile)
router.delete('/delete/:id', userAuth, deleteUser)

export default router;