import Projects from "./pages/projects";
import Skills from "./pages/Skills";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import Experience from "./pages/Experience";
import EducationCertification from "./pages/EducationCertification";
import AdminMessages from "./pages/AdminMessages";
import { useEffect, useState } from "react";
import AOS from "aos/dist/aos";
import "aos/dist/aos.css";
import "./App.css";
import photo from './assets/photo.jpg';
import CVModal from './components/CVModal';
// Import only the components, not the Router wrapper
import { Routes, Route, Link } from "react-router-dom"; 

function Home() {
  const [showCVModal, setShowCVModal] = useState(false);

  return (
    <section className="hero">
      <div className="hero-shapes" aria-hidden="true">
        <span className="shape shape-1"></span>
        <span className="shape shape-2"></span>
        <span className="shape shape-3"></span>
      </div>

      <div className="hero-content hero-layout">
        <div className="hero-left" data-aos="fade-right">
          <img src={photo} alt="Profile" className="profile-photo" />
          <button onClick={() => setShowCVModal(true)} className="btn download-cv" data-aos="fade-up" data-aos-delay="300">
            <i className="fas fa-download"></i> Download CV
          </button>
        </div>

        <div className="hero-right" data-aos="fade-left">
          <h1 data-aos="fade-up">Hi, I'm <span className="highlight">Muhammad Izhar Adrali</span></h1>
          <p className="subtitle" data-aos="fade-up" data-aos-delay="120">
            I'm an AI graduate and AI/ML Engineer with experience in machine learning, deep learning, federated learning, NLP, computer vision, and real-world energy forecasting. I also have frontend development experience.
          </p>
          
          <div className="social-cta" data-aos="fade-up" data-aos-delay="180">
            <a className="social-cta-link" href="mailto:izharadrali@gmail.com">izharadrali@gmail.com</a>
            <a className="social-cta-link" href="https://github.com/izharadrali" target="_blank" rel="noreferrer">
              <i className="fab fa-github"></i> GitHub
            </a>
            <a className="social-cta-link" href="https://www.linkedin.com/in/muhammadizhar-" target="_blank" rel="noreferrer">
              <i className="fab fa-linkedin"></i> LinkedIn
            </a>
          </div>

          <Link to="/projects">
            <button className="btn" data-aos="zoom-in" data-aos-delay="260">View My Work</button>
          </Link>
        </div>
      </div>

      <CVModal isOpen={showCVModal} onClose={() => setShowCVModal(false)} />
    </section>
  );
}

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100,
      easing: 'cubic-bezier(0.2, 0.9, 0.3, 1)'
    });
  }, []);

  // Theme toggle: keep a simple 'Nites' button that toggles a light-mode class on <body>
  const [isLight, setIsLight] = useState(() => {
    try {
      return localStorage.getItem('site-theme') === 'light';
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    if (isLight) document.body.classList.add('light-mode');
    else document.body.classList.remove('light-mode');
    try { localStorage.setItem('site-theme', isLight ? 'light' : 'dark'); } catch (e) {}
  }, [isLight]);

  // Navbar scroll - toggle compact/scrolled style
  useEffect(() => {
    const header = document.querySelector('.navbar');
    if (!header) return;

    const onScroll = () => {
      if (window.scrollY > 20) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    // REMOVE THE <Router> WRAPPER HERE, IT'S NOW IN MAIN.JSX
    <> 
      <header className="navbar">
        <div className="nav-inner">
          <Link to="/" className="logo">Izhar Adrali</Link>
          <nav className="nav-links">
            <Link to="/">Home</Link>
            <Link to="/projects">Projects</Link>
            <Link to="/education">Education/Certificatons</Link>
            <Link to="/experience">Experience</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/skills">Skills</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/education" element={<EducationCertification />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
      </Routes>
    {/* REMOVE THE </Router> WRAPPER HERE, IT'S NOW IN MAIN.JSX */}
    </> 
  );
}

export default App;
