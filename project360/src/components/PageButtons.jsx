import React, { useEffect } from "react";
import { useState } from "react";

function PageButtons({ page, setPage, totalRooms, currentRooms }) {
  const [first, setFirst] = useState(false);
  const [last, setLast] = useState(false);
  useEffect(() => {
    if (page === 0) {
      setFirst(true);
    } else {
      setFirst(false);
    }

    if (totalRooms - (page + 1) * 15 <= 0) {
      setLast(true);
    } else {
      setLast(false);
    }

    if (totalRooms > 0 && currentRooms === 0 && !(page === 0)) {
      setPage(page - 1);
    }
  }, [page, totalRooms, currentRooms]);

  const updatePage = (newpage) => {
    setPage(newpage);
  };

  return (
    <div className="flex flex-row justify-center h-12 w-full sm:fixed sm:left-[calc(100%-50%)] sm:bottom-2 sm:justify-start">
      <button
        className="bg-neutral-500 hover:bg-neutral-700 text-neutral-300  text-xl font-bold py-2 px-4 rounded-l-lg w-28 disabled:cursor-not-allowed disabled:opacity-50 "
        onClick={() => updatePage(page - 1)}
        disabled={first}
      >
        Prev
      </button>
      <span className="bg-neutral-700 w-16 text-center text-xl font-bold text-neutral-300 pt-2">
        {page + 1}
      </span>
      <button
        className="bg-neutral-500 hover:bg-neutral-700 text-neutral-300 text-xl font-bold py-2 px-4 rounded-r-lg w-28 disabled:cursor-not-allowed disabled:opacity-50"
        onClick={() => updatePage(page + 1)}
        disabled={last}
      >
        Next
      </button>
    </div>
  );
}
export default PageButtons;
