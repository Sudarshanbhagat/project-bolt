import { Terminal, Github, Linkedin, Mail, ChevronDown } from 'lucide-react';
import FloatingBadges from './FloatingBadges';
import { useEffect, useState } from 'react';
import ProfilePreview from './ProfilePreview';

export default function Hero() {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const fullText = 'Software Developer | AI Engineer | Embedded Systems Expert';

  useEffect(() => {
    if (currentIndex < fullText.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex]);

  const [previewOpen, setPreviewOpen] = useState(false);
  const imgSrc = (import.meta.env.VITE_API_BASE as string ? `${import.meta.env.VITE_API_BASE}/uploads/profile.jpg` : '/profile.jpg');

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative px-4 pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute text-green-900/40 font-mono text-xs animate-pulse"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              {Math.random() > 0.5 ? '01010101' : '10101010'}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="mb-8 inline-block">
          <div className="flex items-center space-x-2 text-green-400 mb-4">
            <Terminal className="w-8 h-8 animate-pulse" />
            <span className="font-mono text-xl">system.boot()</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-6 mb-6">
          <div className="relative">
            <img
              src={(import.meta.env.VITE_API_BASE as string ? `${import.meta.env.VITE_API_BASE}/uploads/profile.jpg` : '/profile.jpg')}
              alt="Profile"
              onError={(e) => {
                const el = e.currentTarget as HTMLImageElement;
                if (!el.dataset.fallback) {
                  el.dataset.fallback = 'true';
                  el.src = '/profile.svg';
                }
              }}
              loading="lazy"
              aria-label="Profile photo"
              className="w-28 h-28 rounded-full object-cover border border-green-900/40 shadow-lg profile-photo cursor-pointer"
              onClick={() => setPreviewOpen(true)}
            />
            {/* small uploader overlay for profile photo */}
            <div className="absolute bottom-0 right-0 bg-black/60 p-1 rounded-full">
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    const base = (import.meta.env.VITE_API_BASE as string) || '';
                    const fd = new FormData();
                    fd.append('file', f);
                    try {
                      const res = await fetch(`${base}/api/profile`, { method: 'POST', body: fd });
                      if (!res.ok) throw new Error('Failed');
                      const data = await res.json();
                      // refresh image by toggling query param
                      const img = document.querySelector('.profile-photo') as HTMLImageElement | null;
                      if (img) {
                        img.src = `${(import.meta.env.VITE_API_BASE as string) || ''}${data.url}?t=${Date.now()}`;
                      }
                    } catch (err) {
                      console.error('Upload failed', err);
                    }
                  }}
                />
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-green-300" viewBox="0 0 24 24" fill="none"><path d="M12 15v-6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M9 12l3-3 3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </label>
            </div>
            <FloatingBadges />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold">
          <span className="text-green-400 font-mono">{'> '}</span>
          <span className="text-white">Sudarshan Bhagat</span>
          </h1>
        </div>

        <div className="h-12 mb-8">
          <p className="text-xl md:text-2xl text-green-300 font-mono">
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          Building intelligent systems and scalable applications. Specializing in AI/ML,
          cross-platform mobile development, and embedded systems with a track record of
          delivering measurable impact.
        </p>

        <div className="flex justify-center space-x-6 mb-12">
          <a
            href="https://github.com/sudarshan99"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-green-900/20 hover:bg-green-900/40 border border-green-900/50 hover:border-green-400/50 text-green-400 px-6 py-3 rounded transition-all duration-300"
          >
            <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono">GitHub</span>
          </a>
          <a
            href="https://linkedin.com/in/sudarshan-bhagat"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center space-x-2 bg-green-900/20 hover:bg-green-900/40 border border-green-900/50 hover:border-green-400/50 text-green-400 px-6 py-3 rounded transition-all duration-300"
          >
            <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono">LinkedIn</span>
          </a>
          <a
            href="mailto:sudarshanwork99@gmail.com"
            className="group flex items-center space-x-2 bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded transition-all duration-300"
          >
            <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span className="font-mono font-semibold">Contact</span>
          </a>
        </div>

        <a
          href="#about"
          className="inline-block animate-bounce text-green-400 hover:text-green-300 transition-colors"
        >
          <ChevronDown className="w-8 h-8" />
        </a>
      </div>
      <ProfilePreview src={imgSrc} alt="Profile" open={previewOpen} onClose={() => setPreviewOpen(false)} />
    </section>
  );
}
