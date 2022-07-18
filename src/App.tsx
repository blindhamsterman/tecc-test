import { Routes, Route } from "react-router-dom";
import { useSpotify } from "./hooks/useSpotify";
import { RecentTracks } from './screens/recent-tracks/recent-tracks';
import SpotifyRedirect from './components/spotify-redirect/spotify-redirect';
import { Login } from "./components/login/login";
import { getLSActiveFilterId } from "./screens/recent-tracks/recent-tracks-helper";

export default function App() {
  const {
    hasLoggedIn,
    hasRedirectedFromValidPopup,
    isLoading,
  } = useSpotify();



  return (
    <>
      <Login />
      <>
        {isLoading && <div>Loading...</div>}
        <Routes>
          <Route path="/" element={hasLoggedIn ? <RecentTracks lsActiveFilterId={getLSActiveFilterId()} /> : <></>} />
          <Route path="/Unauthorized" element={
            <>
              <h3>The session has expired, please log in again</h3>
            </>
          } />
          <Route path="/callback" element={hasLoggedIn ? <RecentTracks lsActiveFilterId={getLSActiveFilterId()} /> : hasRedirectedFromValidPopup ? <SpotifyRedirect /> : <></>} />
        </Routes>
      </>
    </>
  )
}