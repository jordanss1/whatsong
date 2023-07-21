import { ReactElement, memo } from "react";
import ArtistListGridCard from "./ArtistListGridCard";
import { ArtistsType } from "../../types";
import "./styles/artist-list.css";

export type HandleProfileClickType = (id: string) => void;

type ArtistListGridPropsType = {
  artists: ArtistsType[];
  searched: boolean;
  handleClick: HandleProfileClickType;
};

const ArtistListGrid = ({
  artists,
  searched,
  handleClick,
}: ArtistListGridPropsType): ReactElement => {
  const gridClass = artists.length < 6 ? "artist-grid-less" : "artist-grid";

  return (
    <div className={`d-grid ${gridClass}`}>
      {artists.map((artist, i) => (
        <ArtistListGridCard
          key={i}
          index={i}
          artist={artist}
          handleClick={handleClick}
          searched={searched}
        />
      ))}
    </div>
  );
};

export default ArtistListGrid;
