import React, { useState, useEffect } from 'react'
import { Menu, X, TestTube } from 'lucide-react'
import { motion } from 'framer-motion'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Generate snow dots
  const snowDots = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    size: Math.random() * 2 + 0.5,
    animationDelay: Math.random() * 10,
    animationDuration: Math.random() * 20 + 15,
    top: Math.random() * 100,
  }))

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'skills', label: 'Skills' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ]

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-slate-900/95 backdrop-blur-sm shadow-lg border-b border-slate-700/50' : 'bg-transparent'
      }`}
    >
      {/* Snow Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-5">
        {snowDots.map((dot) => (
          <motion.div
            key={dot.id}
            className="absolute bg-white/60 rounded-full"
            style={{
              width: `${dot.size}px`,
              height: `${dot.size}px`,
              top: `${dot.top}%`,
              left: '-10px',
            }}
            animate={{
              x: ['0px', '120vw'],
              y: [0, 20, -10, 30, 0],
            }}
            transition={{
              duration: dot.animationDuration,
              delay: dot.animationDelay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>
      <nav className="container mx-auto px-6 py-4 relative z-10">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <motion.div 
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2"
          >
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-lg">
              <TestTube className="text-white" size={20} />
            </div>
            <div className="text-xl font-bold">
              <span className="text-white">Sachinthana Godakanda</span>
            </div>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-white transition-all duration-300 relative group font-medium"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full"></span>
              </motion.button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2 rounded-lg hover:bg-slate-800/50 transition-colors duration-300"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ 
            opacity: isMenuOpen ? 1 : 0, 
            height: isMenuOpen ? 'auto' : 0 
          }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4 border-t border-slate-700/50 mt-4">
            {navItems.map((item, index) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                whileHover={{ x: 5 }}
                className="block w-full text-left text-gray-300 hover:text-white transition-colors duration-300 font-medium py-2"
              >
                {item.label}
              </motion.button>
            ))}
          </div>
        </motion.div>
      </nav>
    </motion.header>
  )
}

export default Header
