import "./styles/header.css";

type HeaderContentProps = { path: string };

const HeaderContent = ({ path }: HeaderContentProps) => {
  if (path === "/")
    return (
      <>
        w<span className="me-1 pt-2 extraText fs-5">.hat</span>s
        <span className="ms-2 extraText fs-5">.ong</span>
      </>
    );
  else {
    return (
      <div className="d-flex listNavbar">
        <div className="text-lowercase">
          <span className="w">w.</span>
          <span className="pink me-2">s</span>
        </div>
        <span className="underScore ms-1">_</span>
        <div className="d-flex align-items-end ps-2 pe-2 pb-3 listSpotify">
          <h2 className="fs-6 me-2 mt-3 poweredList text-lowercase">
            powered by
          </h2>
          <i className="spotify icon mb-1 fs-1 pe-1 spotifyIconList"></i>
        </div>
      </div>
    );
  }
};

export default HeaderContent;
