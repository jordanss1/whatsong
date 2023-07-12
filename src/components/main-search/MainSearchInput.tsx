import { FormEvent, ReactElement } from "react";
import { motion, Variants } from "framer-motion";

const wrapperVariants: Variants = {
  initial: {
    x: -200,
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      duration: 0.2,
      delay: 0.2,
    },
  },
  exit: (redo) => ({
    x: -200,
    opacity: 0,
    transition: {
      duration: redo ? 0.5 : 1,
    },
  }),
};

type MainSearchInputProps = {
  redo: boolean;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  searchTerm: string;
  handleSubmit: (e: FormEvent, term: string) => void;
};

const MainSearchInput = ({
  redo,
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
          custom={redo}
          initial="initial"
          animate="animate"
          exit="exit"
          className="main-input d-flex"
        >
          <input
            onChange={({ target }) => setSearchTerm(target.value)}
            className="flex-grow-1"
            placeholder="Search"
            type="text"
          />
          <button
            disabled={!searchTerm}
            type="submit"
            className="search-button"
          >
            <i className="search icon fs-5" />
          </button>
        </motion.div>
      </div>
    </form>
  );
};

export default MainSearchInput;
