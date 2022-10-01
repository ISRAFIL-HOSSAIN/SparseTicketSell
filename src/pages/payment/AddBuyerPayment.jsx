import React, { useEffect, useState } from 'react';
import { CommonLayout,Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { 
    addDoc,
    collection,
    serverTimestamp,
    onSnapshot,
  
} from "firebase/firestore"; 
import { auth,db } from '../../model/firebase';
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

const AddBuyerPayment = () => {

    const [ data, setData ] = useState([]); 
    const [ allticket , setTicket ] = useState([]); 
    const [buyPayment,setBuyPayment] = useState(0); 
    const [dueBuyeramount, setDueBuyerAmount] = useState(); 

    const navigate = useNavigate(); 
    
    useEffect(()=>{
        const ticket = onSnapshot(
            collection(db,"tickets"), 
            (snapShot) =>{
                let list = []; 
                snapShot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data() }); 
                });
                setTicket(list); 
            }, 
            (error)=>{
                console.log(error); 
            }
        );
        return ()=>{
            ticket(); 
        };    
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

    const buyerData = { ...data,"buyticketPrice":buyPayment,"DueBuyerPayment":dueBuyeramount}
    console.log("ModifyData is ===== ", buyerData); 

    const handleSubmit = async (e)=>{
        console.log("Henadlsjdflksdjflksdjflskdjflsd")
        e.preventDefault();
            
        try{
           
            await addDoc(collection(db,"buyInformation"),{
                ...buyerData,
                timeStamp: serverTimestamp(),
            });
            notification["success"]({
                message: "Successfully Submitted",
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
                            
                            <form onSubmit={handleSubmit}>
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
                                                   
                                                    for(let i=0;i<allticket.length;i++){
                                                        if(allticket[i].buyagency === e.target.value){
                                                            setBuyPayment(allticket[i].buyticket)
                                                        }
                                                    }
                                                }}
                                                    
                                                    id="buyagencyname"
                                                    
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                                >
                                                    <option defaultValue > --- Select Buyer Agency Name --- </option>
                                                    {allticket.map((t,index)=>(
                                                        <option key={index}>
                                                             <Spin size="small" />
                                                            {t.buyagency}
                                                            {/* {t.clientName} */}
                                                        </option>
                                                    ))}
                                                </select>
                          
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="ticketprice" className="block text-sm font-medium text-gray-700">
                                                    Buy Ticket Price 
                                                </label>
                                                <input 
                                                    disabled
                                                    value={buyPayment}
                                              
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "
                                                />
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="paidamount" className="block text-sm font-medium text-gray-700">
                                                    Pay Payment 
                                                </label>
                                                <input 
                                                    onChange={(e)=>{
                                                        handleInput(e);
                                                        console.log('Pay-Payment: ',e.target.value);
                                                        Calculate(buyPayment,e.target.value);
                                                    
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
                                            Save
                                        </button>
                                    </div>
                                </div>
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

export default AddBuyerPayment