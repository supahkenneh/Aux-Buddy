import { useContext } from 'react';
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

  return (
    <header className='bg-gradient-to-r from-sky-500 to-indigo-500 h-1/2 p-4'>
      <div className='flex w-vw drop-shadow-lg h-1/5'>
        <h1 className='text-5xl w-1/2 font-main self-center'>Aux Buddy</h1>
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
      <div className='flex justify-center h-2/5'>
        {name ? (
          <div className='flex flex-col justify-center content-center'>
            <h1 className='text-2xl font-main self-center'>Hello {name}!</h1>
            <div className='text-xl mb-3'>
              Search on artists or tracks to start curating a playlist fit for
              all!
            </div>
            <DebounceInput
              minLength={2}
              debounceTimeout={300}
              onChange={handleInput}
              className='text-black rounded h-1/4 text-lg p-2 font-sans drop-shadow-lg'
            />
          </div>
        ) : (
          <></>
        )}
      </div>
      {name ? (
        <div className='h-1/5'>
          <SelectedArtists />
        </div>
      ) : (
        <></>
      )}
      {name && state?.artists?.length ? (
        <div className='flex flex-col justify-end h-1/5'>
          <button className='btn-green self-center' onClick={handleGenPlaylist}>
            Generate Playlist
          </button>
        </div>
      ) : (
        <></>
      )}
    </header>
  );
};
