import { ModalHeader } from './ModalHeader';
import { ModalContent } from './ModalContent';
import { getPlaylistSongs } from '../spotify';
import { useEffect, useState } from 'react';

export const Modal = ({ playlist, user }) => {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    const response = async () => {
      return await getPlaylistSongs(playlist.id);
    };
  }, [playlist.id]);

  return (
    <div className='fixed top-0 left-0 z-10 w-screen h-screen bg-spotify-dark/75 flex justify-center'>
      <div className='bg-spotify-dark p-5 w-4/5 h-4/5 self-center rounded-lg drop-shadow-lg border-spotify-dark'>
        <div className='h-1/5 flex justify-end text-xl'>
          <div className='hover:cursor-pointer'>⛌</div>
        </div>
        <div className='grid grid-cols-2'>
          <ModalHeader playlist={playlist} userProfile={user} />
          <ModalContent songs={songs} />
        </div>
      </div>
    </div>
  );
};
