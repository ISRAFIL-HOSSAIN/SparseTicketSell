import React, { useEffect, useState } from 'react';
import { CommonLayout,Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { 
    addDoc,
    collection,
    doc, 
    setDoc,
    serverTimestamp  
} from "firebase/firestore"; 
import { auth,db } from '../../model/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';


const ClientAddPage = () => {
    const [ data, setData ] = useState({}); 
    const navigate = useNavigate(); 

    const handleInput =(e)=>{
        console.log(e.target.id); 
        console.log(e.target.value); 

        const id = e.target.id; 
        const value = e.target.value; 

        setData({ ...data, [id]: value });
        
    }
    console.log(data); 

    const handleSubmit = async (e)=>{
        console.log("CLick handle SUbmit")
        e.preventDefault(); 
        try{
            await addDoc(collection(db,"Client"),{
                ...data,
                timeStamp: serverTimestamp(),
            });
            navigate(-1)

        }catch(err){
            console.log(err); 
        }
        
        // try {
        //     const res = await createUserWithEmailAndPassword(
        //         auth,
        //         data.email,
        //         data.password
        //     );
        //     console.log(res.user.uid); 
        //     await setDoc(doc(db, "payment", res.user.uid), {
        //         ...data,
        //         timeStamp: serverTimestamp(),
        //     });
        //     navigate(-1)
        //   } catch (err) {
        //     console.log(err);
        // }
        console.log("Handle Submit finish"); 

    };
   
  return (
    <CommonLayout>
        <div className="m-2 md:m-10 mt-20 p-10 md:p-10 bg-white rounded-3xl">
            <div className='flex justify-between'>
                <Header category="Page" title="Clients / Add Clients" />  
                <Link to={"/Clients"}>
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
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Agency Name
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="text" 
                                                    id="agency" 
                                                    name="agency" 
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Client Name
                                                </label>
                                                <input 
                                                onChange={handleInput}
                                                type="text" 
                                                name="clientName" 
                                                id="clientName" class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Client Email
                                                </label>
                                                <input 
                                                    onChange={handleInput}
                                                    type="email" id="email" name="email"
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>

                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Address
                                                </label>
                                                <textarea  
                                                    onChange={handleInput}
                                                    id="address" 
                                                    name="address" 
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>
                                            <div className="col-span-6 sm:col-span-3">
                                                <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">
                                                    Phone - 1
                                                  </label>
                                                
                                                < input 
                                                 onChange={handleInput} 
                                                 type="tel"  
                                                 id="phone_1" 
                                                 name="phone_1" 
                                                 class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/> 
                                            
                                            </div>
                                           

                                            <div className="col-span-6 sm:col-span-3 ">
                                                <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">
                                                    Phone - 2
                                                </label>
                                                <input 
                                                    onChange={handleInput} 
                                                    type="tel"  
                                                    id="phone_2" 
                                                    name="phone_2" 
                                                    class="bg-gray-50 border border-gray-300 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 text-gray-900 text-sm rounded-lg block w-full p-2.5  "/>
                                            </div>
                                        </div>
                                    </div>
                                
                                    <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                                        <button
                                            type="submit"
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
  )
}
export default ClientAddPage