import { Header } from '../../components';
import { Link, useParams } from "react-router-dom";
import React from 'react'; 
import { CommonLayout,Pagination } from '../../components';
import { useEffect,useState } from 'react';
import { BsEye, BsTrash, BsPencilSquare } from "react-icons/bs";
import { 
  collection, 
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore"; 
import { db } from '../../model/firebase';

export const tableHeading = [
  "Agency Name", 
  "Client Name", 
  "Email", 
  "Address", 
  "Phone - 1", 
  "Phone - 2",
  "Action",

]

const ClientViewPage = () => {
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
          collection(db,"Client"), 
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
    console.log(data);

    const handleDelete = async (id) => {
      try{
          await deleteDoc(doc(db,"Client",id)); 
          setData(data.filter((item)=>item.id !== id)); 
      }catch(err){
          console.log(err); 
      }
    }
  return (
    <CommonLayout>
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <div className='flex justify-between'>
        <Header category="Page" title="Clients" />  
        <Link to={"/add-clients"}>
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
                    {tableHeading.map((heading, index) => (
                    <th
                        key={index}
                        className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
                    >
                        {heading}
                    </th>
                    ))}
                </tr>
                </thead>
                <tbody>
                    {data ?.map((datas, index)=>{
                        const tableClass = "p-2 whitespace-nowrap text-gray-900 border-[1px]";
                        return(
                            <tr key={index} className="border-[1px]">
                                {/* <td className={tableClass}>{datas ?. id}</td> */}
                                <td className={tableClass}>{datas ?. agency}</td>
                                <td className={tableClass}>{datas ?. clientName}</td>
                                <td className={tableClass}>{datas ?. email}</td>
                                <td className={tableClass}>{datas ?. address}</td>
                                <td className={tableClass}>{datas ?. phone_1}</td>
                                <td className={tableClass}>{datas ?. phone_2}</td>
                                <td className={`py-4 px-6 flex justify-center text-center gap-1 ${tableClass}`}>

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

export default ClientViewPage