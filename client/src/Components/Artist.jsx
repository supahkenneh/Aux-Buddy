export const Artist = ({ artist, handleRemove, formState }) => {
  return (
    <div className='mx-3 hover:animate-wiggle'>
      <div
        className='flex justify-evenly bg-spotify-dark p-3 rounded-full opacity-90 hover:bg-white hover:text-spotify-dark hover:cursor-pointer drop-shadow-lg animate-fadein'
        onClick={handleRemove}
      >
        <div className='mx-2'>{artist.name}</div>
        {!formState ? <div className='mx-2'>⛌</div> : ''}
      </div>
    </div>
  );
};
