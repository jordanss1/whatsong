import React, { useState, useEffect } from "react";
import { HandleButtonClickType } from "./MainSearch";
import MainSearchButton from "./MainSearchButton";
import "./styles/main-search.css";

type MainSearchFormPropTypes = {
  term: string;
  setTerm: React.Dispatch<string>;
  handleButtonClick: HandleButtonClickType;
};

const MainSearchForm = ({
  term,
  setTerm,
  handleButtonClick,
}: MainSearchFormPropTypes) => {
  const [mainDivClass, setMainDivClass] = useState<string>("");
  const [instructionsClass, setInstructionsClass] = useState<string>("");
  const [formClass, setFormClass] = useState<string>("");

  useEffect(() => {
    if (term) {
      setInstructionsClass("instructionsFloat");
      setFormClass("wholeFormMoved");
    }
  }, [term]);

  return (
    <>
      <div
        className={`instructionsDiv ${instructionsClass} d-flex flex-column justify-content-center p-4`}
      >
        <h1 className="text-center fs-4">Search artists or songs</h1>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className={`d-flex flex-column justify-content-center align-items-center wholeForm ${formClass} w-100 h-50`}
      >
        <div className="w-100 d-flex justify-content-center main-search-div-outer">
          <div className={`ui input main-search-div ${mainDivClass} w-50`}>
            <input
              role="search-all-input"
              onFocus={() => setMainDivClass("main-search-div-focus")}
              onBlur={() => setMainDivClass("")}
              value={term}
              onChange={({ target }) => setTerm(target.value)}
              type="text"
              placeholder="Search..."
              data-dashlane-rid="3640789f2356683f"
              data-form-type=""
              className="main-search-input"
            />
          </div>
        </div>
        <div>
          <MainSearchButton
            handleButtonClick={handleButtonClick}
            buttonType="artists"
            term={term}
          />
          <MainSearchButton
            handleButtonClick={handleButtonClick}
            buttonType="songs"
            term={term}
          />
        </div>
      </form>
    </>
  );
};

export default MainSearchForm;
