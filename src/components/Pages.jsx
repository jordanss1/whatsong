import React, { useEffect, useContext } from "react";
import SearchContext from "../contexts/SearchStore";

const Pages = () => {
  const { setSlicedElements, page, setPage, items } = useContext(SearchContext);

  const handlePageClick = () => {
    if (window.innerWidth < 992)
      document
        .getElementsByClassName("artistGrid")[0]
        .scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (page === 1) {
      setSlicedElements([0, 10]);
    }
    if (page === 2) {
      setSlicedElements([11, 21]);
    }
    if (page === 3) {
      setSlicedElements([22, 32]);
    }
    if (page === 4) {
      setSlicedElements([33, 43]);
    }
  }, [page]);

  const pagesWidth = () => {
    if (items.length < 21) {
      return "w-25";
    } else if (items.length < 31) {
      return "w-50";
    } else if (items.length > 31) {
      return "w-75";
    }
  };

  return (
    <div
      className={`w-100 pages justify-content-center  mb-lg-4 ${
        items.length === 0 ? "d-none" : "d-flex"
      }`}
    >
      <div
        className={`d-flex justify-content-center justify-content-between pages ${pagesWidth()} fs-1`}
      >
        <p
          style={
            page === 1
              ? { cursor: "default", color: "white" }
              : { cursor: "pointer" }
          }
          hidden={items.length < 11}
          onClick={() => {
            setPage(1);
            handlePageClick();
          }}
        >
          1
        </p>
        <p
          style={
            page === 2
              ? { cursor: "default", color: "white" }
              : { cursor: "pointer" }
          }
          hidden={items.length < 11}
          onClick={() => {
            setPage(2);
            handlePageClick();
          }}
        >
          2
        </p>
        <p
          style={
            page === 3
              ? { cursor: "default", color: "white" }
              : { cursor: "pointer" }
          }
          hidden={items.length < 21}
          onClick={() => {
            setPage(3);
            handlePageClick();
          }}
        >
          3
        </p>
        <p
          style={
            page === 4
              ? { cursor: "default", color: "white" }
              : { cursor: "pointer" }
          }
          hidden={items.length < 31}
          onClick={() => {
            setPage(4);
            handlePageClick();
          }}
        >
          4
        </p>
      </div>
    </div>
  );
};

export default Pages;
