import { ReactElement } from "react";
import { motion, Variants } from "framer-motion";
import HeaderSearchLogo from "./HeaderSearchLogo";
import SearchBar from "../searchbar/SearchBar";
import SearchButton from "../searchbar/SearchButton";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/header.css";

const containerVarients: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.2,
      delay: 1,
    },
  },
  exit: {
    y: -300,
    transition: {
      duration: 0.5,
      delay: 0,
    },
  },
  transparent: {
    background:
      "linear-gradient(to right,rgb(0, 3, 55, .5) 10%,rgb(0, 3, 79) 50%,rgb(0, 3, 55, .5) 95%)",
    opacity: 1,
  },
};

const searchBarVariants: Variants = {
  initial: { y: -20, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  exit: { y: -20, opacity: 0 },
};

type HeaderSearchPropsType = {
  headerCycle: string;
  searchCycle: boolean;
  handleClick: () => void;
};

const HeaderSearch = ({
  headerCycle,
  handleClick,
  searchCycle,
}: HeaderSearchPropsType): ReactElement => {
  const is468 = useMediaQuery(468);

  const flex = is468
    ? "justify-content-start justify-content-evenly"
    : "justify-content-center";

  return (
    <motion.header
      variants={containerVarients}
      initial="initial"
      animate={headerCycle}
      exit="exit"
      className="header-search d-flex flex-column align-items-center justify-content-center"
      layout
    >
      <div className={`d-flex ${flex} align-items-center px-3 w-100`}>
        <HeaderSearchLogo />
        {headerCycle === "transparent" && (
          <SearchButton x={is468 ? 0 : 25} size={4} handleClick={handleClick} />
        )}
      </div>
      {searchCycle && headerCycle === "transparent" && (
        <motion.div
          variants={searchBarVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="header-search-bar px-3"
        >
          <SearchBar />
        </motion.div>
      )}
    </motion.header>
  );
};

export default HeaderSearch;
