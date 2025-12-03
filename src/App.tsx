import { useEffect, useState } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import CursorEffect from './components/CursorEffect';
// Certifications component removed to simplify portfolio
// FloatingShapes (background shapes) removed for a clean background
// import FloatingShapes from './components/FloatingShapes';

function App() {
  const [showEffects, setShowEffects] = useState(true);

  useEffect(() => {
    setShowEffects(true);
  }, []);

  return (
    <div className="min-h-screen bg-black text-green-400 overflow-hidden">
      {showEffects && (
        <>
          {/* removed background shapes for a clean look; retain cursor effect */}
          <CursorEffect />
        </>
      )}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </div>
  );
}

export default App;
