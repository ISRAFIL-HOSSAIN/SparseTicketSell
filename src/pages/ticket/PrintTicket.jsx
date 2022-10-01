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

const PrintTicket = () => {
    const [ ticketsinformation , setTicketinformation ] = useState([]); 
    
    const {id} = useParams(); 
    const componentRef = useRef();
 
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });
    
    
    useEffect(()=>{
     
        const ticketinfo =  async ()=> {
            try{
                const docRef = doc(db,"tickets", id); 
                const docSnap = await getDoc(docRef);
                setTicketinformation(docSnap.data());
            }
            catch(error){
                console.log(error); 
            }
        }     
        
        ticketinfo(); 
       
    },[]);

    console.log('ticketinformation is : .......', ticketsinformation)
    const ticket = [ticketsinformation]; 
    console.log("ALl Ticket are : ", ticket); 
    
    // const Calculate =(buyPayment,bvalue)=>{
    //     let cal = parseInt(buyPayment) - parseInt(bvalue); 
    //     console.log(cal); 
    //     setDueBuyerAmount(cal); 
    // }
   
  return (
    <CommonLayout>
        <div className="m-2 md:m-10 mt-20 p-10 md:p-10 bg-white rounded-3xl">
            <div className='flex justify-between'>
            <Link to={"/tickets"}>
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
                { ticket.map((data)=>{ 
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
                                <h4 style={{fontSize:"28px", fontWeight:"bold",color:"#400674", paddingBottom:"20px"}}>All Ticket Information</h4> 

                                <table 
                                style={{width:"100%",borderStyle:"solid", border: "1px solid black",bordercollapse: "collapse"}} >
                                    
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Airlines </td>
                                        <td>-----</td>
                                        <td>{data.airlines}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Issue Date </td>
                                        <td>-----</td>
                                        <td>{data.issuedate}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Flight Date </td>
                                        <td>-----</td>
                                        <td>{data.flightdate}</td> 
                                    </tr>
                                    
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Pax-Name </td>
                                        <td>-----</td>
                                        <td>  {data.paxname}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>PNR </td>
                                        <td>-----</td>
                                        <td> {data.pnr}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Ticket Number </td>
                                        <td>-----</td>
                                        <td> {data.ticketnumber}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Travel Place </td>
                                        <td>-----</td>
                                        <td> {data.travelplace}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Destination Place </td>
                                        <td>-----</td>
                                        <td> {data.destination}</td> 
                                    </tr>
                                </table> 
                            
                                
                            </div>
                            <div style={{textAlign:"center", paddingLeft:"50px",paddingLeft:"150px",paddingRight:"150px", paddingTop:"20px"}}>
                            <h4 style={{fontSize:"18px", fontWeight:"bold",color:"#570528", paddingBottom:"20px"}}>Buyer and Seller Information</h4> 
                                <table 
                                style={{width:"100%",borderStyle:"solid", border: "1px solid black",bordercollapse: "collapse"}} >
                                    
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Buy-Agency Name </td>
                                        <td>-----</td>
                                        <td>{data.buyagency}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Buy Ticket Price </td>
                                        <td>-----</td>
                                        <td>{data.buyticket}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Seller Ticket Price </td>
                                        <td>-----</td>
                                        <td>{data.sellagency}</td> 
                                    </tr>
                                    <tr style={{width:"33%",border:"1px solid grey",bordercollapse: "collapse"}}>
                                        <td>Sell Ticket Price </td>
                                        <td>-----</td>
                                        <td>{data.buyticket}</td> 
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

export default PrintTicket