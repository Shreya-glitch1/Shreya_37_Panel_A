import React from 'react';

const About = ({ objective, education }) => {
  return (
    <section className="about">
      <h2>About Me</h2>
      <p>{objective}</p>
      <h3>Education</h3>
      {education.map((edu, index) => (
        <div key={index} className="education-item">
          <h4>{edu.degree}</h4>
          <p>{edu.school} - {edu.year}</p>
          <p>{edu.score}</p>
        </div>
      ))}
    </section>
  );
};

export default About;