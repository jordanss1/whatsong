import { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../../contexts/SearchStore";
import "../../styles/all.css";
import { UseSearchStateContext } from "../../contexts/SearchState";
import HeaderContent from "./HeaderContent";

const Header = ({ path }: { path: string }): ReactElement => {
  const { setTerm } = useContext<UseSearchStateContext>(SearchContext);

  console.log(path);

  return (
    <>
      <header className={`navClass d-flex justify-content-center`}>
        <NavLink
          onClick={() => {
            setTerm("");
          }}
          className="text-uppercase"
          to="/search"
        >
          <HeaderContent path={path} />
        </NavLink>
      </header>
    </>
  );
};

export default Header;
