import { contactObj } from '../contacts';

export const Footer = () => {
  return (
    <div className='grid grid-cols-3 z-10 bottom-0 left-0 fixed w-screen py-2'>
      <div></div>
      <div className='flex justify-evenly'>
        {contactObj.links.map((contact) => {
          return (
            <a
              key={contact.id}
              href={contact.link}
              target='_blank'
              rel='noreferrer'
              className='self-center w-8 h-8'
            >
              <img src={contact.icon} alt={contact.label} />
            </a>
          );
        })}
      </div>
      <div></div>
    </div>
  );
};
