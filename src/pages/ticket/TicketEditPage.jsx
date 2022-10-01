import React, { useEffect, useState } from 'react';
import { CommonLayout,Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { 
    updateDoc, 
    getDoc,
    doc,
    collection,
    onSnapshot
  
} from "firebase/firestore"; 
import { db } from '../../model/firebase';
import { useNavigate } from 'react-router-dom';
import {notification,Spin } from "antd"; 


const TicketEdit = () => {
    const [ data, setData ] = useState([]); 
    const [ allticket , setTicket ] = useState([]);
    const [client,setClient] = useState([]); 

    const navigate = useNavigate(); 
    
    const {id} = useParams(); 

    useEffect(()=>{
      const clients = onSnapshot(
        collection(db,"Client"), 
        (snapShot) =>{
            let list = []; 
            snapShot.docs.forEach((doc)=>{
                list.push({id:doc.id, ...doc.data() }); 
            });
            setClient(list); 
        }, 
        (error)=>{
            console.log(error); 
        }
    );
    return ()=>{
        clients(); 
    };    
    },[]);

    useEffect(()=>{
        async function getTicket(){

            const docRef = doc(db,"tickets", id); 
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
    
    console.log("Sell Ticket are : ", allticket) 
    
    const handleInput =(e)=>{
        console.log(e.target.id); 
        console.log(e.target.value); 

        const id = e.target.id; 
        const value = e.target.value; 
        console.log("Value is - ... ", value);

        setData({ ...data , [id]: value});   
        
    }

    const handleUpdate = async (e)=>{
        e.preventDefault();
        try{
            
            const updatedata = doc(db,"tickets",id)
            updateDoc(updatedata,{
                ...data,
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
                <Header category="Page" title="Payments / Add Payments Seller" />  
                <Link to={"/payment/seller-payment"}>
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
                            
                            <form onSubmit={handleUpdate}>
                            {allticket.map((ticket)=>( 
                                 <div className="overflow-hidden shadow sm:rounded-md">
                                 <div className="bg-white px-4 py-5 sm:p-6">
                                     <div className="grid grid-cols-6 gap-6">
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="airlines" className="block text-sm font-medium text-gray-700">
                                                 Airlines
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 defaultValue={ticket.airlines}
                                                 type="text" 
                                                 id="airlines" 
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>

                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="paxname" className="block text-sm font-medium text-gray-700">
                                                 Pax Name
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 defaultValue={ticket.paxname}
                                                 type="text" 
                                                 id="paxname"
                                             
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="pnr" className="block text-sm font-medium text-gray-700">
                                                 PNR
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 defaultValue={ticket.pnr}
                                                 type="text" 
                                                 id="pnr"
                                             
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>

                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="ticketnumber" className="block text-sm font-medium text-gray-700">
                                                 TicketNumber
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 defaultValue={ticket.ticketnumber}
                                                 type="text" 
                                                 id="ticketnumber"
                                            
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="issudate" className="block text-sm font-medium text-gray-700">
                                                 IssueDate
                                             </label>
                                             {/* <input type="date" value="2017-06-01" /> */}
                                             <input 
                                                 onChange={handleInput}
                                                 type="date" 
                                                 defaultValue={ticket.issuedate}
                                                 id="issuedate"
                                                
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>

                                         <div className="col-span-6 sm:col-span-3 ">
                                             <label htmlFor="flightdate" className="block text-sm font-medium text-gray-700">
                                                 Flight Date
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 type="date" 
                                                 defaultValue={ticket.flightdate}
                                                 id="flightdate"
                                                 
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                         
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="travelplace" className="block text-sm font-medium text-gray-700">
                                                 Travel Place
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 type="text" 
                                                 defaultValue={ticket.travelplace}
                                                 id="travelplace"
                                           
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>

                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                                 Destination 
                                             </label>
                                             <input 
                                              onChange={handleInput}
                                              type="text" 
                                              defaultValue={ticket.destination}
                                              id="destination"
                                           
                                              class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="buyagency" className="block text-sm font-medium text-gray-700 ">
                                                 Buy Ticket -  Agency Name
                                             </label>
                                             <select 
                                                 onChange={handleInput}
                                                 id="buyagency"
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                             >
                                                 <option defaultValue>{ticket.buyagency}</option>
                                                 {client.map((t,index)=>(
                                                     
                                                     <option key={index}>
                                                          <Spin size="small" />
                                                         {t.agency}
                                                     </option>
                                                 ))}
                                             </select>
                       
                                         </div>
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="buyticket" className="block text-sm font-medium text-gray-700">
                                                 Buy Ticket Price
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 type="number" 
                                                 defaultValue={ticket.buyticket}
                                                 min="1" 
                                                 id="buyticket" 
                                               
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                         
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="sellagency" className="block text-sm font-medium text-gray-700 ">
                                                 Selling Ticket -  Agency Name / Customer
                                             </label>
                                             <select 
                                                 onChange={handleInput}
                                                 id="sellagency"
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                                             >
                                                 <option defaultValue>{ticket.sellagency}</option>
                                                 {client.map((t,index)=>(
                                                     <option key={index}>
                                                         {t.agency}
                                                     </option>
                                                 ))}
                                             </select>
                       
                                         </div>
                                         <div className="col-span-6 sm:col-span-3">
                                             <label htmlFor="sellticket" className="block text-sm font-medium text-gray-700">
                                                 Sell Ticket Price
                                             </label>
                                             <input 
                                                 onChange={handleInput}
                                                 type="number" 
                                                 defaultValue={ticket.sellticket}
                                                 min="1" 
                                                 id="sellticket" 
                                           
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                         </div>
                                     </div>
                                 </div>
                             
                                 <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                     <button
                                         type="submit"
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
  )
}

export default TicketEdit