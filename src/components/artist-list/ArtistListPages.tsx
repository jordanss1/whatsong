import { useEffect, useContext } from "react";
import SearchContext from "../../contexts/SearchStore";

interface PageStyle {
  cursor: string;
  color?: string;
}

const ArtistListPages = () => {
  const { page, setPage, totalArtists } = useContext(SearchContext);

  const handlePageClick = (): void => {
    if (window.innerWidth < 949) {
      window.scrollTo(0, 0);
    }
  };

  const pagesWidth = () => {
    if (totalArtists < 21) {
      return "w-25";
    } else if (totalArtists < 31) {
      return "w-50";
    } else if (totalArtists > 31) {
      return "w-75";
    }
  };

  const pageStyle = (num: number): PageStyle => {
    if (page === num) {
      return { cursor: "default", color: "white" };
    }
    return { cursor: "pointer" };
  };

  return (
    <div
      className={`w-100 pages justify-content-center align-items-center ${
        totalArtists === 0 ? "d-none" : "d-flex"
      }`}
    >
      <div
        className={`d-flex justify-content-center justify-content-between pages ${pagesWidth()} fs-1`}
      >
        <p
          style={pageStyle(1)}
          hidden={totalArtists < 11}
          onClick={() => {
            setPage(1);
            handlePageClick();
          }}
        >
          1
        </p>
        <p
          style={pageStyle(2)}
          hidden={totalArtists < 11}
          onClick={() => {
            setPage(2);
            handlePageClick();
          }}
        >
          2
        </p>
        <p
          style={pageStyle(3)}
          hidden={totalArtists < 21}
          onClick={() => {
            setPage(3);
            handlePageClick();
          }}
        >
          3
        </p>
        <p
          style={pageStyle(4)}
          hidden={totalArtists < 31}
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

export default ArtistListPages;
