import { useContext, useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { ArtistListContext } from '../context';
import { SelectedArtists } from './SelectedArtists';

export const Hero = ({
  name,
  handleLogout,
  handleInput,
  handleGenPlaylist,
}) => {
  const { state } = useContext(ArtistListContext);
  const [toggleForm, setToggleForm] = useState(false);
  const [playlistName, setPlaylistName] = useState('');
  const LOGIN_URI =
    process.env.NODE_ENV !== 'production'
      ? 'http://localhost:8888/login'
      : 'https://aux-buddy.herokuapp.com/login';

  return (
    <header className='bg-gradient-to-r from-sky-500 to-indigo-500 h-1/2 p-4 drop-shadow-lg'>
      <div className='flex w-vw h-1/5 animate-fadein'>
        <h1 className='text-5xl w-1/2 font-main self-center drop-shadow-lg'>
          Aux Buddy
        </h1>
        <div className='self-center w-1/2 flex justify-end'>
          {name ? (
            <button onClick={handleLogout} className='btn-green'>
              Logout
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className='flex justify-center h-2/5 animate-fadein'>
        {name ? (
          <div className='flex flex-col justify-center content-center w-1/3'>
            <h1 className='text-2xl font-main self-center drop-shadow-lg'>
              Hello {name}!
            </h1>
            <div className='text-xl mb-3 self-center drop-shadow-lg animate-fadein'>
              {toggleForm
                ? 'Give your playlist a name!'
                : 'Search for artists to start curating a playlist fit for all!'}
            </div>
            {toggleForm ? (
              <>
                <input
                  type='text'
                  className='text-black rounded h-1/4 text-lg p-2 font-sans drop-shadow-lg focus:outline-indigo-500'
                  placeholder='The Awesome Playlist'
                  onChange={(e) => setPlaylistName(e.target.value)}
                />
              </>
            ) : (
              <DebounceInput
                minLength={2}
                debounceTimeout={300}
                onChange={handleInput}
                placeholder='Artist Name'
                className='text-black rounded h-1/4 text-lg p-2 font-sans drop-shadow-lg focus:outline-cyan-500'
              />
            )}
          </div>
        ) : (
          <div className='text-2xl flex flex-col justify-around text-center w-1/3 h-full'>
            <div className='self-end'>
              Powered by Spotify, quickly create a playlist with artists that
              you or your friends want to listen to!
            </div>
            <div className='w-full'>
              <a className='btn-green px-10' href={LOGIN_URI}>
                Login
              </a>
            </div>
          </div>
        )}
      </div>
      {name ? (
        <div className='h-1/5'>
          <SelectedArtists formState={toggleForm} />
        </div>
      ) : (
        <></>
      )}
      {name && state?.artists?.length ? (
        <div className='flex flex-col justify-end h-1/5 animate-fadein'>
          {!toggleForm ? (
            <button
              className='btn-green self-center'
              onClick={() => {
                handleInput(null);
                setToggleForm(!toggleForm);
              }}
            >
              I've selected my artists!
            </button>
          ) : (
            <>
              <button
                className='btn-green self-center my-2'
                onClick={() => handleGenPlaylist(playlistName)}
              >
                Create my playlist!
              </button>
              <button
                className='self-center underline'
                onClick={() => {
                  handleInput(null);
                  setToggleForm(!toggleForm);
                }}
              >
                I want to edit my artists!
              </button>
            </>
          )}
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};
