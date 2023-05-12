import { ReactElement, useCallback, useContext, useEffect } from "react";
import SearchContext from "../../contexts/SearchStore";

const SongListSelectedItem = (): ReactElement => {
  const { selectedSong, setSelectedSong, setAnimateStateList } =
    useContext(SearchContext);

  useEffect(() => {
    setAnimateStateList({ x: 300, opacity: 0 }, { x: 300, opacity: 0 });
  }, []);

  useEffect(() => {
    const selectedSongDiv = document.getElementsByClassName(
      "selectedDiv"
    )[0] as HTMLDivElement;

    if (selectedSong) {
      selectedSongDiv.classList.add("selectedDivAnimation");
    }
  }, [selectedSong]);

  const durationConvert = useCallback(
    (milliseconds: number): string => {
      const seconds = Math.floor((milliseconds / 1000) % 60);
      const minutes = Math.floor((milliseconds / 1000 / 60) % 60);

      return [
        minutes.toString().padStart(2, "0"),
        seconds.toString().padStart(2, "0"),
      ].join(":");
    },
    [selectedSong]
  );

  if (!selectedSong) {
    return (
      <div className="selectedDiv d-flex align-items-center justify-content-evenly">
        <h2 className="ui header noSongHeader ">
          <p className="mb-0">Search spotify songs</p>
          <div className="sub header">
            <p>
              Selected <b>details</b> will appear here
            </p>
          </div>
        </h2>
      </div>
    );
  } else {
    const { album, artists, duration_ms, name, track_number } = selectedSong;
    return (
      <div className="selectedDiv d-flex align-items-center flex-column justify-content-evenly">
        <div className="w-100 d-flex justify-content-end align-items-center mt-2 pb-3">
          <i
            data-testid="x-icon"
            onClick={() => setSelectedSong(null)}
            className="window close outline icon iconRed fs-4"
          ></i>
        </div>
        <div className="d-flex flex-column ms-0 mb-5 songItem justify-content-evenly">
          {album.images[1].url ? (
            <img className="rounded" src={album.images[1].url} />
          ) : (
            <h3>No album cover</h3>
          )}
          <div className="ui items mt-0 description">
            <div className="item">
              <ul className="content d-flex flex-column justify-content-start  align-content-center contentDescription">
                <li className=" text-center">{`${name} by ${artists[0].name}`}</li>
                <li className="text-center">{`${
                  album.album_type === "single" ? "Single:" : "Album:"
                } ${album.name}`}</li>
                <div className="text-center ">
                  <li className="">{`Track ${track_number} of ${album.total_tracks}`}</li>
                </div>
                <li className="text-center mt-0">
                  Duration {durationConvert(duration_ms)}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default SongListSelectedItem;
