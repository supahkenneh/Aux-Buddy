import { useContext } from 'react';
import { ArtistListContext } from '../context';

export const SelectedArtists = () => {
  const { state, dispatch } = useContext(ArtistListContext);
  console.log(state);
  return <div></div>;
};
