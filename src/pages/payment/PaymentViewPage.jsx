import React,{useEffect,useState} from 'react'; 
import { Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { CommonLayout,Pagination } from '../../components';

const PaymentViewPage = () => {
  return (
    <CommonLayout>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className='flex justify-between'>
            <Header category="Payments" title="Payment Page" />  
        </div>
        <div className={`overflow-x-auto relative shadow-md sm:rounded-lg`} style={{padding:"20px"}}>
            <Link to={"/payment/buyer-payment"}>
                <button className="bg-green-600 px-3 py-1 rounded-md text-white">
                    Buyer Agency Payment
                </button>
            </Link>
        </div>
        <div style={{height:"30px"}}></div>
        <div className={`overflow-x-auto relative shadow-md sm:rounded-lg`} style={{padding:"20px"}}>
            <Link to={"/payment/seller-payment"}>
                <button className="bg-green-600 px-3 py-1 rounded-md text-white">
                    Seller Agency Payment
                </button>
            </Link>
        </div>
        
        
    </div>
    </CommonLayout>
  )
}

export default PaymentViewPage