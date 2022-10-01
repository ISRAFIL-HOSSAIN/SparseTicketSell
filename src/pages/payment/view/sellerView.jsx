import React, { useEffect, useState,useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import { CommonLayout,Header } from '../../../components';
import { Link, useParams } from "react-router-dom";
import { BiPrinter } from 'react-icons/bi';
import logo from '../../../assets/binance.png';

import { 
    doc,
    collection,
    getDoc,
    query,where,getDocs,
  
} from "firebase/firestore"; 
import { auth,db } from '../../../model/firebase';
import {notification, Divider} from "antd"; 

const SellerView = () => {

    const [ data, setData ] = useState([]); 
    const [ allticket , setTicket ] = useState([]); 
    const [client, setClient] = useState([]); 
    // const [alldata,setAllData] = useState([]); 
    
    const {id} = useParams(); 
    const componentRef = useRef();
    let clientname = (allticket.sellagency)
 
  
  

    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    
    useEffect(()=>{
     
        const ticket =  async ()=> {
            try{
                const docRef = doc(db,"sellerInformation", id); 
                const docSnap = await getDoc(docRef);
                setTicket(docSnap.data());
                
            }
            catch(error){
                console.log(error); 
            }
        }     
        const Client =  async (user)=> {
            try{
                const q = query(collection(db, "Client"), where("agency", "==", user));
                const querySnapshot = await getDocs(q); 
                querySnapshot.forEach((doc)=>{
                setClient(doc.data()); 
            })
            }
            catch(er){
                console.log(er); 
            }   
        } 
        ticket(); 
        Client(clientname); 
    },[clientname]);

    
   
   
    console.log('Client Data is : =========> ',client);
    console.log("Buy Ticket are : ", allticket) ;
    
    
    const alldata = [{...allticket,...client }]
    console.log("All Data is : ", alldata); 
    // const Calculate =(buyPayment,bvalue)=>{
    //     let cal = parseInt(buyPayment) - parseInt(bvalue); 
    //     console.log(cal); 
    //     setDueBuyerAmount(cal); 
    // }
   
  return (
    <CommonLayout>
        <div className="m-2 md:m-10 mt-20 p-10 md:p-10 bg-white rounded-3xl">
            <div className='flex justify-between'>
            <Link to={"/payment/seller-payment"}>
                <Header category="Page" title="Payments / Add Payments Buyer" />
            </Link> 
                <button
                className="flex items-center gap-1 bg-green-600 hover:bg-blue-800 p-2 rounded-md text-white"
                style={{height:"40px", width:"80px"}}
                onClick={handlePrint}
                >
                    <BiPrinter /> Print
                </button>
                
            </div>
            

            <div
                style={{
                width: 'auto',
                height: '640 px',
                margin: 'auto',
            }}
            >
            

                { alldata.map((data)=>{ 

                    return(
                        <>             
                            <div
                                ref={componentRef}
                                style={{
                                backgroundColor: '#F0F8F9',
                                padding:'5px',
                                paddingTop: '15px',
                                height:"500px"
                                }}
                            >
                                <span style={{float:"right", paddingRight:"10px"}}>Date : {new Date().toLocaleString()}</span>
                                <div 
                                style={{
                                paddingLeft: '25px',
                                width:"100%",
                                height:"50px",
                                
                                }}>
                                    <img class="w-10 h-10" src={logo} alt="logo"  />
                                    
                                </div>
                            
                                <div style={{justifyContent:"center", textAlign:"center"}}>
                                    <table style={{width:"100%" , paddingBottom:"20px"}}>
                                        <tr style={{fontSize:"30px",fontWeight:"bold", height:"50px"}}>
                                            {data.sellagency}
                                        </tr>
                                        <tr>Client Name : {data.clientName} </tr>
                                        <tr>Email : {data.email} </tr>
                                        <tr>Phone - 1: {data.Phone_1} </tr> 
                                        <tr> Phone - 2: {data.Phone_2}</tr>
                                        <tr>Adress : {data.address}</tr>
                                    </table> 
                                
                                </div> 
                            
                        
                                <div style={{textAlign:"center", paddingLeft:"30px",paddingRight:"30px"}}>
                                    <table 
                                    style={{width:"100%",borderStyle:"solid", border: "1px solid black",bordercollapse: "collapse"}} >
                                        
                                        <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                            <td>Date : </td>
                                            <td>{data.date}</td> 
                                        </tr>
                                        <tr style={{width:"33%",bordercollapse: "collapse"}}>
                                            <td>Paid Money  </td>
                                            <td> Tk {data.Payment}</td> 
                                        </tr>
                                        <tr style={{width:"33%",bordercollapse: "collapse"}}>
                                            <td>Take Amount </td>
                                            <td> Tk {data.takepayment}</td> 
                                        </tr>
                                        <tr style={{width:"33%",bordercollapse: "collapse"}}>
                                            <td>Transaction Type </td>
                                            <td> Tk {data.transaction}</td> 
                                        </tr>
                                    
                                    
                                        <tr style={{width:"33%",border: "1px solid grey",bordercollapse: "collapse"}}>
                                            <td>Due Amount  </td>
                                            <td> Tk {data.DuePayment}</td> 
                                        </tr>
                                    
                                    </table> 
                                    
                                </div>
                                
                                <div style={{padding:"20px"}}>
                                    <span style={{paddingLeft:"20px", color:"#D4093C"}}> ***  Seller Back   {data.DuePayment} TK </span>
                                    <h3 style={{paddingLeft:"20px", color:"#3F0083"}}>Note : {data.note}</h3>
                                </div>
                        
                            </div>
                        </>
                    )  
                })}  
               
            </div>
            


           
        </div> 
    </CommonLayout>
  );
}

export default SellerView