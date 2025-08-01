import React from 'react';
import 'animate.css/animate.min.css';
import Tilt from 'react-parallax-tilt';

import classes from './Projects.module.css';
import bookheap from '../images/bookheap.png';
import chess from '../images/chess.png';
import GundrukReads from '../images/GundrukReads.png';
import travel from '../images/travel-log.png';
import definition from '../images/definition.png';
import memes from '../images/memes.png';
import superhero from '../images/superhero.png';
import monorepo from '../images/monorepo.png';
import Quillia from '../images/Quillia.png';
import TrashTrack from '../images/TrashTrack.jpg';
import courseApp from '../images/courseApp.png';
import chatGPT from '../images/chatGPT.png';
import Futsal from '../images/Futsal.png';
import github from '../images/github.png';
import AssetHub from '../images/AssetHub.png';
import frontenddev from '../images/frontenddev.png';
import solanaaid from '../images/solanaaid.png';
import jumpstart from '../images/jumpstart.png';

// Web projects
const webItem = [
  {
    link: 'https://github.com/Frrz23/GundrukReads',
    title: 'GundrukReads',
    techStack: 'Technology used: React Js, Tailwind Css',
    desc: 'GundrukReads is a e-commerce platform designed for manga enthusiasts, featuring a dynamic and responsive user interface',
    image: GundrukReads,
    color: '#E5E483',
    githubLink: 'https://github.com/Frrz23/GundrukReads'
  },
  {
    link: 'https://github.com/Frrz23/Quillia',
    title: 'Quillia-BookStrore',
    techStack: 'Tech Stack: ASP.NET MVC, Bootstrap, C#, EF Core',
    desc: 'Quillia is an e-commerce website dedicated to showcasing and selling books across various genres',
    image: Quillia,
    color: '#0FFFFF',
    githubLink: 'https://github.com/Frrz23/Quillia'
  },
  {
    link: 'https://github.com/MiniEnemy/Futsal-Website/',
    title: 'Elite Strike: Futsal Boking System',
    techStack: 'Tech Stack- HTML, CSS, JS, PHP, MySQL',
    desc: 'Developing a user-friendly Futsal Booking System to simplify court reservations. Features real-time availability, customizable user profiles, and an admin dashboard for venue management',
    image: Futsal,
    color: '#d5ebda',
    githubLink: 'https://github.com/MiniEnemy/Futsal-Website'
  },
  {
    link: 'https://github.com/Frrz23/AssetHub-Frontend',
    title: 'AssetHub - Asset Management System',
    techStack: 'Tech Stack: ASP.NET Core (ABP), React.js, Tailwind CSS, EF Core',
    desc: 'AssetHub is a full-featured asset management system with Excel support, approval flows, audit logging, dashboard analytics, and email notifications.',
    image: AssetHub,
    color: '#fff3c7',
    githubLink: 'https://github.com/Frrz23/AssetHub-Backend'
  },
  {
    link: 'https://github.com/MiniEnemy/Trash-Track-',
    title: 'TrashTrack - Smart Waste Management System',
    techStack: 'Tech Stack: ASP.NET Core MVC, Razor Pages, SQL Server, ASP.NET Identity, Bootstrap',
    desc: 'TrashTrack is a municipal waste tracking system that provides real-time pickup schedule visibility, issue reporting, and admin overrides to improve coordination between the public and garbage collectors.',
    image: TrashTrack,
    color: '#d9f1ff',
    githubLink: 'https://github.com/MiniEnemy/Trash-Track-'
  }
];

export default function Projects() {
  const getProjectCard = (cardItem) => {
    return (
      <Tilt perspective={900} glareEnable={true} glareMaxOpacity={0.45}>
        <li style={{ backgroundColor: cardItem.color, borderRadius: '21px' }}>
          <a href={cardItem.link} className={classes.card} target='_blank'>
            <img src={cardItem.image} className={classes.card__image} alt='' />
          </a>
          <div
            onClick={() => {
              if (cardItem?.githubLink) window.open(cardItem?.githubLink, '_blank');
            }}
            className={classes.card__title__container}
          >
            <h3 className={classes.card__title}>{cardItem.title}</h3>
            {cardItem?.githubLink && <img src={github} className={classes.card__title__img} />}
          </div>
        </li>
      </Tilt>
    );
  };

  return (
    <div className={classes.box} id='projects'>
      {/* <ScrollAnimation
        offset={0}
        animateIn='fadeInLeft'
        duration={2.4}
        animateOnce={true}
        initiallyVisible={true}
      > */}
      <span className={classes.head}>MY WORK</span>
      <h2 className={classes.heading}>WEB APP PROJECTS</h2>
      <ul className={classes.cards}>
        {webItem.map((item) => {
          return getProjectCard(item);
        })}
      </ul>

      {/* </ScrollAnimation> */}
    </div>
  );
}
