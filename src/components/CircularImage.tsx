import { ReactElement } from "react";

type CircularImagePropsType = {
  image?: string;
  size?: number;
};

const CircularImage = ({
  image,
  size,
}: CircularImagePropsType): ReactElement => {
  size = size ?? 2;

  if (image) {
    return <img className={`ui avatar image border border-white fs-${size}`} src={image} />;
  } else {
    return (
      <div className={`ui avatar image fs-${size}`}>
        <i className={`user icon fs-${size}`} />
      </div>
    );
  }
};

export default CircularImage;
