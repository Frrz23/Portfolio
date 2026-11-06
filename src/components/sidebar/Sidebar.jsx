import React, { useState } from 'react';
import './Sidebar.css';
import { HashLink as Link } from 'react-router-hash-link';
import { motion } from 'framer-motion';
import { FaMoon, FaSun } from 'react-icons/fa';

import logo from '../images/Profile.jpg';
import github from '../images/github.png';
import instagram from '../images/instagram.png';
import twitter from '../images/twitterx.png';
import linkedin from '../images/linkedin.png';
import gmail from '../images/gmail.png';

export default function Sidebar() {
  const [theme, setTheme] = useState(document.documentElement.dataset.theme || 'light');

  const toggleTheme = () => {
    // Read the live value (source of truth) so rapid clicks never desync.
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    setTheme(next);
  };

  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.3
      }
    }
  };
  const iconList = [
    {
      component: github,
      href: 'https://github.com/Frrz23',
      className: 'icon-img icon-img-dark-fix'
    },
    {
      component: linkedin,
      href: 'https://www.linkedin.com/in/aryan-khatiwoda',
      className: 'icon-img'
    },
    {
      component: gmail,
      href: 'mailto:aryankhatiwoda9@gmail.com',
      className: 'icon-img'
    }
  ];
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };

  return (
    <div className='sidebar'>
      <div className='topHashtag'># aspnet_core</div>
      <div className='topHashtag'># react_js</div>
      <div className='topHashtag'># real_time_systems</div>
      <h1>
        <Link smooth to='/#start' className='h1_links'>
          Aryan Khatiwada
        </Link>
      </h1>
      <motion.div
        animate={{ y: [2, -2] }}
        transition={{ ease: 'linear', duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      >
        <img src={logo} className='my-img' />
      </motion.div>
      <p style={{ color: 'var(--text)', fontWeight: 'bold' }} className='gmail'>
        <a
          href='https://mail.google.com/mail/u/0/#inbox?compose=CllgCJftvBffjPmxWxvfHWRHWnhTbpQgPxBxvkcnPpFpFqbhrXMCHXSJTsCXCVLsQzgRcVLpnPL'
          rel='opener noreferrer'
          target='_blank'
          className='fa fa-envelope'
        ></a>
        &nbsp;aryankhatiwoda9@gmail.com
      </p>
      <p style={{ color: 'var(--text)', fontWeight: 'bold' }} className='gmail'>
        <a
          href='tel:+9779818821006'
          className='fa fa-phone'
        ></a>
        &nbsp;+977 9818821006
      </p>
      <p style={{ color: 'var(--text)', fontWeight: 'bold' }} className='gmail'>
        <i className='fa fa-map-marker' style={{ marginLeft: '4px' }}></i>
        &nbsp;Kathmandu, Nepal
      </p>

      <ul className='sidebar-nav'>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#projects' className='links'>
            Projects
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#experience' className='links'>
            Experience
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#about' className='links'>
            About
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#interest' className='links'>
            Interest
          </Link>
        </li>
        <li className='sidebar-nav-items'>
          <Link smooth to='/#education' className='links'>
            Education
          </Link>
        </li>
      </ul>

      <div>
        <motion.ul className='sidebar-nav' variants={container} initial='hidden' animate='visible'>
          {iconList.map((val, index) => (
            <motion.li key={index} variants={item}>
              <img
                onClick={() => {
                  window.open(val.href, '_blank');
                }}
                src={val.component}
                className={val.className || 'icon-img'}
              />
            </motion.li>
          ))}
        </motion.ul>
      </div>

      <button
        className='themeToggle'
        onClick={toggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <motion.span
          key={theme}
          initial={{ rotate: -90, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          style={{ display: 'inline-flex' }}
        >
          {theme === 'dark' ? <FaSun /> : <FaMoon />}
        </motion.span>
      </button>
    </div>
  );
}
