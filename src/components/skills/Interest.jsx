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
          <h3>Programming Knowledge</h3>
          <p>
            I have a solid foundation in programming and have worked with languages like  
            <b>C#, PHP, Python, Java, and JavaScript</b>.  
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
          <h3>Web Development</h3>
          <p>
             HTML/ CSS, ReactJs, Tailwind
            CSS,ASP.NET MVC,Bootstrap
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
        <div className={classes.other}>
          <h3>Database Management</h3>
          <p>
            SQl, Entity Framework, LINQ, MySQL 
          </p>
        </div>
        <div className={classes.other}>
  <h3>Frameworks & Libraries</h3>
  <p>
    ASP.NET Core (ABP), React.js, jQuery, Tailwind CSS, Bootstrap, NPOI, MailKit
  </p>
</div>
<div className={classes.other}>
  <h3>Software Architecture</h3>
  <p>
    Layered Architecture, Repository Pattern, Background Jobs, RESTful APIs, Modular Monolith, Retry Policies, Timezone-aware systems
  </p>
</div>
<div className={classes.other}>
  <h3>Tools & DevOps</h3>
  <p>
    Git, GitHub, Postman, Swagger, Visual Studio, VS Code
  </p>
</div>


        {/* </ScrollAnimation> */}
      </div>
      {/* </ScrollAnimation> */}
    </div>
  );
}
