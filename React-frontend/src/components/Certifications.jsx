import React from 'react';

const Certifications = ({ certifications }) => {
  return (
    <section className="certifications">
      <h2>Certifications & Learning</h2>
      <ul>
        {certifications.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Certifications;
