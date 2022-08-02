export const Header = ({ name, handleLogout }) => {
  return (
    <header className='flex bg-spotify-dark p-4 w-vw drop-shadow-lg'>
      <h1 className='text-6xl w-1/2 font-main text-white'>
        {name ? `Hey ${name}!` : `Pass the Aux`}
      </h1>
      <div className='self-center w-1/2 flex justify-end'>
        {name ? (
          <button onClick={handleLogout} className='btn-green'>
            Logout
          </button>
        ) : (
          <a className='btn-green' href='http://localhost:8888/login'>
            Log in to Spotify
          </a>
        )}
      </div>
    </header>
  );
};
