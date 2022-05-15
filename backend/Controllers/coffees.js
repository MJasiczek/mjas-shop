
import coffeeSchema from '../Models/coffeeSchema.js';
import expressAsyncHandler from 'express-async-handler'



export const showAllCoffees = expressAsyncHandler(async(req,res)=>{
   
    const showAllCoffees = await coffeeSchema.find({});
    res.json(showAllCoffees);
})

export const getSearchCoffees = async (req, res) => {
    const brand_name = req.query.search || '';
    const category = req.query.category || '';
    const rule = req.query.rule || '';
   // if(name){
    try {
        if(category=='All'){
            const showAllCoffees = await coffeeSchema.find({});
            res.json({coffees:showAllCoffees});
        }else{
            var howToSort;
            const filterSearching = {brand_name: {$regex:brand_name, $options:'i'}};
            const filterCategory = category? {category}:{};
            
            
            const coffees = await coffeeSchema.find({...filterSearching, ...filterCategory});
    
            res.json({ coffees:coffees });
        }
       
    } catch (error) {    
        res.status(404).json({ message: error.message });
    }
}
  
//}
export const showDetailedcoffee = expressAsyncHandler(async(req,res)=>{

    const showDetailedcoffee = await coffeeSchema.findById(req.params.id);
    if(showDetailedcoffee){
        res.json(showDetailedcoffee);
    } else{
        res.status(404).json({message: "Error, couldn't find your coffee"})
    }
   
})
export const createcoffee = expressAsyncHandler(async(req,res)=>{
    const newcoffee = new coffeeSchema({
        brand_name:'name' +Date.now(),
    category:'category',
    image:'/images/p2.jpg',
    price: 0,
    description: 'description',
    _Grammage: 'Grammage',
    _Addons: 'Addons',
    _coffeeionWhere:'Poland',
    roast:[{
        roastName:'Light Roast',
       // roastDescription: 'sample Description',
        inStock:0},
        {roastName:'Medium Roast',
       // roastDescription: 'sample Description',
        inStock:0},
        {roastName:'Medium Dark Roast',
       // roastDescription: 'sample Description',
        inStock:0},
        {roastName:'Dark Roast',
        //roastDescription: 'sample Description',
        inStock:0},
     
    ],
    });
    const createdcoffee = await newcoffee.save();
    res.json({message:'well done - new coffee created', coffee: createdcoffee})
})

export const updatecoffee = expressAsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const coffeeToUpdate = await coffeeSchema.findById(id);
    if(coffeeToUpdate){
        coffeeToUpdate.brand_name = req.body.brand_name;
        coffeeToUpdate.price = req.body.price;
        coffeeToUpdate.image = req.body.image;
        coffeeToUpdate.category = req.body.category;
        coffeeToUpdate._Grammage = req.body.grammage;
        coffeeToUpdate._Addons = req.body.addons;
        coffeeToUpdate._ProductionWhere = req.body.productionWhere;
        /*coffeeToUpdate.roast[0].inStock = req.body.inStock;
        coffeeToUpdate.roast[0].roastName = req.body.roastName;*/
        coffeeToUpdate.roast = req.body.roast;
        coffeeToUpdate.description = req.body.description;
        const updatedcoffee = await coffeeToUpdate.save();
      return res.json({ message: 'coffee Updated', coffee: updatedcoffee });
    } else {
      res.status(404).json({ message: 'coffee Not Found' });
    
    }
})

export const deletecoffee = expressAsyncHandler(async(req,res)=>{
    const coffeeToDelete = await coffeeSchema.findById(req.params.id);
    if (coffeeToDelete) {
      const deletecoffee = await coffeeToDelete.remove();
      res.json({ message: 'coffee Deleted', coffee: deletecoffee });
    } else {
      res.status(404).json({ message: 'coffee Not Found' });
    }
  })
