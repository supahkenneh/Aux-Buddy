import { useState } from 'react';

const Track = ({ track, handleAddSong }) => {
  const [showAdd, setShowAdd] = useState(false);

  return (
    <div
      className='font-sans flex border-b-2 py-2'
      onMouseOver={() => setShowAdd(true)}
      onMouseLeave={() => setShowAdd(false)}
    >
      <div className='flex flex-col w-11/12'>
        <div className='text-md'>{track.name}</div>
        <div className='flex'>
          {track.artists.map((artist) => {
            return (
              <div key={artist.id} className='text-xs mr-2'>
                {artist.name}
              </div>
            );
          })}
        </div>
      </div>
      {showAdd ? (
        <div
          className='flex justify-end w-1/12 self-center hover:cursor-pointer'
          onClick={handleAddSong}
        >
          <div>➕</div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Track;
