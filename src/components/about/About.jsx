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
            Hi! My name is <b>Aryan Khatiwada</b>. I am an <b>Associate Software Engineer</b> and a
            BCA graduate with professional experience building <b>REST APIs</b> and{' '}
            <b>full-stack applications</b> with <b>C#</b>, <b>ASP.NET Core</b>, <b>React.js</b>, and{' '}
            <b>SQL Server</b>. I love working on real-time systems (<b>SignalR</b>, <b>WebSockets</b>),
            background jobs, and role-based access control, shipping features with Agile teams.
          </p>
          <p className={classes.br}>
          From designing backend services and tuning performance to crafting smooth user interfaces, I enjoy turning ideas into reliable, production-ready software. Let's build something amazing together!
          </p>
        </div>
        {/* </ScrollAnimation> */}
      </div>
    );
  }
}

export default About;
