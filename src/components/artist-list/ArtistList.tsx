import { ReactElement, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  motion,
  Variants,
  AnimatePresence,
  useScroll,
  useAnimationControls,
  useCycle,
} from "framer-motion";
import Header from "../header/Header";
import ArtistListGrid from "./ArtistListGrid";
import ArtistListSearchBar from "./ArtistListSearchBar";
import SearchContext from "../../contexts/searchContext/SearchState";
import "./styles/artist-list.css";

const artistContainerVariants: Variants = {
  initial: {
    background:
      "radial-gradient(circle at 100% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%), radial-gradient(circle at 0% 50%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 1) 10%,transparent 60%)",
  },
  animate: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133) 0%,rgba(0, 5, 133, 0.2) 20%,transparent 90%)",
    transition: {
      delay: 0.5,
      duration: 0.5,
      staggerChildren: 0.02,
      when: "beforeChildren",
    },
  },
  exit: {
    background:
      "radial-gradient(circle at 100% 0%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%), radial-gradient(circle at 0% 100%,rgb(0, 5, 133, 0) 0%,rgba(0, 5, 133, 0) 20%,transparent 90%)",
    transition: {
      duration: 0.3,
      when: "afterChildren",
      staggerChildren: 0.005,
    },
  },
};

const ArtistList = (): ReactElement => {
  const { artists, setArtistsOrTracks, searched } = useContext(SearchContext);

  const { scrollY } = useScroll();

  const controls = useAnimationControls();
  const [headerCycle, cycleHeader] = useCycle("animate", "transparent");

  const location = useLocation();

  useEffect(() => {
    let artists = sessionStorage.getItem("artists");

    sessionStorage.removeItem("artist-details");

    if (artists && typeof artists === "string") {
      setArtistsOrTracks(JSON.parse(artists));
    }
  }, []);

  useEffect(() => {
    scrollY.on("change", async () => {
      if (scrollY.get() > 55) {
        await controls.start({
          opacity: 0,
          x: 20,
          transition: {
            duration: 0.3,
          },
        });
        cycleHeader(1);
      } else {
        cycleHeader(0);
        await controls.start({
          opacity: 1,
          x: 0,
          transition: {
            duration: 0.3,
          },
        });
      }
    });
  }, []);

  return (
    <>
      {artists && (
        <motion.main
          variants={artistContainerVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="artistWholeListContainer d-flex flex-column px-1"
        >
          <Header headerCycle={headerCycle} path={location.pathname} />
          <div className="filler-div" />
          <section className="w-100 h-100 artist-list-container d-grid py-4 px-1">
            <ArtistListSearchBar controls={controls} />
            <AnimatePresence mode="wait">
              {!searched && (
                <ArtistListGrid searched={searched} artists={artists} />
              )}
            </AnimatePresence>
          </section>
          <div className="filler-div" />
        </motion.main>
      )}
    </>
  );
};

export default ArtistList;
