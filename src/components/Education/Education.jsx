import React, { Component } from 'react';
import classes from './Education.module.css';
// import ScrollAnimation from 'react-animate-on-scroll';
import 'animate.css/animate.min.css';
import { MdSchool } from 'react-icons/md';
import { MdWork } from 'react-icons/md';
import { FaSchool } from 'react-icons/fa';
import { FaUserGraduate } from "react-icons/fa";
import { FaTrophy } from "react-icons/fa";



class Education extends Component {
  render() {
    return (
      <div className={classes.box} id='education'>
        {/* <ScrollAnimation
          offset={0}
          animateIn='fadeInLeft'
          duration={2}
          animateOnce={true}
          initiallyVisible={true}
        > */}
        <span className={classes.head}>MY JOURNEY</span>
        <section className={classes.container}>
          <div>
            <div className={classes.row}>
              <div className={classes.row_md_12}>
                <div className={classes.timeline_centered}>
                  {/* <ScrollAnimation
                      offset={0}
                      animateIn='fadeInLeft'
                      duration={2.4}
                      animateOnce={true}
                      initiallyVisible={true}
                    > */}
                  
                  <article className={classes.timeline_entry}>
                    <div className={classes.timeline_icon}>
                      <MdSchool />
                    </div>
                    <div className={classes.label}>
                      <h2>
                        Middle School Diploma <span>2009-2019</span>
                      </h2>
                      <div className={classes.description}>
                      I completed my middle school diploma from <b>LRI School</b> with an overall score of 82.71%.
                      </div >
                    </div>
                  </article>
                  {/* </ScrollAnimation> */}
                  {/* <ScrollAnimation
                      offset={0}
                      animateIn='fadeInLeft'
                      duration={2.4}
                      animateOnce={true}
                      initiallyVisible={true}
                    > */}
                  <article className={classes.timeline_entry}>
                    <div className={`${classes.timeline_icon} ${classes.timeline_icon_2}`}>
                      <FaSchool />
                    </div>
                    <div className={classes.label}>
                      <h2>
                        High School Diploma — Computer Science <span>2019-2021</span>
                      </h2>
                      <div className={classes.description}>
                        I completed my high school diploma from <b>Trinity College</b> with
                        Computer Science as my major subject, from July 2019 to December 2021.{' '}
                      </div>
                    </div>
                  </article>
                  {/* </ScrollAnimation> */}

                  {/* <ScrollAnimation
                      offset={0}
                      animateIn='fadeInLeft'
                      duration={2.4}
                      animateOnce={true}
                      initiallyVisible={true}
                    > */}
                  <article className={classes.timeline_entry}>
                    <div className={classes.timeline_icon}>
                      <FaUserGraduate/>
                    </div>
                    <div className={classes.label}>
                      <h2>Bachelor In Computer Application <span>2021-2026</span></h2>
                      <div className={classes.description}>Graduated with my Bachelor's degree from <b>Bernhardt College, Tribhuvan University</b> (April 2021 – April 2026), Kathmandu, Nepal.</div>
                    </div>
                  </article>
                  <article className={classes.timeline_entry}>
                    <div className={classes.timeline_icon}>
                      <MdWork />
                    </div>
                    <div className={classes.label}>
                      <h2>Intern → Associate Software Engineer — AMNIL Technologies <span>Sep 2025 – Apr 2026</span></h2>
                      <div className={classes.description}>
                        Designed and developed <b>RESTful APIs</b> with <b>ASP.NET Core</b> and C# for internal and client-facing applications. Modelled data with <b>SQL Server</b> and <b>Entity Framework Core</b>, built real-time features and background jobs, optimized backend performance, and shipped features with cross-functional teams using Git and Agile practices.
                      </div>
                    </div>
                  </article>
                  <article className={classes.timeline_entry}>
                    <div className={`${classes.timeline_icon} ${classes.timeline_icon_4}`}>
                      <FaTrophy />
                    </div>
                    <div className={classes.label}>
                      <h2>Certifications &amp; Achievements</h2>
                      <div className={classes.description}>
                        <b>Foundational C# with Microsoft</b> — freeCodeCamp (Microsoft certified course)
                        <br />
                        <b>3rd Place — BernHack Hackathon</b> for the TrashTrack smart waste management system
                      </div>
                    </div>
                    <div className={classes.timeline_entry_inner}>
                      <div className={classes.timeline_icon_3 || classes.color_none}></div>
                    </div>
                  </article>
                  {/* </ScrollAnimation> */}
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* </ScrollAnimation> */}
      </div>
    );
  }
}

export default Education;
