import Track from './Track';
import { addSongToPlaylist } from '../spotify';

export const SongResults = ({ data, playlist, playlistChanged }) => {
  const addSong = async (track) => {
    const response = await addSongToPlaylist(playlist.id, track);
    if (response) playlistChanged();
  };
  return (
    <div className='pr-5'>
      {data?.tracks?.items.map((track) => {
        return (
          <Track
            key={track.id}
            track={track}
            handleAddSong={() => addSong(track)}
          />
        );
      })}
    </div>
  );
};
