import React from 'react';
import { DOTS, usePagination } from '../hooks/usePagination';
import {AiOutlineDoubleLeft, AiOutlineDoubleRight} from 'react-icons/ai'
const Pagination = props => {
    console.log(props);
  const {
    onPageChange,
    totalCount,
    siblingCount = 1,
    currentPage,
    pageSize,
    className
  } = props;

  const paginationRange = usePagination({
    currentPage,
    totalCount,
    siblingCount,
    pageSize,
  });

 

  if (currentPage === 0 || paginationRange.length < 2) {
    return null;
  }

  const onNext = () => {
    onPageChange(currentPage + 1);
  };

  const onPrevious = () => {
    onPageChange(currentPage - 1);
  };

  let lastPage = paginationRange[paginationRange.length - 1];
  return (
    <ul
      className="flex justify-center items-center gap-5"
    >
      <li
        className={`${currentPage === 1 && "invisible"} cursor-pointer`}
        onClick={onPrevious}
      >
        <AiOutlineDoubleLeft />
      </li>
      {paginationRange.map(pageNumber => {
        if (pageNumber === DOTS) {
          return <li className="">...</li>;
        }

        return (
          <li
          className={`bg-blue-800 w-6 h-6 rounded-full flex justify-center items-center text-white hover:ring-2 ring-sky-400 cursor-pointer ${pageNumber === currentPage && "bg-sky-500 "}`}
            onClick={() => onPageChange(pageNumber)}
          >
            {pageNumber}
          </li>
        );
      })}
      <li
        className={`${currentPage === lastPage && "invisible"} cursor-pointer`}
        onClick={onNext}
      >
        <AiOutlineDoubleRight />
      </li>
    </ul>
  );
};

export default Pagination;
