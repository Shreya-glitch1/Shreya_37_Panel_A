import React from 'react';

const Publications = ({ publications }) => {
  return (
    <section className="publications">
      <h2>Publications</h2>
      <ul>
        {publications.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </section>
  );
};

export default Publications;
