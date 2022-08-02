import { Button } from './Button';

export const Header = ({ name }) => {
  return (
    <header className='flex bg-gray-900 p-4 w-vw'>
      <h1 className='text-6xl w-1/2 font-main text-slate-100'>
        {name ? `Hey DJ ${name}!` : `DJ Who?`}
      </h1>
      <div className='self-center w-1/2 flex justify-end'>
        <a
          className='text-slate-100 font-bold w-1/5 p-2 rounded-full text-center bg-accent-green'
          href='http://localhost:8888/login'
        >
          Log in to Spotify
        </a>
      </div>
    </header>
  );
};
