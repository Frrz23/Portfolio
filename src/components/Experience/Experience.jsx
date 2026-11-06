import React from 'react';
// Reuse the education timeline's visual language for consistent look & feel
import classes from '../Education/Education.module.css';
import { MdWork } from 'react-icons/md';
import { EXPERIENCE, PROJECTS } from '../../data/cv-knowledge.js';

const JobBullets = () =>
  EXPERIENCE.map((job) => (
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
  ));

const HighlightedProject = ({ name }) => {
  const project = PROJECTS.find((p) => p.name === name || p.name.startsWith(name));
  if (!project) return null;
  return (
    <li>
      <b>{name}</b> — {project.desc}
    </li>
  );
};

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
                <JobBullets />
                <article className={classes.timeline_entry}>
                  <div className={`${classes.timeline_icon} ${classes.timeline_icon_4}`}>
                    <MdWork />
                  </div>
                  <div className={classes.label}>
                    <h2>Selected work from this role</h2>
                    <div className={classes.description}>
                      <ul className={classes.points}>
                        <HighlightedProject name='AssetHub' />
                        <HighlightedProject name='SHAH' />
                        <HighlightedProject name='TrashTrack' />
                      </ul>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
