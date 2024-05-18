import React from 'react';
import { NavLink } from 'react-router-dom';

function navbar() {
  return (
    <header className=' border-b-2 h-20 border-blue-200 flex justify-between items-center p-10'>
      <NavLink
        to='/'
        className='w-10 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md'
      >
        <p className='blue-gradient_text text-lg'>SK</p>
      </NavLink>
      <nav className='flex text-lg gap-7 font-medium '>
        <NavLink
          to='/about'
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
        >
          About
        </NavLink>
        <NavLink
          to='/projects'
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
        >
          Projects
        </NavLink>
        <NavLink
          to='/Contact'
          className={({ isActive }) =>
            isActive ? 'text-blue-500' : 'text-black'
          }
        >
          Contact
        </NavLink>
      </nav>
    </header>
  );
}

export default navbar;
