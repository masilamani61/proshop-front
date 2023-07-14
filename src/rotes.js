import React from 'react';
import {BrowserRouter ,Routes,Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import App from './App';
import './App.css'
import Productscreen from './screeb/productscreen';
import Cartscreen from './screeb/Cartscreen';
import Login from './componnents/login';
import Register from './componnents/register';
import Shipping from './componnents/shiiping';
import Private from './privateroute';
import Payment from './componnents/payment';
import Placeorder from './screeb/placorderscreen';
import Orderedpayment from './screeb/Orderedpayment';
import Profile from './screeb/profilescreen';
import Adminorders from './admin/orderlist';
import ProductScreen from './admin/Productscreen';
import Editscreen from './admin/Editscreen';
import AdminRoute from './adminroute';
import PaypalForm from './componnents/paypalform';

function Routess(){
return(
<BrowserRouter>
<Routes>
  <Route path='/'>
    <Route index element={<App/>}/>
    <Route path='/page/:pagenumber' element={<App/>}/>
    <Route path='/payment/paypal/:id/' element={<PaypalForm/>}/>
    
    <Route path='/search/:keyword' element={<App/>}/>
    <Route path='/products/:id' element={<Productscreen/>}/>
    <Route path='/cart' element={<Cartscreen/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/register' element={<Register/>}/>
    <Route path='/payment' element={<Private><Payment/></Private>}/>
    <Route path='/placeorder' element={<Private><Placeorder/></Private>}/>
    <Route path='/placeorder/:id' element={<Private><Orderedpayment/></Private>}/>
    <Route path='/allorders' element={<AdminRoute><Private><Adminorders/></Private></AdminRoute>}/>
  </Route>
  
  

</Routes>

  <Routes>

    <Route path='/'>
    <Route path='/productlist' element={<AdminRoute><Private><ProductScreen/></Private></AdminRoute>}/>
    <Route path='/edit/:id' element={<AdminRoute><Private><Editscreen/></Private></AdminRoute>}/>
    <Route path='/profile' element={<Private><Profile/></Private>}/>
   
    <Route path='/shipping' element={<Private><Shipping/></Private>}/>
    

    </Route>
    
  </Routes>

</BrowserRouter>
)}

export default Routess
