

import express from 'express';
import coffeeSchema from '../Models/coffeeSchema.js';
import { createcoffee, deletecoffee, getSearchCoffees, showAllCoffees, showDetailedcoffee, updatecoffee} from '../Controllers/coffees.js'
import userAuth from '../Middleware/userAuth.js';

const router_c = express.Router();
router_c.get('/', showAllCoffees)
router_c.get('/search', getSearchCoffees)
router_c.get('/:id', showDetailedcoffee)


router_c.post('/create', userAuth, createcoffee)
router_c.put('/update/:id', userAuth, updatecoffee)
router_c.delete('/delete/:id', userAuth, deletecoffee)


export default router_c;