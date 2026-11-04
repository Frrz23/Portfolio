import React, { Component } from 'react';
import classes from './Interest.module.css';
// import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

export default function Interest() {
  return (
    <div className={classes.box} id='interest'>
      {/* <ScrollAnimation
        offset={0}
        animateIn='fadeInLeft'
        duration={2.4}
        animateOnce={true}
        initiallyVisible={true}
      > */}
      <span className={classes.head}>WHAT I DO?</span>
      <h2 className={classes.heading}>HERE ARE SOME OF MY EXPERTISE</h2>
      <div className={classes.Interest}>
        {/* <ScrollAnimation
            offset={0}
            animateIn='fadeInLeft'
            duration={2.4}
            animateOnce={true}
            initiallyVisible={true}
          > */}
        <div className={classes.web}>
          <h3>Backend Development</h3>
          <p>
            Building <b>REST APIs</b> and full applications with <b>ASP.NET Core</b>,{' '}
            <b>ASP.NET MVC</b>, <b>C#</b>, <b>Node.js</b>, Express, PHP, and{' '}
            <b>ASP.NET Identity</b> authentication.
          </p>
        </div>
        {/* </ScrollAnimation>
          <ScrollAnimation
            offset={0}
            animateIn='fadeInLeft'
            duration={2.4}
            animateOnce={true}
            initiallyVisible={true}
          > */}
        <div className={classes.app}>
          <h3>Frontend Development</h3>
          <p>React.js, Next.js, JavaScript, HTML/CSS, Tailwind CSS, Bootstrap</p>
        </div>
        {/* </ScrollAnimation>
          <ScrollAnimation
            offset={0}
            animateIn='fadeInLeft'
            duration={2.4}
            animateOnce={true}
            initiallyVisible={true}
          > */}
        <div className={classes.other}>
          <h3>Databases</h3>
          <p>SQL Server, MySQL, PostgreSQL, Supabase, Entity Framework Core, Prisma, LINQ</p>
        </div>
        <div className={classes.other}>
          <h3>Real-Time &amp; Libraries</h3>
          <p>SignalR, Socket.IO, Hangfire, ABP Framework, NPOI, MailKit</p>
        </div>
        <div className={classes.other}>
          <h3>Tools &amp; Practices</h3>
          <p>Git, GitHub, Agile, Code Reviews, Debugging, Performance Optimization, Swagger, Visual Studio, VS Code</p>
        </div>

        {/* </ScrollAnimation> */}
      </div>
      {/* </ScrollAnimation> */}
    </div>
  );
}
