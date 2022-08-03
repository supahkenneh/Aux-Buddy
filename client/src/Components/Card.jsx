import user from '../assets/user.png';

export const Card = ({ artist }) => {
  const displayImg = artist.images.length
    ? artist.images.find((img) => {
        return img.height === 160;
      })
    : '';

  return (
    <div className='bg-spotify-card font-main text-2xl flex rounded-lg drop-shadow-lg hover:cursor-pointer'>
      <div className='w-1/2 flex justify-start'>
        <img
          src={displayImg?.url ? displayImg.url : user}
          alt='artist-avatar'
          className='rounded-l-lg'
        />
      </div>
      <div className='flex justify-center flex-col text-center hover:underline'>
        <div>{artist.name}</div>
      </div>
    </div>
  );
};
