export const ModalHeader = ({ playlist, userProfile }) => {
  return (
    <div className='flex flex-col justify-center h-1/2'>
      <div className='h-2/5 flex flex-col font-main '>
        <div className='mb-3'>
          <h4 className='text-6xl'>Playlist Name</h4>
          <div className='font-sans'>
            You can add or remove songs here. When you're ready just click 'Open
            Playlist' to start jamming!
          </div>
        </div>
        <div>
          <button className='btn-green mb-3'>Open</button>
        </div>
        <div>
          <input
            type='text'
            className='w-2/3 text-black text-lg font-sans drop-shadow-lg rounded p-2'
            placeholder='Search songs'
          />
        </div>
      </div>
    </div>
  );
};
