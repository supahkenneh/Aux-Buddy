import { Card } from './Card';

export const ArtistList = ({ artists }) => {
  return (
    <div className='grid grid-cols-5 gap-4'>
      {artists?.map((artist) => {
        return <Card artist={artist} key={artist.id} />;
      })}
    </div>
  );
};
