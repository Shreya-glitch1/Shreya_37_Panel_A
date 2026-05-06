import React, { useState } from 'react';

const Projects = ({ projects }) => {
  const [expanded, setExpanded] = useState(null);

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  return (
    <section className="projects">
      <h2>Projects</h2>
      <div className="projects-list">
        {projects.map((project) => (
          <div key={project.id} className="project-item">
            <h3 onClick={() => toggleExpand(project.id)} className="project-title">
              {project.title}
            </h3>
            {expanded === project.id && (
              <div className="project-details">
                <p>{project.description}</p>
                <p><strong>Technologies:</strong> {project.technologies.join(', ')}</p>
                <a href={project.link} target="_blank" rel="noopener noreferrer">View Project</a>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;