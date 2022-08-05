import { Card } from './Card';

export const Content = ({ artists, handlePrev, handleNext }) => {
  return (
    <>
      <div className='grid grid-cols-5 gap-4'>
        {artists?.map((artist) => {
          return <Card artist={artist} key={artist.id} />;
        })}
      </div>
      {artists ? (
        <div className='grid grid-cols-5 gap-4 my-5'>
          <div></div>
          <div></div>
          <div className='flex justify-around'>
            <div className='text-4xl hover:cursor-pointer' onClick={handlePrev}>
              👈
            </div>
            <div className='text-4xl hover:cursor-pointer' onClick={handleNext}>
              👉
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      ) : (
        ''
      )}
    </>
  );
};
