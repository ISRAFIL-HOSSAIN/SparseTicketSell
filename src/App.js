import React, { useContext } from "react";
import { BrowserRouter,useNavigate, Routes, Route,Navigate } from 'react-router-dom';

import {Login, 
  Dashboard,
  Visa,
  VisaEdit,
  AddVisa,
  VisaView,
  Payment,
  AddPayment,
   Tickets,
   Clients,
   AddTickets,
   AddClients,
   Editor,
   ColorPicker,
   Calendar,
   Kanban,
   Line,
   ClientDetailsPrint,
   BuyerPayment,
   SellerPayment,
   AddBuyerPayment,
   AddSellerPayment,
   BuyerEdit,
   SellerEdit,
   BuyerView,
   SellerView,
   TicketEdit,
   PrintTicket,
  } from './pages';
import './App.css';
import { AuthContext } from "./contexts/AuthContext";
import TicketAddPage from "./pages/ticket/TicketAddPage";




const App = ()=>{
  const { currentUser } = useContext(AuthContext)
  const RequiredAuth = ({children})=> {
    return currentUser ? (children) : <Navigate to = "/login "/>
  }

  // const { activeMenu ,themeSettings,setThemeSettings,currentColor,currentMode} = useStateContext();
  return(
    <BrowserRouter>
      <Routes>
       
        <Route path="/login" element={<Login/>}/>

        {/* Dashboard */}
        <Route path="/" element={<RequiredAuth><Dashboard/></RequiredAuth>}/>
        <Route path="/dashboard" element={<RequiredAuth><Dashboard/></RequiredAuth>}/>
        
        {/* pages */}
        
        <Route path="/add-tickets" element={<RequiredAuth><AddTickets/></RequiredAuth>}/>

        {/* clients  */}
        <Route path="/clients" element={<RequiredAuth><Clients/></RequiredAuth>}/>
        <Route path="/add-clients" element={<RequiredAuth><AddClients/></RequiredAuth>}/>
        
        {/* visa */}
        <Route path="/visa" element={<RequiredAuth><Visa/></RequiredAuth>}/>
        <Route path="/add-visa" element={<RequiredAuth><AddVisa/></RequiredAuth>}/>
        <Route path="/visa-edit/:id" element={<RequiredAuth><VisaEdit/></RequiredAuth>}/>
        <Route path="/visa-view/:id" element={<RequiredAuth><VisaView/></RequiredAuth>}/>

        {/* ticket  */}
        <Route path="/tickets" element={<RequiredAuth><Tickets/></RequiredAuth>}/>
        <Route path="/tickets-edit/:id" element={<RequiredAuth><TicketEdit/></RequiredAuth>}/>
        <Route path="/tickets-view/:id" element={<RequiredAuth><PrintTicket/></RequiredAuth>}/>
        {/* payment */}
        <Route path="/payment" element={<RequiredAuth><Payment/></RequiredAuth>}/>
        <Route path="/payment/buyer-payment" element={<RequiredAuth><BuyerPayment/></RequiredAuth>}/>
        <Route path="/payment/seller-payment" element={<RequiredAuth><SellerPayment/></RequiredAuth>}/>

        <Route path="/payment/add-buyer-payment" element={<RequiredAuth><AddBuyerPayment/></RequiredAuth>}/>
        <Route path="/payment/add-seller-payment" element={<RequiredAuth><AddSellerPayment/></RequiredAuth>}/>
        
        {/* payment-edit */}
        <Route path="/payment/edit-buyer/:id" element={<RequiredAuth><BuyerEdit/></RequiredAuth>}/>
        <Route path="/payment/edit-seller/:id" element={<RequiredAuth><SellerEdit/></RequiredAuth>}/>

        {/* view */}
        <Route path="/payment/view-buyer/:id" element={<RequiredAuth><BuyerView/></RequiredAuth>}/>
        <Route path="/payment/view-seller/:id" element={<RequiredAuth><SellerView/></RequiredAuth>}/>

        {/* Apps */}
        <Route path="/kanban" element={<RequiredAuth><Kanban/></RequiredAuth>}/>
        <Route path="/editor" element={<RequiredAuth><Editor/></RequiredAuth>}/>
        <Route path="/calendar" element={<RequiredAuth><Calendar/></RequiredAuth>}/>
        <Route path="/color-picker" element={<RequiredAuth><ColorPicker/></RequiredAuth>}/>

        {/* Charts */}
        <Route path="/line" element={<RequiredAuth><Line/></RequiredAuth>}/> 
      </Routes>
    </BrowserRouter>
  );
};

export default App
