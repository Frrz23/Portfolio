import React from 'react';
// Reuse the education timeline's visual language for consistent look & feel
import classes from '../Education/Education.module.css';
import { MdWork } from 'react-icons/md';
import { EXPERIENCE } from '../../data/cv-knowledge.js';

export default function Experience() {
  return (
    <div className={classes.box} id='experience'>
      <span className={classes.head}>WHERE I'VE WORKED</span>
      <h2 className={classes.heading}>WORK EXPERIENCE</h2>
      <section className={classes.container}>
        <div>
          <div className={classes.row}>
            <div className={classes.row_md_12}>
              <div className={classes.timeline_centered}>
                {EXPERIENCE.map((job) => (
                  <article className={classes.timeline_entry} key={job.company}>
                    <div className={classes.timeline_icon}>
                      <MdWork />
                    </div>
                    <div className={classes.label}>
                      <h2>
                        {job.title} — {job.company} <span>{job.period}</span>
                      </h2>
                      <div className={classes.description}>
                        <ul className={classes.points}>
                          {job.highlights.map((point, i) => (
                            <li key={i}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
