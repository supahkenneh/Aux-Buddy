import user from '../assets/user.png';
import { useContext } from 'react';
import { ArtistListContext } from '../context';

export const Card = ({ artist }) => {
  const displayImg = artist.images.length
    ? artist.images.find((img) => {
        return img.height === 160;
      })
    : '';

  const { state, dispatch } = useContext(ArtistListContext);

  const addArtist = (artist) => {
    if (state.artists.indexOf(artist) === -1)
      dispatch({ type: 'ADD_ARTIST', data: artist });
  };

  return (
    <div
      className='bg-spotify-card font-main text-2xl flex rounded-lg drop-shadow-lg hover:cursor-pointer hover:underline'
      onClick={() => addArtist(artist)}
    >
      <div className='w-1/2 flex justify-start'>
        <img
          src={displayImg?.url ? displayImg.url : user}
          alt='artist-avatar'
          className='rounded-l-lg'
        />
      </div>
      <div className='flex justify-center flex-col text-center'>
        <div>{artist.name}</div>
      </div>
    </div>
  );
};