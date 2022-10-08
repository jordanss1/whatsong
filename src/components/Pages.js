import React, { useEffect, useContext } from "react";
import SearchContext from "../contexts/SearchStore";

const Pages = () => {
  const { setElements, setPage, page, items } = useContext(SearchContext);

  useEffect(() => {
    setPage(1);
  }, []);

  useEffect(() => {
    if (page === 1) {
      setElements([0, 10]);
    }
    if (page === 2) {
      setElements([11, 21]);
    }
    if (page === 3) {
      setElements([22, 32]);
    }
    if (page === 4) {
      setElements([33, 43]);
    }
  }, [page]);

  const handlePageClick = () => {
    document
      .getElementsByClassName("artistGrid")[0]
      .scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`w-100 pages justify-content-center  mb-lg-4 ${
        items.length === 0 ? "d-none" : "d-flex"
      }`}
    >
      <div className="d-flex justify-content-center justify-content-between pages w-75 fs-1">
        <p
          onClick={() => {
            setPage(1);
            handlePageClick();
          }}
        >
          1
        </p>
        <p
          hidden={Boolean(items.length < 11)}
          onClick={() => {
            setPage(2);
            handlePageClick();
          }}
        >
          2
        </p>
        <p
          hidden={Boolean(items.length < 21)}
          onClick={() => {
            setPage(3);
            handlePageClick();
          }}
        >
          3
        </p>
        <p
          hidden={Boolean(items.length < 31)}
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
