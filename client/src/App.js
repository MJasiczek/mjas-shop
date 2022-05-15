import React, {useState, useEffect} from 'react';

//import {Coffee} from './components/Coffee/Coffee';
import {Switch, Route} from 'react-router-dom'
import { Main } from './pages/Main/Main';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { CoffeePage } from './pages/CoffeePage/CoffeePage';
import { Backdrop } from './components/WebElements/LoadingProd/Backdrop';
import { SidebarCart } from './components/Sidebar_Cart/SidebarCart';
import { Cart } from './pages/Cart/Cart';
import { setCart } from './redux/actions/cartActions';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import { useDispatch } from 'react-redux';
import { logOut, setUser } from './redux/actions/userActions';
import { useLocation } from 'react-router';
import decode from 'jwt-decode';
import { Contact } from './pages/Contact/Contact';
import { Shop } from './pages/Shop/Shop';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Shipping } from './pages/Shipping/Shipping';
import { PlaceYourOrder } from './pages/PlaceYourOrder/PlaceYourOrder';
import { UserOrderDetails } from './pages/UserOrderDetails/UserOrderDetails';
import { Sidemenu } from './components/Sidemenu/Sidemenu';
import PrivRouting from './Routing/PrivRouting';
import { AdminView } from './pages/AdminView/AdminView';
import SecuredRoute from './Routing/SecuredRoute';
import { CoffeesView } from './pages/AdminView/Coffees/CoffeesView';
import { CoffeeUpdate } from './pages/CoffeeUpdate/CoffeeUpdate';
import { OrdersView } from './pages/AdminView/Orders/OrdersView';
import { UsersView } from './pages/AdminView/Users/UsersView';
import { ContactView } from './pages/AdminView/Contact/ContactView';
import { NewsletterView } from './pages/AdminView/Newsletter/NewsletterView';

function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const [sideBarToggle, setSideBarToggle] = useState(false);
  const [userState, setUserState] = useState(JSON.parse(localStorage.getItem('profile')));
  const setSideBarOpen = () =>{
    setSideBarToggle(!sideBarToggle); 
}
const [sideMenuOpen, setSideMenuOpen] = useState(false);
    const toggleMenu = ()=>{
        setSideMenuOpen(!sideMenuOpen);
        
    }
    window.addEventListener('resize', ()=>{
      if(window.innerWidth>1323) //960
      setSideMenuOpen(false);
    })
 
  return (
    <div classNameName="App">
     <div className="grid-container">
       <Sidemenu open={sideMenuOpen} toggleMenu={toggleMenu}/>
      <Header click={()=>setSideBarOpen() } toggleMenu={toggleMenu}/>
      <SidebarCart  sideBarToggle = {sideBarToggle}/>
      <Backdrop sideBarToggle = {sideBarToggle} click={()=>setSideBarOpen() }/>
      <Switch>
        <main>
        <Route path='/' component={Main} exact></Route>
        <Route path='/category=:category/:id' component={CoffeePage} exact></Route>
        <Route path='/cart' component={Cart}></Route>
        <Route path='/signin' component={Login}></Route>
        <Route path='/register' component={Register}></Route>
        <Route path='/contact' component={Contact}></Route>
        <Route path='/shop' component={Shop}></Route>
        <PrivRouting path='/dashboard' component={Dashboard}></PrivRouting>
        <Route path='/shipping' component={Shipping}></Route>
        <Route path='/placeorder' component={PlaceYourOrder}></Route>
        <PrivRouting path='/orders/:id' component={UserOrderDetails}></PrivRouting>
        <SecuredRoute path='/mainPanel' component={AdminView}></SecuredRoute>
        <SecuredRoute path='/coffeesPanel' component={CoffeesView}></SecuredRoute>
        <SecuredRoute path='/coffee/:id/update' component={CoffeeUpdate} exact></SecuredRoute>
        <SecuredRoute path='/orders/:id/update' component={UserOrderDetails} exact></SecuredRoute>
        <Route path='/shop/search?' component={Shop} exact></Route>
        <Route path='/shop/search?' component={Shop} exact></Route>

        <SecuredRoute path='/ordersPanel' component={OrdersView}></SecuredRoute>
        <SecuredRoute path='/usersPanel' component={UsersView}></SecuredRoute>
        <SecuredRoute path='/contactPanel' component={ContactView}></SecuredRoute>
        <SecuredRoute path='/newsletterPanel' component={NewsletterView}></SecuredRoute>




        </main>
        </Switch>
      <Footer />
    </div>
    </div>
  );
}

export default App;
