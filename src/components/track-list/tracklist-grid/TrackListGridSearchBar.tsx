import { AnimatePresence, motion } from 'motion/react';
import { type ReactElement, useEffect } from 'react';
import {
  searchBarContainerVariants,
  searchBarVariants,
} from '../../artist-list/ArtistListSearchBar';
import SearchBar from '../../searchbar/SearchBar';

type TrackListGridSearchBarPropsType = {
  cycle: string;
  searched: boolean;
};

const TrackListGridSearchBar = ({
  cycle,
  searched,
}: TrackListGridSearchBarPropsType): ReactElement => {
  useEffect(() => {
    if (!searched && cycle === 'transparent') {
      window.scrollTo({ top: 0 });
    }
  }, [searched]);

  return (
    <motion.div
      variants={searchBarContainerVariants}
      className="d-flex align-items-center justify-content-end w-100 track-list-search"
    >
      <AnimatePresence mode="wait">
        {cycle === 'animate' && (
          <motion.div
            variants={searchBarVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="track-list-search-div"
          >
            <SearchBar />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default TrackListGridSearchBar;
