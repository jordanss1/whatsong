import { ReactElement } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import HeaderSearchLogo from "./HeaderSearchLogo";
import SearchBar from "../searchbar/SearchBar";
import SearchButton from "../searchbar/SearchButton";
import { useMediaQuery } from "../../hooks/MediaQueryHook";
import "./styles/header.css";
import HeaderSearchSearchBar from "./HeaderSearchSearchBar";

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

type HeaderSearchPropsType = {
  headerCycle: string;
  searchCycle: boolean;
  handleClick: (exit?: boolean) => void;
};

const HeaderSearch = ({
  headerCycle,
  handleClick,
  searchCycle,
}: HeaderSearchPropsType): ReactElement => {
  const is468 = useMediaQuery(468);

  const flex =
    is468 && headerCycle === "transparent"
      ? "justify-content-start"
      : "justify-content-center";

  console.log(searchCycle);

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
      <AnimatePresence onExitComplete={() => handleClick(true)}>
        {searchCycle && headerCycle === "transparent" && (
          <HeaderSearchSearchBar />
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default HeaderSearch;
