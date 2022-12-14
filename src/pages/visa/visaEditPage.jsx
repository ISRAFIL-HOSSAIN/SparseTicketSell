import React, { useEffect, useState } from 'react';
import { CommonLayout,Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { 
    addDoc,
    collection,
    doc, 
    setDoc,
    serverTimestamp,
    onSnapshot,
    updateDoc, 
    getDoc
} from "firebase/firestore"; 
import { auth,db } from '../../model/firebase';
import { useNavigate } from 'react-router-dom';
import {notification,Spin } from "antd"; 


const VisaEditPage = () => {

    const [ data, setData ] = useState({}); 
    const [ visa, setVisa ] = useState([]); 
    const navigate = useNavigate(); 
    const {id} = useParams(); 

    useEffect(()=>{
        async function getVisa(){

            const docRef = doc(db,"visa", id); 
            try{
                const docSnap = await getDoc(docRef);
                let list = []; 
                list.push({...docSnap.data()}) 
                setVisa(list);
               
            }
            catch(error){
                console.log(error); 
            }
    
        }
        getVisa();    
    },[]);
    console.log("VIsa is : ", visa) 

    const handleInput =(e)=>{
        console.log(e.target.id); 
        console.log(e.target.value); 

        const id = e.target.id; 
        const value = e.target.value; 

        setData({ ...data, [id]: value });
        
    }

    console.log(data); 

    const handleUpdate = async (e)=>{
       
        e.preventDefault(); 
        try{
            
            const updatedata = doc(db,"visa",id)
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
                <Header category="Page" title="Visa / Add Visa" />  
                <Link to={"/visa"}>
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
                            {visa?.map((visa)=>(
                                <div className="overflow-hidden shadow sm:rounded-md">
                                    <div className="bg-white px-4 py-5 sm:p-6">
                                        <div className="grid grid-cols-6 gap-6">
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="pgn_name" className="block text-sm font-medium text-gray-700 ">
                                                    Passenger Name
                                                </label>
                                                <input type="text"
                                                    onChange={handleInput}
                                                    required
                                                    id="pessanger" 
                                                    defaultValue={visa.pessanger}
                                                    
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="visanumber" className="block text-sm font-medium text-gray-700 ">
                                                    Visa Number
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="text" 
                                                    required
                                                    id="visanumber" 
                                                    defaultValue={visa.visanumber}
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="passportNumber" className="block text-sm font-medium text-gray-700">
                                                    Passport Number
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="text"  
                                                    id="passport"
                                                    required
                                                    defaultValue={visa.passport}
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="destination" className="block text-sm font-medium text-gray-700">
                                                    Destination
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="text"  
                                                    id="destination"
                                                    defaultValue={visa.destination}
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="Debit" className="block text-sm font-medium text-gray-700">
                                                    Debit 
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="number" 
                                                    min="1" 
                                                    id="debit"
                                                    defaultValue={visa.debit}
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="Credit" className="block text-sm font-medium text-gray-700">
                                                    Credit
                                                </label>
                                              
                                                <input 
                                                    onChange={handleInput}
                                                    type="number" min="1"
                                                    id="credit"
                                                    defaultValue={visa.credit}
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

export default VisaEditPage