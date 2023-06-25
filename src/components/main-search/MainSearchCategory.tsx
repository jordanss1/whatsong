import React from "react";
import MainSearchCategoryUnchosen from "./MainSearchCategoryUnchosen";
import MainSearchCategoryChosen from "./MainSearchCategoryChosen";
import { HandleCategoryHoverType } from "./MainSearch";

type MainSearchCategoryProps = {
  handleHover: HandleCategoryHoverType;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

const MainSearchCategory = ({
  handleHover,
  category,
  setCategory,
}: MainSearchCategoryProps) => {
  return (
    <>
      {category ? (
        <MainSearchCategoryChosen />
      ) : (
        <MainSearchCategoryUnchosen
          handleHover={handleHover}
          setCategory={setCategory}
        />
      )}
    </>
  );
};

export default MainSearchCategory;
