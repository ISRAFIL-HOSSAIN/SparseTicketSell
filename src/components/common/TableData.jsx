import React from "react";
import { BsEye, BsLock, BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";

export const tableHeading = [
    "Id",
    "Name",
    "Agency Name",
    "Email",
    "Phone-1",
    "Phone-2",
    "Address",
    
];

function TableData({datas, changeStatus}) {
  return (
    <div className={`overflow-hidden`}>
      <table className="min-w-full border-[1px] rounded-md shadow-lg">
        <thead className="">
          {/* tabs */}

          <tr className="bg-slate-100 border-b-[1px]">
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
          {datas?.map((data, index) => {
            const tableClass =
              "p-2 whitespace-nowrap text-gray-900 border-[1px]";
            return (
              <tr key={index} className="border-[1px]">
                <td className={tableClass}>{data?.roleName || "N/A"}</td>
                <td className={tableClass}>
                  {data?.firstName || "N/A"} {data?.lastName}
                </td>
                <td className={tableClass}>{data?.email || "N/A"}</td>
                <td className={tableClass}>{data?.phoneNumber || "N/A"}</td>
                <td className={tableClass}>{data?.address || "N/A"}</td>
                <td className={tableClass}>{data?.createdBy || "N/A"}</td>
                <td
                  className={`flex justify-center text-center gap-1 ${tableClass}`}
                >
                  <Link to={"/users/view/" + data?.id}>
                    <button>
                      <BsEye className="bg-green-500 text-white p-1 w-6 h-6 rounded-sm" />
                    </button>
                  </Link>
                  <Link to={"/users/edit/" + data?.id}>
                    <button>
                      <BsPencilSquare className="bg-blue-500 text-white p-1 w-6 h-6 rounded-sm" />
                    </button>
                  </Link>
                  <Link to={""}>
                    <button onClick={() => changeStatus(data.id)}>
                      <BsLock className="bg-red-500 text-white p-1 w-6 h-6 rounded-sm" />
                    </button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableData;
