/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, AnimatePresence, useScroll, useTransform, useSpring } from "motion/react";
import { 
  Coffee, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Twitter, 
  ArrowRight, 
  ChevronRight,
  Menu as MenuIcon,
  X,
  Wind,
  Zap,
  Heart
} from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Section = 'home' | 'menu' | 'vibes' | 'contact';

export default function App() {
  const [activeSection, setActiveSection] = useState<Section>('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse movement for 3D parallax
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 40,
        y: (e.clientY / window.innerHeight - 0.5) * 40,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const sections: { id: Section; label: string }[] = [
    { id: 'home', label: 'The Haus' },
    { id: 'menu', label: 'The Brew' },
    { id: 'vibes', label: 'Mumbai Vibes' },
    { id: 'contact', label: 'Find Us' },
  ];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-coffee-900 font-sans text-cream-100">
      {/* Background Layer - 3D Depth */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div 
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(74,59,53,0.15)_0%,transparent_70%)]"
        />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 flex justify-between items-center px-8 py-6">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-accent-gold rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.3)]">
            <Coffee className="w-6 h-6 text-coffee-900" />
          </div>
          <span className="text-2xl font-serif italic font-bold tracking-tight">Brews Haus</span>
        </motion.div>

        <div className="hidden md:flex items-center gap-8">
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`relative text-xs font-bold uppercase tracking-[0.2em] transition-colors hover:text-accent-gold ${activeSection === s.id ? 'text-accent-gold' : 'text-cream-100/40'}`}
            >
              {s.label}
              {activeSection === s.id && (
                <motion.div 
                  layoutId="nav-underline"
                  className="absolute -bottom-2 left-0 w-full h-0.5 bg-accent-gold"
                />
              )}
            </button>
          ))}
        </div>

        <button 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden p-2 text-cream-100"
        >
          {isMenuOpen ? <X /> : <MenuIcon />}
        </button>
      </nav>

      {/* Main Content Layers */}
      <main className="relative h-full w-full flex items-center justify-center perspective-1000">
        <AnimatePresence mode="wait">
          {activeSection === 'home' && (
            <motion.section
              key="home"
              initial={{ opacity: 0, rotateY: 45, z: -500, x: 100 }}
              animate={{ opacity: 1, rotateY: 0, z: 0, x: 0 }}
              exit={{ opacity: 0, rotateY: -45, z: -500, x: -100 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative z-10 w-full h-full flex flex-col items-center justify-center px-6 preserve-3d"
            >
              {/* Background Text Layer */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-0">
                <motion.h1 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="text-[20vw] font-black uppercase tracking-tighter leading-none text-white/10 select-none"
                >
                  BREWS
                </motion.h1>
                <motion.h1 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.1, 0.15, 0.1]
                  }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="text-[20vw] font-black uppercase tracking-tighter leading-none text-white/10 select-none"
                >
                  HAUS
                </motion.h1>
              </div>

              {/* 3D Cup Container - Centered */}
              <motion.div 
                className="relative w-80 h-80 md:w-[650px] md:h-[650px] z-20 preserve-3d cursor-grab active:cursor-grabbing"
                animate={{ 
                  rotateX: mousePos.y * 0.3,
                  rotateY: mousePos.x * 0.3,
                  y: [0, -25, 0]
                }}
                transition={{ 
                  rotateX: { type: "spring", damping: 30, stiffness: 50 },
                  rotateY: { type: "spring", damping: 30, stiffness: 50 },
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Realistic Shadow */}
                <motion.div 
                  className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-16 bg-black/80 blur-[80px] rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.8, 0.4, 0.8] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                />
                
                {/* Photo-Realistic Cup Image */}
                <div className="relative w-full h-full flex items-center justify-center">
                  {/* The Base Cup Image (High Quality PNG) */}
                  <img 
                    src="https://pngimg.com/uploads/paper_cup/paper_cup_PNG12128.png" 
                    alt="Realistic Coffee Cup" 
                    className="w-full h-full object-contain drop-shadow-[0_50px_100px_rgba(0,0,0,1)] brightness-95 contrast-110"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Branded Logo Overlay - Warped to fit cup curvature */}
                  <motion.div 
                    className="absolute top-[45%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/3 aspect-square flex flex-col items-center justify-center pointer-events-none"
                    style={{ 
                      perspective: "800px",
                      transformStyle: "preserve-3d"
                    }}
                  >
                    <div className="bg-coffee-900/95 p-4 md:p-8 rounded-full border-2 border-accent-gold/50 shadow-[0_0_50px_rgba(212,175,55,0.2)] backdrop-blur-md flex flex-col items-center justify-center scale-90 md:scale-100">
                      <div className="flex flex-col items-center gap-1">
                        <Coffee className="w-12 h-12 text-accent-gold mb-1" />
                        <div className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-accent-gold leading-none">BREWS</div>
                        <div className="text-[14px] md:text-[16px] font-black uppercase tracking-[0.4em] text-accent-gold leading-none">HAUS</div>
                        <div className="text-[10px] md:text-[12px] font-bold uppercase tracking-[0.3em] text-cream-100/40">CAFE</div>
                      </div>
                    </div>
                  </motion.div>
                </div>
                
                {/* Realistic Steam Effects */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div 
                      key={i}
                      animate={{ 
                        y: [-20, -180], 
                        x: [0, (i - 1) * 30, 0],
                        opacity: [0, 0.6, 0], 
                        scale: [0.5, 2.5],
                        filter: ["blur(10px)", "blur(25px)"]
                      }}
                      transition={{ 
                        duration: 4 + i, 
                        repeat: Infinity, 
                        delay: i * 1.5,
                        ease: "easeOut"
                      }}
                      className="absolute top-1/4 left-1/2 w-12 h-12 bg-white/10 rounded-full"
                    />
                  ))}
                </div>
              </motion.div>

              {/* Foreground Content */}
              <div className="relative z-30 text-center mt-8 max-w-2xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mb-4 text-accent-gold font-serif italic text-2xl"
                >
                  Mumbai's finest artisanal coffee
                </motion.div>
                <motion.h2 
                  className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8"
                >
                  Sip the <span className="text-accent-gold">Soul</span> of Mumbai
                </motion.h2>
                <div className="flex justify-center gap-6">
                  <button 
                    onClick={() => setActiveSection('menu')}
                    className="group relative px-10 py-5 bg-accent-gold text-coffee-900 rounded-full font-black uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95"
                  >
                    <span className="relative z-10 flex items-center gap-2">
                      Explore Menu <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </button>
                  <button 
                    onClick={() => setActiveSection('contact')}
                    className="px-10 py-5 border border-cream-100/20 rounded-full font-black uppercase tracking-widest hover:bg-cream-100/5 transition-all"
                  >
                    Visit Us
                  </button>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'menu' && (
            <motion.section
              key="menu"
              initial={{ opacity: 0, rotateX: 45, z: -500, y: 100 }}
              animate={{ opacity: 1, rotateX: 0, z: 0, y: 0 }}
              exit={{ opacity: 0, rotateX: -45, z: -500, y: -100 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full max-w-6xl px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
            >
              <div className="space-y-8">
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
                  The <span className="text-accent-gold italic">Brew</span> <br />List
                </h2>
                <div className="space-y-6">
                  {[
                    { name: "Bombay Dark Roast", price: "₹280", desc: "Bold, nutty, and intensely aromatic." },
                    { name: "Haus Special Latte", price: "₹320", desc: "Velvety smooth with a hint of cardamom." },
                    { name: "Cold Brew Tonic", price: "₹350", desc: "Refreshing, citrusy, and perfectly balanced." },
                    { name: "Sea Salt Mocha", price: "₹340", desc: "Rich chocolate with a coastal twist." },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="group flex justify-between items-end border-b border-cream-100/10 pb-4 hover:border-accent-gold transition-colors cursor-pointer"
                    >
                      <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight group-hover:text-accent-gold transition-colors">{item.name}</h3>
                        <p className="text-cream-100/40 text-sm">{item.desc}</p>
                      </div>
                      <div className="text-accent-gold font-black">{item.price}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl group">
                <img 
                  src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&q=80&w=1000" 
                  alt="Coffee" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900 via-transparent to-transparent" />
                <div className="absolute bottom-8 left-8">
                  <div className="text-xs font-bold uppercase tracking-widest text-accent-gold mb-2">Signature Blend</div>
                  <div className="text-2xl font-bold">The Colaba Roast</div>
                </div>
              </div>
            </motion.section>
          )}

          {activeSection === 'vibes' && (
            <motion.section
              key="vibes"
              initial={{ opacity: 0, scale: 0.8, rotateZ: 10 }}
              animate={{ opacity: 1, scale: 1, rotateZ: 0 }}
              exit={{ opacity: 0, scale: 1.2, rotateZ: -10 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="w-full max-w-7xl px-6 grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {[
                "https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1501339817302-ae4468af600e?auto=format&fit=crop&q=80&w=600",
                "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80&w=600",
              ].map((img, i) => (
                <motion.div 
                  key={i}
                  whileHover={{ y: -20, scale: 1.05 }}
                  className={`relative rounded-2xl overflow-hidden shadow-xl ${i % 2 === 0 ? 'mt-12' : ''}`}
                >
                  <img src={img} alt="Vibe" className="w-full h-full object-cover aspect-[3/4]" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-coffee-900/20 hover:bg-transparent transition-colors" />
                </motion.div>
              ))}
              <div className="col-span-full mt-12 text-center">
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">
                  Where <span className="text-accent-gold">Art</span> Meets <span className="italic">Coffee</span>
                </h2>
                <p className="text-cream-100/40 text-lg">A sanctuary for creators, dreamers, and caffeine lovers in the heart of Mumbai.</p>
              </div>
            </motion.section>
          )}

          {activeSection === 'contact' && (
            <motion.section
              key="contact"
              initial={{ opacity: 0, y: 100, filter: "blur(20px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -100, filter: "blur(20px)" }}
              className="w-full max-w-4xl px-6"
            >
              <div className="glass-card p-12 rounded-3xl border border-cream-100/10 grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <h2 className="text-4xl font-black uppercase tracking-tighter mb-8">Find the <span className="text-accent-gold">Haus</span></h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <MapPin className="w-6 h-6 text-accent-gold shrink-0" />
                      <div>
                        <div className="font-bold uppercase tracking-widest text-xs mb-1">Location</div>
                        <p className="text-cream-100/60">12, Apollo Bunder, Colaba, <br />Mumbai, Maharashtra 400001</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Clock className="w-6 h-6 text-accent-gold shrink-0" />
                      <div>
                        <div className="font-bold uppercase tracking-widest text-xs mb-1">Hours</div>
                        <p className="text-cream-100/60">Mon - Sun: 8:00 AM - 11:00 PM</p>
                      </div>
                    </div>
                    <div className="flex gap-4 pt-4">
                      <button className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-coffee-900 transition-all"><Instagram className="w-5 h-5" /></button>
                      <button className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-coffee-900 transition-all"><Facebook className="w-5 h-5" /></button>
                      <button className="p-3 bg-white/5 rounded-full hover:bg-accent-gold hover:text-coffee-900 transition-all"><Twitter className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Simulate booking and redirect
                    const btn = e.currentTarget.querySelector('button');
                    if (btn) {
                      btn.innerText = "RESERVING...";
                      btn.disabled = true;
                      btn.style.opacity = "0.7";
                    }
                    setTimeout(() => {
                      if (btn) btn.innerText = "SUCCESS! REDIRECTING...";
                      setTimeout(() => {
                        window.location.href = "https://www.instagram.com/brewshauscafe/"; // Redirect to Instagram
                      }, 1000);
                    }, 1500);
                  }}
                  className="space-y-4"
                >
                  <h3 className="text-xl font-bold uppercase tracking-tight mb-4">Reserve a Table</h3>
                  <input required type="text" placeholder="NAME" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent-gold transition-colors" />
                  <input required type="email" placeholder="EMAIL" className="w-full bg-white/5 border border-white/10 rounded-xl px-6 py-4 text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-accent-gold transition-colors" />
                  <button type="submit" className="w-full py-5 bg-accent-gold text-coffee-900 rounded-xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all">
                    Book Now
                  </button>
                  <p className="text-[10px] text-center text-white/20 uppercase tracking-widest">Redirecting to Instagram after booking</p>
                </form>
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Interactive Floating Elements */}
      <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-coffee-800/80 backdrop-blur-xl border border-white/5 px-6 py-3 rounded-full shadow-2xl">
        {sections.map((s) => (
          <button
            key={s.id}
            onClick={() => setActiveSection(s.id)}
            className={`w-3 h-3 rounded-full transition-all ${activeSection === s.id ? 'bg-accent-gold scale-150 shadow-[0_0_10px_rgba(212,175,55,0.5)]' : 'bg-white/20 hover:bg-white/40'}`}
          />
        ))}
      </div>

      {/* Side Progress Rail */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-8">
        <div className="h-24 w-px bg-white/10 relative">
          <motion.div 
            className="absolute top-0 left-0 w-full bg-accent-gold"
            animate={{ height: `${(sections.findIndex(s => s.id === activeSection) + 1) * 25}%` }}
          />
        </div>
        <div className="text-[10px] font-black uppercase tracking-[0.3em] rotate-90 whitespace-nowrap text-white/20">
          EST. 2024
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            className="fixed inset-0 z-[60] bg-coffee-900 flex flex-col items-center justify-center gap-8"
          >
            <button 
              onClick={() => setIsMenuOpen(false)}
              className="absolute top-8 right-8 p-2"
            >
              <X className="w-8 h-8" />
            </button>
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  setActiveSection(s.id);
                  setIsMenuOpen(false);
                }}
                className="text-4xl font-black uppercase tracking-tighter hover:text-accent-gold transition-colors"
              >
                {s.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
