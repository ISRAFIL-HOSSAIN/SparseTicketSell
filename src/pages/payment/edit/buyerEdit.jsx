import React, { useEffect, useState } from 'react';
import { CommonLayout,Header } from '../../../components';
import { Link, useParams } from "react-router-dom";
import { 
    doc,
    updateDoc, 
    getDoc
} from "firebase/firestore"; 
import { db } from '../../../model/firebase';
import { useNavigate } from 'react-router-dom';
import {notification,Spin } from "antd"; 


export const transaction_type=[
    "Cash Received",
    "Cash Given", 
    "Bank Recived", 
    "Bank Given", 
    "Credit Given", 
    "Credit Received",
]

const BuyerEdit = () => {

    const [ data, setData ] = useState([]); 
    const [ allticket , setTicket ] = useState([]); 
    const [dueBuyeramount, setDueBuyerAmount] = useState(); 
    
    const {id} = useParams(); 

    const navigate = useNavigate(); 
    
    useEffect(()=>{
        async function getTicket(){

            const docRef = doc(db,"buyInformation", id); 
            try{
                const docSnap = await getDoc(docRef);
                let list = []; 
                list.push({...docSnap.data()}) 
                setTicket(list);
               
            }
            catch(error){
                console.log(error); 
            }
    
        }
        getTicket();    
    },[]);
    
    
    console.log("Buy Ticket are : ", allticket) 
    
    const handleInput =(e)=>{
        console.log(e.target.id); 
        console.log(e.target.value); 

        const id = e.target.id; 
        const value = e.target.value; 

        setData({ ...data , [id]: value });   
        
    }
    console.log("Data is : ", data); 

    const Calculate =(buyPayment,bvalue)=>{
        let cal = parseInt(buyPayment) - parseInt(bvalue); 
        console.log(cal); 
        setDueBuyerAmount(cal); 
    }

    const buyerData = { ...data,"DueBuyerPayment":dueBuyeramount}
    console.log("ModifyData is ===== ", buyerData); 

    const handleUpdate = async (e)=>{
        e.preventDefault();
            
        try{
            
            const updatedata = doc(db,"buyInformation",id)
            updateDoc(updatedata,{
                ...buyerData,
            });
            notification["success"]({
                message: "Successfully Updated",
              });
            navigate(-1)

        }catch(err){
            notification["Error"]({
                message: err,
              });
            console.log(err); 
        }
    };
   
  return (
    <CommonLayout>
        <div className="m-2 md:m-10 mt-20 p-10 md:p-10 bg-white rounded-3xl">
            <div className='flex justify-between'>
                <Header category="Page" title="Payments / Add Payments Buyer" />  
                <Link to={"/payment/buyer-payment"}>
                    <button className="bg-green-600 px-3 py-1 rounded-md text-white">
                        Back
                    </button>
                </Link>  
            </div>
            <>
                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>
                <div className="mt-10 sm:mt-0">
                    <div className="md:grid md:grid-cols-1 md:gap-6">
                    
                        <div className="mt-5 md:col-span-2 md:mt-0">
                            
                    
                       

                            <form onSubmit={handleUpdate}  >
                            {allticket.map((buyer)=>(
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="agency" className="block text-sm font-medium text-gray-700 ">
                                                    Buyer Agency Name
                                                </label>
                                                <select 
                                                  
                                                  onChange={(e)=>{
                                                    handleInput(e);
                                                    console.log('check: ',e.target.value);
                                                }}
                                                    
                                                    id="buyagencyname"
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                                >
                                                    
                                                        <option defaultValue >
                                                             <Spin size="small" />
                                                            {buyer.buyagencyname}
                                                            {/* {t.clientName} */} 
                                                        </option>
                                                </select>
                          
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="ticketprice" className="block text-sm font-medium text-gray-700">
                                                    Buy Ticket Price 
                                                </label>
                                                <input 
                                                    disabled
                                                    value={buyer.buyticketPrice}
                                              
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="paidamount" className="block text-sm font-medium text-gray-700">
                                                    Pay Payment 
                                                </label>
                                                <input 
                                                    defaultValue={buyer.paidamount}
                                                    onChange={(e)=>{
                                                        handleInput(e);
                                                        console.log('Pay-Payment: ',e.target.value);
                                                        Calculate(buyer.buyticketPrice, e.target.value);
                                                    }}
                                                    type="number"  min="1" 
                                                    id="paidamount"                                               
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                                                />
                                            </div>
                                            
                                            
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="btransaction" className="block text-sm font-medium text-gray-700 ">
                                                    Transaction Type
                                                </label>
                                                <select 
                                                    onChange={handleInput}
                                                    defaultValue={buyer.btransaction}
                                                    id="btransaction"
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                                >
                                                    <option defaultValue> --- Select Transaction Type--- </option>
                                                    {transaction_type.map((t,index)=>(
                                                        <option key={index}>
                                                            {t}
                                                        </option>
                                                    ))}
                                                </select>
                          
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="payamount" className="block text-sm font-medium text-gray-700">
                                                   Due Buyer Amount 
                                                </label>
                                                <input 
                                                    disabled
                                                    defaultValue={buyer.DueBuyerPayment}
                                                    value={dueBuyeramount}
                                              
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                                                />
                                            </div>
                                            
                                            

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="note" className="block text-sm font-medium text-gray-700">
                                                    Note
                                                </label>
                                                <textarea  
                                                    onChange={handleInput}
                                                    id="note"
                                                    defaultValue ={buyer.note}
                                                   
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                                                />
                                            </div>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="date" className="block text-sm font-medium text-gray-700 ">
                                                    Date
                                                </label>
                                                <input  
                                                    onChange={handleInput}
                                                    defaultValue ={buyer.date}
                                                    type="date"  id="date" required
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  
            
                                                "/>
                                        </div>
                                        
                                    </div>
                                
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="submit"
                                            id="submit" 
                                            className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>
                                    </div>
                                </div>
                                ))}
                            </form>
                       
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block" aria-hidden="true">
                    <div className="py-5">
                        <div className="border-t border-gray-200" />
                    </div>
                </div>
            </>
        </div> 
    </CommonLayout>
  );
}

export default BuyerEdit