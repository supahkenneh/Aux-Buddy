import { useEffect, useReducer, useState } from 'react';
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  fetchSearchData,
  paginateFetch,
  composePlaylist,
} from './spotify';
import { catchErrors } from './utils';
import './App.css';
import { Hero } from './Components/Hero';
import { ArtistList } from './Components/ArtistList';
import { ArtistListContext, initialState, reducer } from './context';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchData, setSearchData] = useState(null);
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  const fetchSearch = async (e) => {
    if (!e) setSearchData(null);
    else {
      const { data } = await fetchSearchData(e.target.value);
      setSearchData(data);
    }
  };

  const paginate = async (direction) => {
    const { data } = await paginateFetch(
      direction === 'next'
        ? searchData.artists.next
        : searchData.artists.previous
    );
    setSearchData(data);
  };

  const generatePlaylist = async (playlistName) => {
    if (!playlistName.length) playlistName = 'The Awesome Playlist';

    const response = await composePlaylist({
      artists: state.artists,
      user: profile.id,
      playlistName: playlistName,
    });
    console.log(response);
  };

  return (
    <div className='App h-screen bg-spotify-dark'>
      <ArtistListContext.Provider value={{ state, dispatch }}>
        {!token ? (
          ''
        ) : (
          <>
            <Hero
              name={
                profile && profile.display_name ? profile.display_name : null
              }
              handleLogout={logout}
              handleInput={fetchSearch}
              handleGenPlaylist={(playlistName) =>
                generatePlaylist(playlistName)
              }
            />
            <div className='p-5 w-vw'>
              <ArtistList
                artists={searchData?.artists?.items}
                handlePrev={() => paginate('prev')}
                handleNext={() => paginate('next')}
              />
            </div>
          </>
        )}
      </ArtistListContext.Provider>
    </div>
  );
}

export default App;
