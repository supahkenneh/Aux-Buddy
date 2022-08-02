import { Button } from './Button';

export const Header = ({ login }) => {
  return (
    <header className='flex bg-gray-900 p-4 w-vw'>
      <h1 className='text-6xl w-1/2 font-main text-slate-100'>DJ Who?</h1>
      <div className='self-center w-1/2 flex justify-end'>
        <a
          className='bg-slate-100 w-1/5 p-2 rounded text-center'
          href='http://localhost:8888/login'
        >
          Log in to Spotify
        </a>
      </div>
    </header>
  );
};
