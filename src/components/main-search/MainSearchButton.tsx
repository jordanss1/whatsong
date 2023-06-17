import { HandleButtonClickType } from "./MainSearch";
import "./styles/main-search.css";

type MainSearchButtonPropsType = {
  buttonType: "artists" | "songs";
  handleButtonClick: HandleButtonClickType;
  term: string;
};

const MainSearchButton = ({
  buttonType,
  handleButtonClick,
  term,
}: MainSearchButtonPropsType) => {
  const buttonName = buttonType.charAt(0).toUpperCase() + buttonType.slice(1);

  return (
    <button
      placeholder="button"
      role={`search-button-${buttonType}`}
      disabled={!term}
      onClick={() =>
        handleButtonClick(buttonType === "artists" ? "artist" : "track", term)
      }
      type="button"
      className={`btn btn-outline-dark submitButtons fs-4 rounded-3 ${
        buttonType === "artists" && "me-3"
      } p-1 px-3`}
    >
      {buttonName}
    </button>
  );
};

export default MainSearchButton;
