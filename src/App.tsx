import { AnimatePresence } from 'motion/react';
import { type ReactElement, useContext } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import ArtistDetails from './components/artist-details/ArtistDetails';
import ArtistList from './components/artist-list/ArtistList';
import Landing from './components/landing/Landing';
import MainSearch from './components/main-search/MainSearch';
import Modal from './components/modal/Modal';
import TrackList from './components/track-list/TrackList';
import SearchContext from './contexts/SearchState';
import './styles/all.css';

const App = (): ReactElement => {
  const location = useLocation();

  const { error, loading, noResults, modal, popout } =
    useContext(SearchContext);

  const showModal = loading || error || noResults || modal || popout;

  return (
    <>
      <AnimatePresence mode="wait">
        {showModal && (
          <Modal
            pathname={location.pathname}
            noResults={noResults}
            error={error}
            loading={loading}
            popout={popout}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.key}>
          <Route path="/" key={location.key} element={<Landing />} />
          <Route path="/search" key={location.key} element={<MainSearch />} />
          <Route path="/artists">
            <Route index key={location.key} element={<ArtistList />} />
            <Route
              path="/artists/:id"
              key={location.key}
              element={<ArtistDetails />}
            />
          </Route>
          <Route path="/tracks" key={location.key} element={<TrackList />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
