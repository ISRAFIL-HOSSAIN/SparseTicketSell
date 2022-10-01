import React,{useEffect,useState} from 'react'; 
import { Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import { CommonLayout,Pagination } from '../../components';
import { BsEye, BsTrash, BsPencilSquare } from "react-icons/bs";
import { 
    collection, 
    getDocs,
    deleteDoc,
    doc,
    onSnapshot,
} from "firebase/firestore"; 
import { db } from '../../model/firebase';
import {notification,Spin,Skeleton , Divider } from "antd"; 

export const SellertableHeading = [
    "Date",
    "Sell  Agency Name",
    "Selling Ticket Price",
    "Take Amount", 
    "Selling Ticket Due", 
    "Transaction Type", 
    "Note",
    "Status", 
    "Action",  

]



const SellerAgencyPayment = () => {
    const [pageSize, setPageSize] = useState(2);
    const [users, setUsers] = useState({currentPage: 1, model: [], totalElements: 4, totalPages: 1});
    const [currentPage, setCurrentPage] = useState(1);
    const [data,setData] = useState([]); 

    useEffect(()=>{
        // const fetchData = async()=>{
        //     let list=[]

        //     try{
        //         const querySnapshot = await getDocs(collection(db,"payment"))
        //         querySnapshot.forEach((doc) => {
        //             list.push({id:doc.id, ...doc.data()})
        //             // console.log(doc.id, "=>",doc.data()); 
        //         }); 
        //         setData(list); 
        //         console.log(list);
        //     }
        //     catch(err){
        //         console.log(err); 
        //     }
        // }
        // fetchData();

        // Listen ( Realtime ) 
        const unsub = onSnapshot(
            collection(db,"sellerInformation",), 
            (snapShot) =>{
                let list = []; 
                snapShot.docs.forEach((doc)=>{
                    list.push({id:doc.id, ...doc.data() }); 
                });
                setData(list);     
            }, 
            (error)=>{
                console.log(error); 
            }
        );
        
        return ()=>{
            unsub();          
        };
    },[]);
    
    // console.log(data); 
    // myticket(...ticket); 
    // function myticket({buyticket,sellticket}){
    //     console.log("MyTicket is : " , buyticket , sellticket ); 
    // }

    const handleDelete = async (id) => {
        try{
            await deleteDoc(doc(db,"sellerInformation",id)); 
            setData(data.filter((item)=>item.id !== id)); 
            notification["success"]({
                message: "Successfully Deleted",
              });
        }catch(err){
            console.log(err);
            notification["Error"]({
                message: "Something Was Wrong",
              }); 
        }
    }

  return (
    <CommonLayout>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <div className='flex justify-between'>
            <Header category="Payments" title="Seller Agency Information" />  
            <Link to={"/payment/add-seller-payment"}>
                <button className="bg-green-600 px-3 py-1 rounded-md text-white">
                    + Add
                </button>
            </Link>  
        </div>
        <div className={`overflow-x-auto relative shadow-md sm:rounded-lg`}>
            <table className="w-full border-[1px] rounded-md shadow-lg">
                <thead className=" text-gray-700  bg-gray-50">
                {/* tabs */}

                <tr className=" bg-gray-200 border-b-[1px]">
                    {SellertableHeading.map((heading, index) => (
                    <th
                        key={index}
                        className="text-sm font-sans font-serif font-medium text-gray-900 px-6 py-4  text-left"
                    >
                        {heading}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {data ?.map((datas, index)=>{
                        
                        <Skeleton />;
                        const tableClass = "p-1 whitespace-nowrap text-gray-900 border-[1px]";
                        
                        return(
                            
                            <tr key={index} className="border-[1px] font-serif text-sm text-center">
                                <td className={tableClass}>{datas ?. date}</td>
                                <td className={tableClass}>{datas ?. sellagency}</td>
                                <td className={tableClass}>{datas ?. Payment}</td>
                                <td className={tableClass}>{datas ?. takepayment}</td>
                                <td className={tableClass}>{datas ?. DuePayment}</td>
                                <td className={tableClass}>{datas ?. transaction}</td>
                                <td className={tableClass}>{datas ?. note}</td>
                                {
                                parseInt(datas?.Payment) > parseInt(datas?.takepayment) ? 
                                <td className={tableClass} style={{color:"red"}}>Due</td>
                                : 
                                parseInt(datas?.Payment) === parseInt(datas?.takepayment) ?
                                <td className={tableClass} style={{color:"green"}}>Paid</td>
                                :
                                parseInt(datas?.Payment) < parseInt(datas?.takepayment) ?
                                <td className={tableClass} style={{color:"orange"}}>Seller Back Amount TK: {datas?.DuePayment}</td>
                                :
                                <td className={tableClass} style={{color:"blue"}}>Processing</td>
                                
                                }

                              
                                <td className={`py-4 px-6 flex justify-center text-center gap-1 ${tableClass}`}>
                                    <Link to={`/payment/view-seller/${datas.id}`}>
                                        <button>
                                        <BsEye className="bg-green-500 text-white p-1 w-6 h-6 rounded-sm" />
                                        </button>
                                    </Link>
                                    <Link to={`/payment/edit-seller/${datas.id}`}>
                                        <button>
                                        <BsPencilSquare className="bg-blue-500 text-white p-1 w-6 h-6 rounded-sm" />
                                        </button>
                                    </Link>
                                    <Link to={""}>
                                        <button onClick={()=>handleDelete(datas.id)}>
                                        <BsTrash className="bg-red-500 text-white p-1 w-6 h-6 rounded-sm" />
                                        </button>
                                    </Link>
                                </td>
                            </tr>
                            
                        );
                    })}
                    
                </tbody>
            </table>
        </div>

        <div style={{height:"50px" , justifyContent:"center" , paddingTop:"10px"}}>
            <Pagination className="" currentPage={users.currentPage} pageSize={pageSize} totalCount={users.totalElements}  onPageChange={page => setCurrentPage(page)}/>
        </div>
    </div>
    </CommonLayout>
  )
}

export default SellerAgencyPayment