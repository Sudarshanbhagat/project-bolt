import { Code2, Brain, Cpu, Award } from 'lucide-react';
import { useMemo, useState } from 'react';
import ProfilePreview from './ProfilePreview';

export default function About() {
  const [previewOpen, setPreviewOpen] = useState(false);
  const highlights = [
    {
      icon: Brain,
      title: 'AI/ML Expertise',
      description: 'Validated AI models at SOUL AI, improving response accuracy by ~20%',
    },
    {
      icon: Code2,
      title: 'Mobile Development',
      description: 'Led development of AI-powered shopping app, reducing launch time by 32%',
    },
    {
      icon: Cpu,
      title: 'Embedded Systems',
      description: 'Optimized firmware at EATON, reducing post-deployment issues by 30%',
    },
    {
      icon: Award,
      title: 'Certified Professional',
      description: 'Certified Ethical Hacker v13 | Published IEEE Research',
    },
  ];

  const experienceSince = useMemo(() => {
    // compute months since Mar 31 2025
    const start = new Date('2025-03-31');
    const now = new Date();
    let months = (now.getFullYear() - start.getFullYear()) * 12 + (now.getMonth() - start.getMonth());
    // if current date is before the start day of the month, decrement months
    if (now.getDate() < start.getDate()) months -= 1;
    if (months < 0) months = 0;
    if (months < 12) return `${months} ${months === 1 ? 'month' : 'months'}`;
    const years = Math.floor(months / 12);
    return `${years} ${years === 1 ? 'year' : 'years'}`;
  }, []);

  return (
    <section id="about" className="py-20 px-4 bg-gradient-to-b from-black to-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-400 font-mono">{'> '}</span>
            About Me
          </h2>
          <div className="h-1 w-24 bg-green-400 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
          <div className="space-y-6 order-2 md:order-1">
            <p className="text-gray-300 leading-relaxed text-lg">
              Software Developer with proven expertise in Android and cross-platform app development,
              AI model training, and embedded system validation. I specialize in building intelligent
              systems that deliver measurable business impact.
            </p>
            <p className="text-gray-300 leading-relaxed text-lg">
              My experience spans from validating AI models at SOUL AI, leading mobile app development
              at GGST Innovation, to optimizing embedded firmware at EATON. I thrive in collaborative
              Agile environments and have a track record of improving performance, reliability, and
              user engagement across multiple domains.
            </p>
            <div className="flex items-center space-x-4 pt-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">{experienceSince}</div>
                <div className="text-sm text-gray-400 font-mono">Professional Experience</div>
              </div>
              <div className="h-12 w-px bg-green-900/50"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">100+</div>
                <div className="text-sm text-gray-400 font-mono">Active Users</div>
              </div>
              <div className="h-12 w-px bg-green-900/50"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">20+</div>
                <div className="text-sm text-gray-400 font-mono">Projects</div>
              </div>
            </div>
          </div>

          <div className="space-y-4 order-1 md:order-2 flex flex-col items-center md:items-end">
            <div>
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
                className="w-48 h-48 md:w-64 md:h-64 rounded-full object-cover border border-green-900/40 shadow-lg mb-6"
                onClick={() => setPreviewOpen(true)}
                role="button"
                tabIndex={0}
              />
            </div>
            <ProfilePreview src={(import.meta.env.VITE_API_BASE as string ? `${import.meta.env.VITE_API_BASE}/uploads/profile.jpg` : '/profile.jpg')} alt="Profile" open={previewOpen} onClose={() => setPreviewOpen(false)} />
            {highlights.map((item, index) => (
              <div
                key={index}
                className="group bg-black/50 border border-green-900/30 hover:border-green-400/50 rounded-lg p-6 transition-all duration-300 hover:bg-green-900/10"
              >
                <div className="flex items-start space-x-4">
                  <div className="bg-green-900/30 p-3 rounded-lg group-hover:bg-green-900/50 transition-colors">
                    <item.icon className="w-6 h-6 text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2 font-mono">{item.title}</h3>
                    <p className="text-gray-400 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-black/50 border border-green-900/30 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-white mb-6 font-mono">
            <span className="text-green-400">{'> '}</span>Education
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h4 className="text-xl text-white font-semibold">Bachelor of Technology</h4>
                <p className="text-green-400 font-mono">Electronics and Telecommunication</p>
                <p className="text-gray-400">Vishwakarma Institute of Technology, Pune</p>
              </div>
              <div className="text-right">
                <p className="text-gray-400 font-mono">Jan 2022 - May 2025</p>
                <p className="text-green-400 font-bold">GPA: 7.84/10.0</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
