import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

function App() {
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState(false);
  const [activeProject, setActiveProject] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError(false);
    setFormSuccess(false);

    const formData = new FormData(e.target);

    fetch("https://formspree.io/f/myzwrjql", {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          setFormSuccess(true);
          e.target.reset();
          setTimeout(() => setFormSuccess(false), 3000);
        } else {
          setFormError(true);
          setTimeout(() => setFormError(false), 3000);
        }
      })
      .catch(() => {
        setFormError(true);
        setTimeout(() => setFormError(false), 3000);
      });
  };

  return (
    <div className="font-sans text-gray-800 bg-gray-100 min-h-screen">

      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center h-screen text-white bg-gradient-to-r from-sky-600 via-teal-500 to-indigo-600 animate-gradient group">
        <h1 data-aos="fade-up" className="text-6xl font-extrabold mb-4">
          Joe Maclean
        </h1>
        <p data-aos="fade-up" className="text-xl mb-6">
          Full-Stack Developer
        </p>
        <a data-aos="fade-up" href="#contact" className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-100 hover-pop">
          Contact Me
        </a>
        <a data-aos="fade-up" href="/JoeMacleanResume.pdf" download className="mt-4 bg-white text-blue-600 px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-100 hover-pop">
          Download Resume
        </a>

        <svg className="absolute bottom-0 left-0 w-full pointer-events-none" viewBox="0 0 1440 320">
          <path fill="#ffffff" fillOpacity="0.2" d="M0,160L60,170.7C120,181,240,203,360,186.7C480,171,600,117,720,112C840,107,960,149,1080,154.7C1200,160,1320,128,1380,112L1440,96L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z" />
        </svg>
      </section>

      {/* About Section */}
      <section data-aos="fade-up" className="py-20 px-8 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">About Me</h2>
        <p className="text-lg leading-relaxed">
          I am a final-year Computer Science student at Deakin University, minoring in Full Stack Development. My passion lies in building modern, responsive web applications that are intuitive, user-friendly, and impactful.
        </p>
        <p className="mt-4 text-lg leading-relaxed">
          With a strong foundation in full-stack development and a focus on teamwork, I thrive on creating meaningful user experiences and solving real-world problems through technology.
        </p>
      </section>

      {/* Projects Section */}
      <section data-aos="fade-up" className="py-20 px-8 bg-white">
        <h2 className="text-3xl font-bold text-center mb-8">Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">

          {/* OnTrack Project */}
          <div data-aos="zoom-in" className="bg-gray-100 p-6 rounded-lg shadow hover-pop">
            <h3 className="text-xl font-bold mb-2">OnTrack</h3>
            <p className="mb-4">
              A learning management system enabling skill-based course delivery and student progress tracking.
            </p>
            <a href="https://github.com/JoeMacl/doubtfire-web" className="text-blue-600 font-semibold hover:underline">
              View My Contribution
            </a>
            <br />
            <a href="https://github.com/thoth-tech" className="text-blue-600 font-semibold hover:underline">
              View OnTrack Project
            </a>
          </div>

          {/* Earthbound Ascent */}
          <div data-aos="zoom-in" className="bg-gray-100 p-6 rounded-lg shadow hover-pop cursor-pointer" onClick={() =>
            setActiveProject({
              title: "Earthbound Ascent",
              description: "A 2D pixel roguelite platformer inspired by Egyptian mythology. I contributed to core gameplay mechanics, level design, and pixel art, focusing on creating an immersive and atmospheric player experience.",
              images: ["/images/earthbound-1.png", "/images/earthbound-2.png", "/images/earthbound-3.png", "/images/earthbound-4.png"],
            })
          }>
            <h3 className="text-xl font-bold mb-2">Earthbound Ascent</h3>
            <p>A 2D pixel roguelite platformer inspired by Egyptian mythology.</p>
            <p className="text-gray-600 text-sm italic mt-2">Click for more details</p>
          </div>

          {/* Linux Services Manager */}
          <div data-aos="zoom-in" className="bg-gray-100 p-6 rounded-lg shadow hover-pop cursor-pointer" onClick={() =>
            setActiveProject({
              title: "Linux Services Manager",
              description: "A web application built using Flask and Python to monitor and control Linux services in real-time. It provides a simple interface for users to view service statuses and perform actions like start, stop, and restart. Includes real-time status updates and notifications.",
              images: ["/images/linux-services-1.png"],
            })
          }>
            <h3 className="text-xl font-bold mb-2">Linux Services Manager</h3>
            <p>A Flask web app for monitoring and managing Linux services in real-time.</p>
            <p className="text-gray-600 text-sm italic mt-2">Private project; Click for more details</p>
          </div>

        </div>
      </section>

      {/* Modal */}
      {activeProject && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative overflow-y-auto max-h-[90vh]">
            <button className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl" onClick={() => setActiveProject(null)}>
              &times;
            </button>
            <h3 className="text-2xl font-bold mb-4">{activeProject.title}</h3>
            <p className="mb-4">{activeProject.description}</p>
            <div className={`flex justify-center ${activeProject.title === "Linux Services Manager" ? 'my-6' : 'grid grid-cols-1 sm:grid-cols-2 gap-4'}`}>
              {activeProject.images.map((img, index) => (
                <img key={index} src={img} alt={`Screenshot ${index + 1}`} className={`rounded shadow ${activeProject.title === "Linux Services Manager" ? "w-full max-w-[600px] object-contain" : "w-full h-48 object-cover"}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Skills Section */}
      <section data-aos="fade-up" className="py-20 px-8 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-8">Skills</h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {["React", "Tailwind CSS", "JavaScript", "Python", "C#", "Ruby on Rails", "SQL", "HTML", "TypeScript", "Git", "REST APIs"].map((skill, index) => (
            <span key={index} data-aos="fade-up" className="bg-white px-4 py-2 rounded shadow hover-pop">{skill}</span>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" data-aos="fade-up" className="py-20 px-8 bg-white text-center">
        <h2 className="text-3xl font-bold mb-4">Contact</h2>
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto text-left space-y-4">
          <div>
            <label className="block mb-1 font-semibold" htmlFor="name">Name</label>
            <input type="text" id="name" name="name" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="email">Email</label>
            <input type="email" id="email" name="email" className="w-full border border-gray-300 p-2 rounded" required />
          </div>
          <div>
            <label className="block mb-1 font-semibold" htmlFor="message">Message</label>
            <textarea id="message" name="message" rows="4" className="w-full border border-gray-300 p-2 rounded" required></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-blue-700 transition hover-pop" disabled={formSuccess}>
            Send Message
          </button>
        </form>
        {formSuccess && (
          <p className="text-green-600 font-semibold mt-4">
            Email Sent!
          </p>
        )}
        {formError && (
          <p className="text-red-600 font-semibold mt-4">
            There was a problem sending your message. Please try again.
          </p>
        )}
      </section>

    </div>
  );
}

export default App;
