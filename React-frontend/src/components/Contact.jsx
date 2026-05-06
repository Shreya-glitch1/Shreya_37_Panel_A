import React from 'react';

const Contact = ({ contact }) => {
  return (
    <section className="contact">
      <h2>Contact</h2>
      <p>Email: <a href={`mailto:${contact.email}`}>{contact.email}</a></p>
      <p>LinkedIn: <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{contact.linkedin}</a></p>
      <p>GitHub: <a href={contact.github} target="_blank" rel="noopener noreferrer">{contact.github}</a></p>
    </section>
  );
};

export default Contact;