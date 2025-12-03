import { Briefcase, Calendar, MapPin, TrendingUp } from 'lucide-react';

export default function Experience() {
  const experiences = [
    {
      company: 'SOUL AI',
      role: 'AI Intern (Freelance)',
      location: 'Pune, Maharashtra',
      period: 'Nov 2025 - Present',
      achievements: [
        'Validated AI and ML model responses daily, improving decision accuracy by ~20%',
        'Trained AI models weekly on curated datasets of 25k-30k text samples from 50k+ prompts',
        'Reduced incorrect outputs by 15-20% using TensorFlow, OpenCV, and Scikit-learn',
        'Reduced manual review workload by ~15%, accelerating feature testing and deployment',
      ],
      color: 'green',
    },
    {
      company: 'GGST Innovation P.Ltd',
      role: 'Android Developer (Full-Time)',
      location: 'Pune, Maharashtra',
      period: 'Nov 2025 - Present',
      achievements: [
        'Led team of 5 interns to deliver AI-powered shopping app 3 weeks ahead of schedule',
        'Reduced app launch time from 2.8s to 1.9s, increasing 30-day retention by 15%',
        'Built cross-platform Android and iOS apps using React Native, reusing 80% of code',
        'Reduced post-release defects by 22% through rigorous testing and code optimization',
      ],
      color: 'green',
    },
    {
      company: 'EATON',
      role: 'Firmware Intern',
      location: 'Pune, Maharashtra',
      period: 'Mar 2025 - Sep 2025',
      achievements: [
        'Executed full lifecycle validation of embedded systems using hardware-in-the-loop testing',
        'Reduced post-deployment issues by 30% adhering to IEC 61508 safety standards',
        'Developed device drivers (GPIO, UART, I2C, SPI, CAN) improving responsiveness by 25%',
        'Delivered 12 story points per sprint in Agile environment, meeting all milestones',
      ],
      color: 'green',
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-400 font-mono">{'> '}</span>
            Experience
          </h2>
          <div className="h-1 w-24 bg-green-400 rounded"></div>
        </div>

        <div className="space-y-8">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className="group bg-gradient-to-r from-black to-gray-900 border border-green-900/30 hover:border-green-400/50 rounded-lg p-8 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                    {exp.role}
                  </h3>
                  <div className="flex items-center space-x-2 text-green-400 font-mono mb-2">
                    <Briefcase className="w-4 h-4" />
                    <span>{exp.company}</span>
                  </div>
                  <div className="flex items-center space-x-4 text-gray-400 text-sm">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{exp.location}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span className="font-mono">{exp.period}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {exp.achievements.map((achievement, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <TrendingUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-300 leading-relaxed">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
