export const Hero = ({ name, handleLogout }) => {
  return (
    <header className='bg-gradient-to-r from-sky-500 to-indigo-500 h-2/5'>
      <div className='flex p-4 w-vw drop-shadow-lg'>
        <h1 className='text-5xl w-1/2 font-main'>Aux Buddy</h1>
        <div className='self-center w-1/2 flex justify-end'>
          {name ? (
            <button onClick={handleLogout} className='btn-green'>
              Logout
            </button>
          ) : (
            <a className='btn-green' href='http://localhost:8888/login'>
              Spotify Login
            </a>
          )}
        </div>
      </div>
      <div className='flex justify-center'>
        {name ? (
          <div className='flex flex-col justify-center content-center'>
            <h1 className='text-2xl font-main self-center'>Hello {name}!</h1>
            <div className='text-xl'>
              Search on artists or tracks to start curating a playlist fit for
              all!
            </div>
            <input type='text' className='text-black rounded' />
          </div>
        ) : (
          <></>
        )}
      </div>
    </header>
  );
};
