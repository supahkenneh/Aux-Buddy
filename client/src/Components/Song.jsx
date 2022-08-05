import { useState } from 'react';

export const Song = ({ song, handleRemoveSong }) => {
  const [showRemove, setShowRemove] = useState(false);
  return (
    <div
      className='py-2 border-b-2 flex justify-start'
      onMouseOver={() => setShowRemove(true)}
      onMouseLeave={() => setShowRemove(false)}
    >
      <div className='w-1/12'>
        <img
          src={song.album.images[2].url}
          alt='album_cover'
          className='mr-5'
        />
      </div>
      <div className='flex flex-col justify-end w-8/12 pl-5'>
        <div className='self-start text-lg'>{song.name}</div>
        <div className='flex'>
          {song.artists.map((artist) => {
            return (
              <div className='mr-2 text-sm' key={artist.id}>
                {artist.name}
              </div>
            );
          })}
        </div>
      </div>
      {showRemove ? (
        <div
          className='flex justify-end self-center w-3/12 hover:cursor-pointer'
          onClick={handleRemoveSong}
        >
          ⛌
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
