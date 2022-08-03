import { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile } from './spotify';
import { catchErrors } from './utils';
import './App.css';
import { Hero } from './Components/Hero';

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
    <div className='App h-screen'>
      <Hero
        name={profile && profile.display_name ? profile.display_name : null}
        handleLogout={logout}
      />
      {!token ? '' : <>{/* content goes here */}</>}
    </div>
  );
}

export default App;
