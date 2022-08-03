import { useEffect, useState } from 'react';
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  fetchSearchData,
  paginateFetch,
} from './spotify';
import { catchErrors } from './utils';
import './App.css';
import { Hero } from './Components/Hero';
import { ArtistList } from './Components/ArtistList';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
    };

    catchErrors(fetchData());
  }, []);

  const fetchSearch = async (e) => {
    const { data } = await fetchSearchData(e.target.value);
    setSearchData(data);
  };

  const paginate = async (direction) => {
    const { data } = await paginateFetch(
      direction === 'next' ? searchData.artists.next : searchData.artists.previous
    );
    setSearchData(data);
  };

  return (
    <div className='App h-screen bg-spotify-dark'>
      <Hero
        name={profile && profile.display_name ? profile.display_name : null}
        handleLogout={logout}
        handleInput={fetchSearch}
      />
      {!token ? (
        ''
      ) : (
        <div className='p-5 w-vw'>
          <ArtistList
            artists={searchData?.artists?.items}
            handlePrev={() => paginate('prev')}
            handleNext={() => paginate('next')}
          />
        </div>
      )}
    </div>
  );
}

export default App;
