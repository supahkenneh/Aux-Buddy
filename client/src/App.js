import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import './App.css';
import { Header } from './Components/Header';

function App() {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    setToken(accessToken);

    const fetchData = async () => {
      const { data } = await getCurrentUserProfile();
      setProfile(data);
      console.log(data);
    };

    catchErrors(fetchData());
  }, []);

  return (
    <div className='App h-screen bg-gradient-to-r from-sky-500 to-indigo-500'>
      <Header
        name={profile && profile.display_name ? profile.display_name : null}
        handleLogout={logout}
      />
      {!token ? '' : <>{/* content goes here */}</>}
    </div>
  );
}

export default App;
