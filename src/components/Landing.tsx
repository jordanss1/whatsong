import { useEffect, useRef, useState, useContext, ReactElement } from "react";
import SearchContext from "../contexts/SearchStore";
import NavBar from "./NavBar";
import "../styles/all.css";
import { motion } from "framer-motion";
import { UseSearchStateContext } from "../contexts/SearchState";

const Landing = (): ReactElement => {
  const { navigate } = useContext<UseSearchStateContext>(SearchContext);

  const [wrapperClass, setWrapperClass] = useState<string>("");
  const [navClass, setNavClass] = useState<string>("");
  const [iconClass, setIconClass] = useState<string>("");
  const [iconDivClass, setIconDivClass] = useState<string>("");
  const [poweredClass, setPoweredClass] = useState<string>("");

  const hover = useRef<boolean>(false);
  const timeoutId = useRef<NodeJS.Timeout | number | null>(null);

  const animations = {
    initial: { opacity: 0.5, y: 0 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -200 },
  };

  useEffect(() => {
    setNavClass("navClassAnimate");

    return () => {
      clearTimeout(timeoutId.current as number);
    };
  }, []);

  const handleClick = (): void => {
    setNavClass("");
    setWrapperClass("wrapperLoad");

    timeoutId.current = setTimeout(() => {
      navigate("/search");
    }, 1000);
  };

  const handleHover = (): void => {
    hover.current = !hover.current;

    if (hover.current) {
      setIconDivClass("spotifyLoad");
      setIconClass("spotifyHover");
      setPoweredClass("poweredHover");
      setNavClass("");
    } else if (!hover.current) {
      setNavClass("navClassAnimate");
    }
  };

  const content: ReactElement = (
    <>
      w<span className="me-1 pt-2 extraText fs-5">.hat</span>s
      <span className="ms-2 extraText fs-5">.ong</span>
    </>
  );

  return (
    <motion.main
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      className="landingContainer d-flex flex-column"
    >
      <NavBar navClass={navClass} content={content} />
      <div className={`wrapper ${wrapperClass} h-100`}>
        <div className="d-flex h-100 justify-content-center align-items-center flex-column-reverse mainDiv">
          <button
            onMouseEnter={() => handleHover()}
            onMouseLeave={() => handleHover()}
            onClick={() => handleClick()}
            type="button"
            className="btn btn-outline-dark fs-4 rounded-pill p-3 px-5 startButton"
          >
            Get started!
          </button>
          <div
            className={`d-flex border rounded-3 p-5 pt-3 pb-3 ${iconDivClass} spotifyDiv`}
          >
            <h2 className={`fs-5 me-2 mt-2 powered ${poweredClass}`}>
              Powered by
            </h2>
            <i className={`spotify icon fs-1 ${iconClass} spotifyNav`}></i>
          </div>
        </div>
      </div>
    </motion.main>
  );
};

export default Landing;
