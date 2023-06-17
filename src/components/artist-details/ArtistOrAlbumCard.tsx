import { ReactElement, memo } from "react";
import { AlbumDetailsType, ArtistDetailsType } from "../../types";
import "./styles/artist-details.css";

type ArtistOrAlbumCardType = {
  cardType: "artist" | "album";
  album?: AlbumDetailsType | null;
  artist?: ArtistDetailsType;
  handleProfileClick?: (id: string) => void;
};

const ArtistOrAlbumCard = ({
  cardType,
  album,
  artist,
  handleProfileClick,
}: ArtistOrAlbumCardType): ReactElement => {
  const artistId = artist?.id ? artist.id : "";

  let handleProfileClickFunc = handleProfileClick
    ? () => handleProfileClick(artistId)
    : () => {};

  const renderAlbumCard = album ? (
    <>
      <div className="image d-flex justify-content-center">
        {album.images[1] ? (
          <img src={`${album.images[1].url}`} />
        ) : (
          <h3 className="card-no-image-album">No image</h3>
        )}
      </div>
      <h3 className="header fs-5 text-center w-100 pt-2">{album.name}</h3>
    </>
  ) : (
    !album && (
      <div className="h-100 d-flex align-items-center justify-content-center">
        <h3 className="align-self-center pb-5">No albums</h3>
      </div>
    )
  );

  const renderArtistCard = (
    <>
      <div
        style={{ cursor: "pointer" }}
        onClick={handleProfileClickFunc}
        className="image d-flex justify-content-center align-items-center"
      >
        {artist?.images[0] ? (
          <img src={artist.images[0].url} />
        ) : (
          <h3 className="card-no-image-artist">No image</h3>
        )}
      </div>
      <h3
        onClick={handleProfileClickFunc}
        className="header fs-5 text-center w-100 pt-2"
      >
        {artist?.name}
      </h3>
    </>
  );

  return (
    <div
      className={`artist-album-card ${cardType === "artist" && "artist-card"}`}
      title={cardType === "artist" ? "View artist profile" : ""}
    >
      {cardType === "album" && renderAlbumCard}
      {cardType === "artist" && artist && renderArtistCard}
    </div>
  );
};

export default memo(ArtistOrAlbumCard);
