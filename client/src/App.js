import { useEffect, useState } from 'react';
import {
  accessToken,
  logout,
  getCurrentUserProfile,
  fetchSearchData,
} from './spotify';
import { catchErrors } from './utils';
import './App.css';
import { Hero } from './Components/Hero';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [searchData, setSearchData] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  const fetchSearch = async (e) => {
    const { data } = await fetchSearchData(e.target.value);
    setSearchData(data);
    console.log(searchData);
  };

  return (
    <div className='App h-screen'>
      <Hero
        name={profile && profile.display_name ? profile.display_name : null}
        handleLogout={logout}
        handleInput={fetchSearch}
      />
      {!token ? '' : <>{/* content goes here */}</>}
    </div>
  );
}

export default App;
