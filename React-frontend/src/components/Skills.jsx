import React from 'react';

const Skills = ({ skills }) => {
  return (
    <section className="skills">
      <h2>Skills</h2>
      <div className="skills-grid">
        <div>
          <h3>Technical</h3>
          <div className="skills-list">
            {skills.technical.map((skill, index) => (
              <span key={`tech-${index}`} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h3>Soft Skills</h3>
          <div className="skills-list">
            {skills.soft.map((skill, index) => (
              <span key={`soft-${index}`} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
        <div>
          <h3>Languages</h3>
          <div className="skills-list">
            {skills.languages.map((skill, index) => (
              <span key={`lang-${index}`} className="skill-item">{skill}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;