import React, { useState, useEffect } from 'react';
import ProductHeaderNav from './components/ProductHeaderNav';
import ProductHeroSection from './components/ProductHeroSection';
import ProjectsCarousel from './components/ProjectsCarousel';
import ArticlesCarousel from './components/ArticlesCarousel';
import ContactFormSection from './components/ContactFormSection';
import Footer from './components/Footer';

export default function App() {
  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme === 'dark' || savedTheme === 'light') {
        return savedTheme;
      }
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
    } catch (e) {
      return 'dark';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('theme', theme);
    } catch (e) {}

    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`min-h-screen transition-colors duration-500 font-sans antialiased overflow-x-hidden selection:bg-[#0071e3] selection:text-white ${
      theme === 'dark' 
        ? 'bg-[#000000] text-[#f5f5f7]' 
        : 'bg-[#f5f5f7] text-[#1d1d1f]'
    }`}>
      
      {/* Sticky Product Navigation with Theme Switcher */}
      <ProductHeaderNav 
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Main Content Sections */}
      <main>
        {/* Hero Overview */}
        <ProductHeroSection theme={theme} />

        {/* 1. Projects Carousel (Scroll-Driven Projects) */}
        <ProjectsCarousel theme={theme} />

        {/* 2. Articles Carousel (Scroll-Driven Articles) */}
        <ArticlesCarousel theme={theme} />

        {/* 3. Contact Form Section */}
        <ContactFormSection theme={theme} />
      </main>

      {/* Footer */}
      <Footer theme={theme} />

    </div>
  );
}
