import { ReactElement, useContext } from "react";
import { NavLink } from "react-router-dom";
import SearchContext from "../contexts/SearchStore";
import "../styles/all.css";
import { UseSearchStateContext } from "../contexts/SearchState";

type NavBarPropTypes = {
  content: ReactElement;
  navClass?: string;
};

const NavBar = ({ content, navClass }: NavBarPropTypes): ReactElement => {
  const { setTerm } = useContext<UseSearchStateContext>(SearchContext);

  return (
    <>
      <header className={`navClass ${navClass} d-flex justify-content-center`}>
        <NavLink
          onClick={() => {
            setTerm("");
          }}
          className="text-uppercase"
          to="/search"
        >
          {content}
        </NavLink>
      </header>
    </>
  );
};

export default NavBar;
