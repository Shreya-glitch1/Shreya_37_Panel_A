import React, { useState } from 'react';
import Header from './components/Header';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Publications from './components/Publications';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import { portfolioData } from './data/portfolioData';
import './App.css';

function App() {
  const [activeSection, setActiveSection] = useState('about');

  const renderSection = () => {
    switch (activeSection) {
      case 'about':
        return <About objective={portfolioData.objective} education={portfolioData.education} />;
      case 'skills':
        return <Skills skills={portfolioData.skills} />;
      case 'projects':
        return <Projects projects={portfolioData.projects} />;
      case 'publications':
        return <Publications publications={portfolioData.publications} />;
      case 'certifications':
        return <Certifications certifications={portfolioData.certifications} />;
      case 'contact':
        return <Contact contact={portfolioData.contact} />;
      default:
        return <About objective={portfolioData.objective} education={portfolioData.education} />;
    }
  };

  return (
    <div className="app">
      <Header
        name={portfolioData.name}
        title={portfolioData.title}
        location={portfolioData.location}
        email={portfolioData.email}
        phone={portfolioData.phone}
        onNavigate={setActiveSection}
      />
      <main>
        {renderSection()}
      </main>
    </div>
  );
}

export default App;