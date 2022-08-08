export const Loader = () => {
  return (
    <div className='flex justify-center w-screen h-screen left-0 top-0 fixed z-40'>
      <div className='flex justify-evenly h-1/6 self-center load-container'>
        <div className='bg-white/50 bar1 w-8 mx-1'></div>
        <div className='bg-white/50 bar2 w-8 mx-1'></div>
        <div className='bg-white/50 bar3 w-8 mx-1'></div>
        <div className='bg-white/50 bar4 w-8 mx-1'></div>
        <div className='bg-white/50 bar5 w-8 mx-1'></div>
      </div>
    </div>
  );
};