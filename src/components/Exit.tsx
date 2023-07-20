import { ReactElement } from "react";

type ExitPropsType = {
  handleClick: () => void;
  size: number;
};

const Exit = ({ handleClick, size }: ExitPropsType): ReactElement => {
  return (
    <i
      data-testid="x-icon"
      onClick={() => handleClick()}
      className={`window close outline icon iconRed fs-${size}`}
    />
  );
};

export default Exit;
