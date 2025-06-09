import React, { useEffect } from 'react';
import '../index.css';
import { Link } from 'react-router-dom';

function Navbar() {
  useEffect(() => {
    const handleScroll = () => {
      const nav = document.querySelector('nav');
      if (window.scrollY > 500) {
        nav.classList.add('navbar-scrolled');
      } else {
        nav.classList.remove('navbar-scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav>
      <div className='profile'>
        <a className="navbar-title" href='#home'>SVURT</a>
      </div>
      <div className='options'>
        <a href="#about">Transactions</a>
        <Link to="/statements-rewards">Statements</Link>
        <a href="#contacts">Support</a>
      </div>
    </nav>
  );
}

export default Navbar;
