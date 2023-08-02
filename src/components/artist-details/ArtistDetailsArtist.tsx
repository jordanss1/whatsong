import { ReactNode, ReactElement } from "react";
import { ArtistsType } from "../../types/types";
import { NavigateFunction } from "react-router-dom";
import { AnimatePresence, Variants, motion } from "framer-motion";
import Spotify from "../Spotify";
import Exit from "../Exit";
import Seperator from "../Seperator";
import "./styles/artist-details.css";

type PropTypes = {
  artistDetail: ArtistsType;
  isOneColumn: boolean;
  navigate: NavigateFunction;
  styles: { background: string };
  children: ReactNode;
};

const leftVariants: Variants = {
  initial: {
    width: "50%",
    height: "100%",
    opacity: 0,
  },
  animate: {
    width: "100%",
    height: "100%",
    opacity: 1,
    transition: {
      type: "tween",
      ease: "easeInOut",
      delay: 1.5,
      duration: 1,
      opacity: {
        delay: 1,
        duration: 1,
      },
    },
  },
  exit: {
    scale: 1.1,
    opacity: 0,
    transition: {
      delay: 0.5,
      duration: 0.5,
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const headerVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      type: "tween",
      duration: 1,
    },
  },
  exit: {
    x: -70,
    opacity: 0,
    transition: {
      type: "tween",
      ease: "easeInOut",
    },
  },
};

const artistInfoVariants: Variants = {
  initial: {
    display: "none",
  },
  animate: (isOneColumn) => ({
    display: "grid",
    transition: {
      delay: isOneColumn ? 1.2 : 1.7,
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.4,
    },
  }),
  exit: {
    opacity: 0,
    transition: {
      delay: 0.5,
      staggerChildren: 0.2,
    },
  },
};

const ArtistDetailsArtist = ({
  artistDetail,
  isOneColumn,
  navigate,
  styles,
  children,
}: PropTypes): ReactElement => {
  const { external_urls, name, followers } = artistDetail;

  const renderArtistHeader = (
    <>
      {followers.total ? (
        <>
          <h1 className="fs-1">{name}</h1>
        </>
      ) : (
        <div className="d-flex gap-1 align-items-center justify-content-center">
          <h1 className="fs-1 pe-2 no-followers-name">{name}</h1>
          <Seperator sharp={false} width="2px" height="30px" />
          <Spotify url={external_urls.spotify} size={1} className="ps-2" />
        </div>
      )}
    </>
  );

  const renderFollowers = (
    <div className="d-flex w-100 justify-content-center">
      <Spotify className="pe-5 me-3" url={external_urls.spotify} />
      <Seperator sharp={false} width="1px" height="100%" />
      <h2 className="fs-5 pt-1 ps-4">
        {followers.total?.toLocaleString("US")}
        {followers.total === 1 ? " follower" : " followers"}
      </h2>
    </div>
  );

  return (
    <AnimatePresence mode="sync">
      {!isOneColumn && (
        <motion.section
          key="left-bg"
          variants={leftVariants}
          layout
          layoutId="left"
        >
          <motion.div className="artist-bg w-100 h-100" style={styles} />
        </motion.section>
      )}
      <motion.section
        key="artist-details"
        variants={artistInfoVariants}
        custom={isOneColumn}
        layout
        layoutId="right"
        className="w-100 h-100 artist-right"
      >
        <motion.div
          variants={headerVariants}
          className="d-flex flex-column align-items-center justify-content-center artist-heading"
        >
          <div className="w-100 d-flex justify-content-end pe-5">
            <Exit handleClick={() => navigate("artists")} size={1} />
          </div>
          {renderArtistHeader}
          <hr className="w-50 mt-1" />
          {followers.total !== 0 && renderFollowers}
        </motion.div>
        {children}
      </motion.section>
    </AnimatePresence>
  );
};

export default ArtistDetailsArtist;
