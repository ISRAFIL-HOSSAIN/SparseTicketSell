import React from "react";
import { Link } from "react-router-dom";

function TableHeader({heading, btnText, btnLink}) {
  return (
    <div className="min-w-full bg-slate-100 text-lg px-5 py-2 rounded-sm flex justify-between items-center">
      <p className="font-bold">{heading}</p>
      <Link to={btnLink} >
        <button className="bg-green-600 px-3 py-1 rounded-md text-white">
          {btnText}
        </button>
      </Link>
    </div>
  );
}

export default TableHeader;
