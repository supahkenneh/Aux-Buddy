import { ModalHeader } from './ModalHeader';
import { ModalContent } from './ModalContent';
import { getPlaylistSongs } from '../spotify';
import { useEffect, useState } from 'react';
import { catchErrors } from '../utils';

export const Modal = ({ playlist, user, handleModal }) => {
  const [songs, setSongs] = useState();

  useEffect(() => {
    const fetchPlaylistSongs = async () => {
      const { data } = await getPlaylistSongs(playlist.id);
      setSongs(data.tracks.items);
    };

    catchErrors(fetchPlaylistSongs());
  }, [playlist.id]);

  const getSongs = async () => {
    const fetchPlaylistSongs = async () => {
      const { data } = await getPlaylistSongs(playlist.id);
      setSongs(data.tracks.items);
    };
    catchErrors(fetchPlaylistSongs());
  };

  return (
    <div className='fixed top-0 left-0 z-20 w-screen h-screen bg-spotify-dark/75 flex justify-center'>
      <div className='bg-spotify-dark p-5 pb-10 w-4/5 h-4/5 self-center rounded-lg drop-shadow-lg border-spotify-dark overflow-hidden'>
        <div className='h-1/8 flex justify-end text-xl' onClick={handleModal}>
          <div className='hover:cursor-pointer'>⛌</div>
        </div>
        <div className='flex h-full'>
          <ModalHeader
            playlist={playlist}
            userProfile={user}
            playlistChanged={() => getSongs()}
          />
          <ModalContent
            songs={songs}
            playlistId={playlist.id}
            playlistChanged={() => getSongs()}
          />
        </div>
      </div>
    </div>
  );
};
