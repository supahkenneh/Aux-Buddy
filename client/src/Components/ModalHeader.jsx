import { useState } from 'react';
import { DebounceInput } from 'react-debounce-input';
import { fetchSearchData } from '../spotify';
import { SongResults } from './SongResults';

export const ModalHeader = ({ playlist, userProfile, playlistChanged }) => {
  const [searchData, setSearchData] = useState(null);

  const fetchSongs = async (e) => {
    if (!e) setSearchData(null);
    else {
      const { data } = await fetchSearchData(e.target.value, 'track');
      setSearchData(data);
    }
  };

  const openPlaylist = () => {
    window.open(playlist.external_urls.spotify, '_blank');
  };

  return (
    <div className='flex flex-col justify-center w-1/2 mr-3 pb-2'>
      <div className='h-2/5 flex flex-col font-main mb-3'>
        <div className='py-2'>
          <h4 className='text-8xl'>{playlist.name}</h4>
          <div className='font-sans'>
            Created by: {userProfile.display_name}
          </div>
          <div className='font-sans mb-2'>
            You can add or remove songs here. When you're ready just click
            'Open' to start jamming!
          </div>
          <div className='flex justify-between'>
            <DebounceInput
              minLength={3}
              debounceTimeout={500}
              onChange={fetchSongs}
              className='w-2/3 text-black text-lg font-sans drop-shadow-lg rounded p-2'
              placeholder='Search songs'
            />
            <button className='btn-green ml-3' onClick={openPlaylist}>
              Open
            </button>
          </div>
        </div>
      </div>
      <div className='h-3/5'>
        <SongResults
          data={searchData}
          playlist={playlist}
          playlistChanged={playlistChanged}
        />
      </div>
    </div>
  );
};
