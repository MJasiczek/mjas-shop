import React, {useEffect, useState} from 'react'
import shopCSS from './Shop.module.css'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useHistory, useLocation, useParams } from 'react-router-dom';
import { Coffee } from '../../components/Coffee/Coffee';
import { LoadingProd } from '../../components/WebElements/LoadingProd/LoadingProd';
import { MessageBlock } from '../../components/WebElements/MessageBlock/MessageBlock';
import { Backdrop } from '../../components/WebElements/LoadingProd/Backdrop';
import { listAllCategory, listCoffees, searchCategoryAction, sortCoffees } from '../../redux/actions/coffeeActions';
import {Swiper} from 'swiper/react/swiper';
import { SwiperSlide } from 'swiper/react/swiper-slide';
import SwiperCore, {Navigation, Pagination, Autoplay} from 'swiper';
import { Paginat } from '../../components/Paginat/Paginat';
function useQuery(){
    return new URLSearchParams(useLocation().search);
}

export const Shop = (props) => {
    
    const dispatch = useDispatch();
    //const {name='all'} = useParams();
    const [categoryToSearch, setCategory]= useState('')
    const [sort, setSort]= useState('')
    const query = useQuery();
    const history = useHistory();
    const searchQuery = query.get('search')
    const page = query.get('page') || 1;
    const coffeeList = useSelector(state=>state.coffeeList);
    const {coffees, error: possibleError, loading} = coffeeList;
    const allCategories = useSelector(state=>state.categoryList);
    const {categories} = allCategories;

  
    const [currentPage, setCurrentPage] = useState(1);
    const coffeePerPage = 4;
    useEffect(() => {
       dispatch(listCoffees())
    }, [ dispatch])
    useEffect(()=>{
        dispatch(listAllCategory())
    },[dispatch])
    useEffect(() => {
        if(categoryToSearch.trim()){
            dispatch(searchCategoryAction(categoryToSearch));
           
            history.push(`/shop/search?category=${categoryToSearch || 'none'}`)
        }else{
            history.push('/shop')
        }
        //console.log(categoryToSearch)
    }, [setCategory, categoryToSearch, dispatch])
    useEffect(() => {
       dispatch(sortCoffees(sort))
       
        
    }, [sort])

    const endingCoffee = currentPage*coffeePerPage;
    const startingCoffee = endingCoffee - coffeePerPage;
    const currentCoffee = coffees?.slice(startingCoffee, endingCoffee);
   
   const pagination = (pageNum)=> setCurrentPage(pageNum);
    return (
            <>
            {loading?(<><LoadingProd></LoadingProd> <Backdrop></Backdrop></>)
            :possibleError ?(<MessageBlock variant='danger'></MessageBlock>)
            :(<div className={shopCSS.shop}>
                <div className={shopCSS.header}>
                 <h1 className={shopCSS.h1}>Shop</h1>
                 
                 </div>
     
                 <div className={shopCSS.shop_content}>
                     <div className={shopCSS.shop_controls}>
                         <div className={shopCSS.categoryName}>
                             <h4>Category</h4>
                             <div className={shopCSS.categories}>
                             <select onChange={(e)=>setCategory(e.target.value)}>
                             <option  >All</option>

                                {categories?.map((x)=>(
                                   
                                <option  id={x._id} key={x.id} >{x}</option>
                                
                                ))}</select>
                             </div>
                         </div>
                         <div className={shopCSS.coffeesSort}>
                         <h4>Sort by</h4>
                         <div className={shopCSS.categories}>
                         <select onChange={(e)=> setSort(e.target.value) } className={shopCSS.select}>
                               <option value='all'>All</option>
                                <option value='low'>Low to Hight Price</option>
                                <option value='high'>High to Low Price</option>
                                <option value='new'>Newest in shop</option>
                                <option value='old'>Oldest in shop</option>

                         </select>
                         </div>
                         </div>
                     </div>
     
                  </div>
                  <div className={shopCSS.coffees}>
                     <div className={shopCSS.wrapper}>

                    
                             {currentCoffee.map((coffee)=>
                                 (<li><Coffee key={coffee.id} coffee={coffee}/></li>)
                             )}
                     </div>
                     <li style={{listStyle:'none'}}><Paginat coffeeOnPage={coffeePerPage} totalAmountOfCoffee={coffees.length} pagination={pagination} /></li>

                 </div>
             </div>)
                }
        
        </>
    )
}
