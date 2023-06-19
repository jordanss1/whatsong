import { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../../contexts/searchContext/SearchStore";
import "../../styles/all.css";
import { UseSearchStateContext } from "../../contexts/searchContext/SearchState";
import HeaderContent from "./HeaderContent";
import "./styles/header.css";

const Header = ({ path }: { path: string }): ReactElement => {
  const { setTerm } = useContext<UseSearchStateContext>(SearchContext);

  const linkPath = path === "/" ? "" : "/search";

  return (
    <>
      <header className={`navClass d-flex justify-content-center`}>
        <NavLink
          onClick={() => {
            setTerm("");
          }}
          className="text-uppercase"
          to={linkPath}
        >
          <HeaderContent path={path} />
        </NavLink>
      </header>
    </>
  );
};

export default Header;
