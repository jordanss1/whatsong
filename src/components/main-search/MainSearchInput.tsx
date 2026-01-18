import { motion, type Variants } from 'motion/react';
import { type FormEvent, type ReactElement } from 'react';
import SearchButton from '../searchbar/SearchButton';

const wrapperVariants: Variants = {
  initial: {
    x: -200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 70,
      duration: 0.2,
      delay: 0.2,
    },
  },
  exit: {
    x: -200,
    opacity: 0,
    transition: {
      duration: 0.5,
    },
  },
};

type MainSearchInputProps = {
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  handleSubmit: (e: FormEvent, term: string) => void;
};

const MainSearchInput = ({
  setSearchTerm,
  searchTerm,
  handleSubmit,
}: MainSearchInputProps): ReactElement => {
  return (
    <form
      onSubmit={(e) => {
        if (searchTerm) {
          handleSubmit(e, searchTerm);
        }
      }}
      className="form-container d-flex justify-content-center align-items-start w-100 h-50"
    >
      <div className="input-container w-100 d-flex align-items-center justify-content-center">
        <motion.div
          variants={wrapperVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="main-input d-flex"
        >
          <input
            value={searchTerm}
            onChange={({ target }) => setSearchTerm(target.value)}
            className="flex-grow-1"
            placeholder="Search"
            type="text"
            data-testid="main-search-input"
          />
          <SearchButton searchTerm={searchTerm} />
        </motion.div>
      </div>
    </form>
  );
};

export default MainSearchInput;
