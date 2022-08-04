import { useContext } from 'react';
import { ArtistListContext } from '../context';
import { Artist } from './Artist';

export const SelectedArtists = () => {
  const { state, dispatch } = useContext(ArtistListContext);
  return (
    <div className='flex justify-center'>
      {state?.artists?.map((artist) => {
        return (
          <Artist
            key={artist.id}
            artist={artist}
            handleRemove={() =>
              dispatch({ type: 'REMOVE_ARTIST', data: artist })
            }
          />
        );
      })}
    </div>
  );
};
