import React, { useEffect, useState,useRef} from 'react';
import { useReactToPrint } from 'react-to-print';
import { CommonLayout,Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { BiPrinter } from 'react-icons/bi';
import logo from '../../assets/binance.png';

import { 
    doc,
    getDoc,
} from "firebase/firestore"; 
import { auth,db } from '../../model/firebase';

const VisaView = () => {
    const [ visainfo , setVisainfo ] = useState([]); 
    
    const {id} = useParams(); 
    const componentRef = useRef();
 
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    
    useEffect(()=>{
     
        const Visainfo =  async ()=> {
            try{
                const docRef = doc(db,"visa", id); 
                const docSnap = await getDoc(docRef);
                setVisainfo(docSnap.data());
            }
            catch(error){
                console.log(error); 
            }
        }     
        
        Visainfo(); 
       
    },[]);

    console.log('ticketinformation is : .......', visainfo)
    const visa = [visainfo]; 
    console.log("ALl Visa are : ", visa); 
    
    // const Calculate =(buyPayment,bvalue)=>{
    //     let cal = parseInt(buyPayment) - parseInt(bvalue); 
    //     console.log(cal); 
    //     setDueBuyerAmount(cal); 
    // }
   
  return (
    <CommonLayout>
        <div className="m-2 md:m-10 mt-20 p-10 md:p-10 bg-white rounded-3xl">
            <div className='flex justify-between'>
            <Link to={"/visa"}>
                <Header category="Page" title="Tickets / Tickets information" />
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
                <>  
                { visa.map((data)=>{ 
                    return(             
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
                                                    
                    
                            <div style={{textAlign:"center", paddingLeft:"150px",paddingRight:"150px"}}>
                                <h4 style={{fontSize:"28px", fontWeight:"bold",color:"#400674", paddingBottom:"20px"}}>All Visa Information</h4> 

                                <table 
                                style={{width:"100%",borderStyle:"solid", border: "1px solid black",bordercollapse: "collapse"}} >
                                    
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Passenger Name </td>
                                        <td>-----</td>
                                        <td>{data.pessanger}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Passport  </td>
                                        <td>-----</td>
                                        <td>{data.passport}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>VisaNumber </td>
                                        <td>-----</td>
                                        <td>{data.visanumber}</td> 
                                    </tr>
                                    
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Credit </td>
                                        <td>-----</td>
                                        <td>  {data.credit}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Debit  </td>
                                        <td>-----</td>
                                        <td> {data.debit}</td> 
                                    </tr>
                                   
                                </table>     
                            </div>
                            
                        </div>
                    )})}
                </>
            
            </div>
           
        </div> 
    </CommonLayout>
  );
}

export default VisaView