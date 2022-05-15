import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { adminSearch, sortAdmin } from '../../redux/actions/userActions';

export const AdminSearch = (props) => {
    const {where} = props;
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('');
    const [searchData, setSearchData] = useState('');
    const [sort, setSort] = useState('');

    const searchHandler = ()=>{
        dispatch(adminSearch({searchValue,where, searchData }));
      
    }
    useEffect(() => {
       dispatch(sortAdmin(sort))
    }, [sort])
    return (
        <>
        {where=='orders'&& 
        <>
        <div style={{textAlign:'center'}}><select onChange={(e)=>setSearchValue(e.target.value)}>
             <option value="all">All</option>
             <option value="email">EMAIL</option>
             </select></div>
             <div style={{textAlign:'center'}}><input onChange={(e)=>setSearchData(e.target.value)}></input></div>
    <div style={{textAlign:'center'}}><button type="button" className="primary" onClick={searchHandler}> Search</button></div>
        </>
        }
        {where=='coffees'&&
        <>
        <div style={{textAlign:'center'}}><select onChange={(e)=>setSearchValue(e.target.value)}>
             <option value="all">All</option>
             <option value="name">Name</option>
             </select></div>
           <div style={{textAlign:'center'}}><input onChange={(e)=>setSearchData(e.target.value)}></input></div>
           <div style={{textAlign:'center'}}><button type="button" className="primary" onClick={searchHandler}> Search</button></div>
        </>
        }
         {where=='users'&&
        <>
        <div style={{textAlign:'center'}}><select onChange={(e)=>setSearchValue(e.target.value)}>
            <option value="all">All</option>
             <option value="email">Email</option>
             </select></div>
           <div style={{textAlign:'center'}}><input onChange={(e)=>setSearchData(e.target.value)}></input></div>
           <div style={{textAlign:'center'}}><button type="button" className="primary" onClick={searchHandler}> Search</button></div>
        </>
        }
         {where=='contact'&&
        <>
        <div style={{textAlign:'center'}}><select onChange={(e)=>setSearchValue(e.target.value)}>
            <option value="all">All</option>
             <option value="email">Email</option>
             </select></div>
           <div style={{textAlign:'center'}}><input onChange={(e)=>setSearchData(e.target.value)}></input></div>
           <div style={{textAlign:'center'}}><button type="button" className="primary" onClick={searchHandler}> Search</button></div>
           <div style={{textAlign:'center'}}>
                         <select onChange={(e)=> setSort(e.target.value)}>
                               <option value='all'>All</option>
                                <option value='new'>Newest in DB</option>
                                <option value='last'>Latest in DB</option>

                         </select></div>
        </>
    }
        
    </>
    )
}
