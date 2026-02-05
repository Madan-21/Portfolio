import React, { useState, useEffect, useRef } from "react";
import { Toaster, toast } from "react-hot-toast";

// Loading Screen Component
function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      {/* Enhanced MP text with glow effect */}
      <div className="mb-12 relative">
        <span className="text-8xl font-bold font-inter text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-pulse">
          MP
        </span>
        <div className="absolute inset-0 text-8xl font-bold font-inter text-blue-400/20 blur-xl">
          MP
        </div>
      </div>

      {/* Enhanced progress bar with glow */}
      <div className="relative w-80 h-3 bg-gray-800/50 rounded-full mb-6 backdrop-blur-sm border border-gray-700/50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full transition-all duration-500 relative overflow-hidden"
          style={{ width: `${progress}%` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
        </div>
      </div>

      {/* Enhanced percentage with animation */}
      <div className="flex items-center space-x-4">
        <span className="text-2xl font-inter font-semibold text-white">
          {progress}%
        </span>
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>

      {/* Loading text */}
      <p className="mt-6 text-gray-400 text-lg font-inter animate-pulse">
        Crafting digital experiences...
      </p>
    </div>
  );
}

// Grid Background Component
function GridBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX - window.innerWidth / 2) * 0.02,
        y: (e.clientY - window.innerHeight / 2) * 0.02,
      });
    };

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progress = (currentProgress / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      {/* Dynamic grid background */}
      <div
        className="fixed inset-0 z-0 pointer-events-none transition-all duration-500"
        style={{
          opacity: Math.max(0.1 - scrollProgress * 0.001, 0.02),
          backgroundImage: `
            linear-gradient(rgba(59, 130, 246, ${scrollProgress > 50 ? "0.05" : "0.1"}) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, ${scrollProgress > 50 ? "0.05" : "0.1"}) 1px, transparent 1px),
            radial-gradient(circle at ${mousePosition.x + 50}% ${mousePosition.y + 50}%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)
          `,
          backgroundSize: "50px 50px, 50px 50px, 200px 200px",
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`,
        }}
      />
      
      {/* Floating gradient orbs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"
          style={{
            top: '20%',
            left: '10%',
            transform: `translate(${mousePosition.x * 0.5}px, ${mousePosition.y * 0.5}px)`,
            animation: 'float 20s infinite ease-in-out',
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"
          style={{
            bottom: '20%',
            right: '10%',
            transform: `translate(${-mousePosition.x * 0.3}px, ${-mousePosition.y * 0.3}px)`,
            animation: 'float 25s infinite ease-in-out reverse',
          }}
        />
      </div>
    </>
  );
}

// Enhanced Skill Card Component
function EnhancedSkillCard({ name, duration, progress, color, icon }) {
  const colorMap = {
    blue: 'from-blue-500 to-blue-600',
    purple: 'from-purple-500 to-purple-600',
    green: 'from-green-500 to-green-600',
    yellow: 'from-yellow-500 to-yellow-600',
    orange: 'from-orange-500 to-orange-600',
    cyan: 'from-cyan-500 to-cyan-600',
    pink: 'from-pink-500 to-pink-600',
  };

  return (
    <div className="group p-6 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 hover:border-blue-500/50">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
            {icon}
          </span>
          <span className="text-xl font-semibold text-white">{name}</span>
        </div>
        <span className="text-sm text-gray-400 px-3 py-1 bg-gray-800/50 rounded-full">
          {duration}
        </span>
      </div>
      
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-400">Proficiency</span>
          <span className="text-sm font-semibold text-white">{progress}%</span>
        </div>
        
        <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
          <div
            className={`h-full bg-gradient-to-r ${colorMap[color]} rounded-full transition-all duration-1000 ease-out relative overflow-hidden`}
            style={{ width: `${progress}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Project Card Component
function EnhancedProjectCard({ title, description, url, technologies, status, gradient }) {
  return (
    <div className="group relative overflow-hidden">
      <div className="relative p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-blue-500/50">
        {/* Status Badge */}
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
            status === 'Live' 
              ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
              : 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
          }`}>
            {status}
          </span>
        </div>

        {/* Project Icon */}
        <div className="mb-6">
          <div className={`w-16 h-16 bg-gradient-to-r ${gradient} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
        </div>

        {/* Content */}
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-blue-400 transition-colors duration-300">
          {title}
        </h3>
        
        <p className="text-gray-400 leading-relaxed mb-6">
          {description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-6">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-2 text-blue-400 hover:text-white transition-colors duration-300 font-semibold group-hover:translate-x-2 transform transition-transform"
        >
          <span>View Project</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        {/* Hover Glow Effect */}
        <div className={`absolute inset-0 bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 rounded-2xl`} />
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [loading, setLoading] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    subject: "",
  });

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);

    const handleScroll = () => {
      const totalScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentProgress = window.scrollY;
      const progress = (currentProgress / totalScroll) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    toast.success("Message sent successfully! I'll get back to you soon.");
    setFormData({
      name: "",
      email: "",
      message: "",
      subject: "",
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f0f0f] via-[#1a1a2e] to-[#16213e] text-white relative overflow-hidden">
      <Toaster 
        position="bottom-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#1a1a1a',
            color: '#fff',
            border: '1px solid #333',
          },
        }}
      />
      <GridBackground />
      
      {/* Progress bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 transition-all duration-300"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* Enhanced Navigation */}
      <nav className="flex justify-between items-center p-6 fixed w-full top-0 z-40 backdrop-blur-md bg-black/10 border-b border-white/5">
        <a
          href="#home"
          className="text-3xl font-bold font-inter hover:opacity-70 transition-all duration-300 relative group"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
            MP
          </span>
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
        </a>
        <div className="hidden md:flex space-x-12 font-inter">
          {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              className="text-lg relative group transition-all duration-300 hover:text-blue-400"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>
        
        {/* Mobile menu button */}
        <button className="md:hidden p-2">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>

      {/* Enhanced Hero Section */}
      <section
        id="home"
        className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 pt-20"
      >
        {/* Profile Image with enhanced styling */}
        <div className="relative mb-8 group">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 p-1 animate-pulse">
            <div className="w-72 h-72 rounded-full bg-gradient-to-br from-[#0f0f0f] to-[#1a1a2e]"></div>
          </div>
          <img
            src="/main.png"
            alt="Madan Pandey"
            className="relative w-72 h-72 rounded-full object-cover border-4 border-transparent group-hover:scale-105 transition-transform duration-500"
          />
          {/* Floating elements around profile */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full animate-ping"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 140}px`,
                left: `${20 + Math.cos(i * 60 * Math.PI / 180) * 140}px`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </div>

        {/* Enhanced Name with gradient */}
        <h1 className="text-7xl md:text-8xl font-bold mb-4 font-inter">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 animate-gradient">
            Madan Pandey
          </span>
        </h1>

        {/* Animated subtitle */}
        <div className="mb-6 h-8">
          <p className="text-2xl md:text-3xl text-blue-400 font-semibold animate-pulse">
            Frontend Developer
          </p>
        </div>

        {/* Enhanced description */}
        <p className="text-lg md:text-xl text-gray-300 max-w-4xl mb-8 leading-relaxed">
          Crafting digital experiences with passion and precision. Specializing in
          <span className="text-blue-400 font-semibold"> React</span>,
          <span className="text-purple-400 font-semibold"> JavaScript</span>, and
          <span className="text-pink-400 font-semibold"> Modern Web Technologies</span>.
          Building responsive, user-centric applications that make a difference.
        </p>

        {/* Enhanced action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <a
            href="./Madan-Pandey-Resume.pdf"
            download
            className="group relative px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl font-bold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
            <svg
              className="w-5 h-5 group-hover:animate-bounce"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download Resume</span>
          </a>
          
          <a
            href="#projects"
            className="group px-8 py-4 border-2 border-blue-500 rounded-xl font-bold hover:bg-blue-500 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2"
          >
            <span>View My Work</span>
            <svg
              className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="flex flex-col items-center animate-bounce">
            <p className="text-sm text-gray-400 mb-2">Scroll to explore</p>
            <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                About Me
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Passionate about creating digital solutions that bridge the gap between design and functionality
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-blue-400">My Journey</h3>
                <p className="text-gray-300 leading-relaxed">
                  Started as a curious mind exploring the endless possibilities of web development. 
                  Over the past year, I've immersed myself in modern frontend technologies, 
                  constantly learning and adapting to create exceptional user experiences.
                </p>
              </div>
              
              <div className="p-6 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl border border-purple-500/20 backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-4 text-purple-400">My Mission</h3>
                <p className="text-gray-300 leading-relaxed">
                  To craft digital experiences that not only look stunning but also provide 
                  intuitive functionality. I believe in the power of clean code, thoughtful 
                  design, and continuous learning.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {[
                { label: 'Projects Completed', value: '10+', color: 'blue' },
                { label: 'Technologies Learned', value: '8+', color: 'purple' },
                { label: 'Months of Experience', value: '12+', color: 'pink' },
                { label: 'Lines of Code', value: '5K+', color: 'indigo' },
              ].map((stat, index) => (
                <div key={index} className="text-center p-6 bg-black/20 rounded-2xl border border-gray-700/30 backdrop-blur-sm group hover:scale-105 transition-transform duration-300">
                  <div className={`text-4xl font-bold mb-2 text-${stat.color}-400`}>
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Skills Section */}
      <section id="skills" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Skills & Expertise
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Technologies and tools I use to bring ideas to life
            </p>
          </div>

          {/* Frontend Skills */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Frontend Development
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <EnhancedSkillCard name="HTML5" duration="12 months" progress={90} color="orange" icon="🌐" />
              <EnhancedSkillCard name="CSS3 & Tailwind" duration="12 months" progress={85} color="blue" icon="🎨" />
              <EnhancedSkillCard name="JavaScript" duration="3 months" progress={25} color="yellow" icon="⚡" />
              <EnhancedSkillCard name="React.js" duration="3 months" progress={25} color="cyan" icon="⚛️" />
            </div>
          </div>

          {/* Backend & Other Skills */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                Backend & Data Science
              </span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <EnhancedSkillCard name="Python" duration="4 months" progress={35} color="green" icon="🐍" />
              <EnhancedSkillCard name="MySQL" duration="4 months" progress={30} color="blue" icon="🗄️" />
              <EnhancedSkillCard name="Machine Learning" duration="3 months" progress={25} color="purple" icon="🤖" />
            </div>
          </div>

          {/* Tools & Technologies */}
          <div>
            <h3 className="text-3xl font-bold mb-8 text-center">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-red-400">
                Tools & Technologies
              </span>
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {[
                { name: 'Git', icon: '📝' },
                { name: 'VS Code', icon: '💻' },
                { name: 'Figma', icon: '🎯' },
                { name: 'Node.js', icon: '🌟' },
                { name: 'MongoDB', icon: '🍃' },
                { name: 'Docker', icon: '🐳' },
              ].map((tool, index) => (
                <div 
                  key={tool.name}
                  className="group p-4 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl border border-gray-700/30 backdrop-blur-sm hover:scale-105 transition-all duration-300 text-center cursor-pointer"
                >
                  <div className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                    {tool.icon}
                  </div>
                  <div className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors duration-300">
                    {tool.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Projects Section */}
      <section id="projects" className="py-32 px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Featured Projects
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Showcasing my journey through code, creativity, and problem-solving
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <EnhancedProjectCard
              title="Portfolio Website"
              description="A modern, responsive portfolio website showcasing my projects and skills. Features interactive animations, smooth transitions, and optimized performance with React and modern web technologies."
              url="https://github.com/Madan-21/Portflolio"
              technologies={["JavaScript", "HTML5", "CSS3", "React"]}
              status="Live"
              gradient="from-blue-500 to-cyan-500"
            />
            <EnhancedProjectCard
              title="Data Science with Python"
              description="Comprehensive data science training repository containing Python implementations, machine learning algorithms, data analysis techniques, and Jupyter notebooks for hands-on learning."
              url="https://github.com/Madan-21/Data-Science-with-Python-Training"
              technologies={["Python", "Jupyter Notebook", "Pandas", "NumPy"]}
              status="Live"
              gradient="from-purple-500 to-pink-500"
            />
            <EnhancedProjectCard
              title="To-Do List Application"
              description="A clean and functional to-do list web application built with vanilla HTML, CSS, and JavaScript. Features task management, local storage, and responsive design for productivity tracking."
              url="https://github.com/Madan-21/To_do_list"
              technologies={["HTML5", "CSS3", "JavaScript", "Local Storage"]}
              status="Live"
              gradient="from-green-500 to-teal-500"
            />
            <EnhancedProjectCard
              title="AI & Machine Learning"
              description="Collection of artificial intelligence and machine learning projects using Python. Includes various algorithms, neural networks, and practical implementations with Jupyter notebooks."
              url="https://github.com/Madan-21/AI-ML"
              technologies={["Python", "Machine Learning", "Jupyter Notebook", "TensorFlow"]}
              status="Development"
              gradient="from-orange-500 to-red-500"
            />
          </div>

          {/* View More Projects Button */}
          <div className="text-center mt-16">
            <a
              href="https://github.com/Madan-21"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center space-x-3 px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl border border-gray-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold">View All Projects on GitHub</span>
              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-6 font-inter">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                Let's Connect
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Ready to bring your ideas to life? Let's discuss your next project
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="p-8 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-2xl border border-blue-500/20 backdrop-blur-sm">
                <h3 className="text-3xl font-bold mb-6 text-white">Get in Touch</h3>
                <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                  I'm always excited to work on new projects and collaborate with amazing people. 
                  Whether you have a project in mind, want to discuss opportunities, or just want to say hello, 
                  feel free to reach out!
                </p>
                
                <div className="space-y-6">
                  <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Email</p>
                      <a href="mailto:pmadan466@gmail.com" className="text-lg text-white hover:text-blue-400 transition-colors">
                        pmadan466@gmail.com
                      </a>
                    </div>
                  </div>
                  
                  <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Location</p>
                      <p className="text-lg text-white">Kadhaghari, Kathmandu</p>
                    </div>
                  </div>

                  <div className="group flex items-center space-x-4 p-4 rounded-xl hover:bg-white/5 transition-all duration-300">
                    <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Response Time</p>
                      <p className="text-lg text-white">Within 24 hours</p>
                    </div>
                  </div>
                </div>

                {/* Social Links */}
                <div className="mt-8 pt-8 border-t border-gray-700/50">
                  <p className="text-gray-400 mb-4">Follow me on social media</p>
                  <div className="flex space-x-4">
                    <a
                      href="https://www.linkedin.com/in/madanpandey1"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110"
                    >
                      <img src="/linkedin.svg" alt="LinkedIn" className="w-6 h-6 filter brightness-0 invert" />
                    </a>
                    <a
                      href="https://github.com/Madan-21"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-110"
                    >
                      <img src="/github.svg" alt="GitHub" className="w-6 h-6 filter brightness-0 invert" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Contact Form */}
            <div className="p-8 bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl border border-gray-700/30 backdrop-blur-sm">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your Full Name"
                      className="w-full p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                      required
                    />
                  </div>
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      className="w-full p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject || ''}
                    onChange={handleInputChange}
                    placeholder="Project Discussion / Collaboration / General Inquiry"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500"
                  />
                </div>
                
                <div className="group">
                  <label className="block text-sm font-medium text-gray-300 mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell me about your project, ideas, or just say hello..."
                    rows="6"
                    className="w-full p-4 bg-gray-800/50 border border-gray-700/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 placeholder-gray-500 resize-none"
                    required
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  className="group w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-4 px-6 rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl flex items-center justify-center space-x-3"
                >
                  <span>Send Message</span>
                  <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900/50 to-black/50 py-16 px-4 relative z-10 border-t border-gray-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="space-y-4">
              <div className="text-4xl font-bold font-inter">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  MP
                </span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Building digital experiences with passion, creativity, and cutting-edge technology.
              </p>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/madanpandey1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full hover:from-blue-500 hover:to-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <img src="/linkedin.svg" alt="LinkedIn" className="w-5 h-5 filter brightness-0 invert" />
                </a>
                <a
                  href="https://github.com/Madan-21"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full hover:from-gray-600 hover:to-gray-700 transition-all duration-300 hover:scale-110"
                >
                  <img src="/github.svg" alt="GitHub" className="w-5 h-5 filter brightness-0 invert" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter text-white">Navigation</h3>
              <div className="flex flex-col space-y-3">
                {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
                  <a
                    key={item}
                    href={`#${item.toLowerCase()}`}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-300 hover:translate-x-1 transform"
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>

            {/* Contact Info */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter text-white">Get in Touch</h3>
              <div className="space-y-3">
                <a
                  href="mailto:pmadan466@gmail.com"
                  className="flex items-center space-x-2 text-gray-400 hover:text-blue-400 transition-colors duration-300 group"
                >
                  <svg className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>pmadan466@gmail.com</span>
                </a>
                <div className="flex items-center space-x-2 text-gray-400">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>Kadhaghari, Kathmandu</span>
                </div>
              </div>
            </div>

            {/* Skills Summary */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold font-inter text-white">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {['React', 'JavaScript', 'HTML/CSS', 'Python', 'Tailwind', 'MySQL'].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-xs text-blue-400 hover:from-blue-500/30 hover:to-purple-500/30 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Divider */}
          <div className="relative my-12">
            <div className="h-px bg-gradient-to-r from-transparent via-gray-600 to-transparent"></div>
            <div className="absolute inset-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent blur-sm"></div>
          </div>

          {/* Enhanced Copyright */}
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">©</span>
              <p className="text-gray-400">
                {new Date().getFullYear()} Madan Pandey. All rights reserved.
              </p>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <span>Made with</span>
              <span className="text-red-500 animate-pulse">❤️</span>
              <span>and</span>
              <span className="text-blue-400">React</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
