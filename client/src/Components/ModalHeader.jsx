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

  return (
    <div className='flex flex-col justify-center h-1/2 w-1/2'>
      <div className='h-2/5 flex flex-col font-main '>
        <div className='mb-3'>
          <h4 className='text-6xl mb-5'>{playlist.name}</h4>
          <div className='font-sans'>
            Created by: {userProfile.display_name}
          </div>
          <div className='font-sans'>
            You can add or remove songs here. When you're ready just click
            'Open' to start jamming!
          </div>
        </div>
        <div>
          <button className='btn-green mb-3'>Open</button>
        </div>
        <div>
          <DebounceInput
            minLength={3}
            debounceTimeout={500}
            onChange={fetchSongs}
            className='w-2/3 text-black text-lg font-sans drop-shadow-lg rounded p-2'
            placeholder='Search songs'
          />
        </div>
        <div>
          <SongResults
            data={searchData}
            playlist={playlist}
            playlistChanged={playlistChanged}
          />
        </div>
      </div>
    </div>
  );
};
