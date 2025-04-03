import React, { Component } from 'react';
import classes from './About.module.css';
// import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';

class About extends Component {
  render() {
    return (
      <div className={classes.box} id='about'>
        {/* <ScrollAnimation
          offset={0}
          animateIn='fadeInLeft'
          duration={2.4}
          animateOnce={true}
          initiallyVisible={true}
        > */}
        <span className={classes.head}>ABOUT ME</span>
        <h2 className={classes.heading}>Who Am I?</h2>
        <div className={classes.About}>
          <p>
            Hi! My name is <b>Aryan Khatiwada</b>. I am a passionate developer having experience in{' '}
            <b>Frontend development</b> & <b>Backend development </b> I thrive on building dynamic and user-friendly digital experiences, 
            leveraging modern frameworks like React.js and ASP.NET MVC. With a keen eye for detail and a love for problem-solving, 
            I enjoy developing innovative solutions that enhance user experiences.
          </p>
          <p className={classes.br}>
          From crafting seamless web applications to optimizing backend systems, I’m always excited to explore new technologies and bring creative ideas to life. Let's build something amazing together! 
          </p>
        </div>
        {/* </ScrollAnimation> */}
      </div>
    );
  }
}

export default About;
