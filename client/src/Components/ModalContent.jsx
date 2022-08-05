import { Song } from './Song';
import { removeSongFromPlaylist } from '../spotify';

export const ModalContent = ({ songs, playlistId, playlistChanged }) => {
  const removeSong = async (track) => {
    const response = await removeSongFromPlaylist(playlistId, track);
    if (response) playlistChanged();
  };
  return (
    <div className='flex flex-col w-1/2 h-full overflow-y-scroll pr-3'>
      {songs?.map((song) => {
        return (
          <Song
            key={song.track.id}
            song={song.track}
            handleRemoveSong={() => removeSong(song.track)}
          />
        );
      })}
    </div>
  );
};
