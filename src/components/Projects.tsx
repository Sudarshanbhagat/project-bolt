import { ExternalLink, Github, Brain, DollarSign, Users } from 'lucide-react';

export default function Projects() {
  const projects = [
    {
      title: 'EmoTract - Emotion Recognition & Analysis',
      period: 'Aug 2024 - Mar 2025',
      description: 'Real-time emotion detection system for remote interviews and virtual classrooms using CNN and ResNet-50.',
      highlights: [
        'Achieved ~90% accuracy on curated dataset of 12,000 facial video clips',
        'Published research in IEEE detailing technical design and applications',
        'Optimized data processing pipelines using Python, TensorFlow, and OpenCV',
        'Proposed commercial integration for real-time engagement dashboards',
      ],
      tech: ['Python', 'TensorFlow', 'CNN', 'ResNet-50', 'OpenCV', 'Scikit-learn'],
      link: 'https://ieeexplore.ieee.org/document/11009820',
      icon: Brain,
    },
    {
      title: 'Smart Expense Tracker with Predictive Insights',
      period: 'May 2024 - Aug 2024',
      description: 'Cross-platform Android app with ML-powered spending predictions and advanced security features.',
      highlights: [
        'Achieved RMSE of 12.4% on 6-month holdout dataset using Gradient Boosting',
        'Implemented AES-256 encryption and OAuth2 for secure data management',
        'Acquired 100+ beta users with 75% weekly active user rate',
        'Improved user understanding of spending patterns by 40%',
      ],
      tech: ['React Native', 'MongoDB', 'Machine Learning', 'AES-256', 'OAuth2'],
      icon: DollarSign,
    },
    {
      title: 'Collaborative Task Management Web App',
      period: 'Mar 2023 - May 2023',
      description: 'Real-time collaborative platform for team task management with instant updates and tracking.',
      highlights: [
        'Enabled teams of 5-10 members to manage 50+ tasks simultaneously',
        'Reduced update delays by 100% with real-time Socket.io implementation',
        'Improved workflow efficiency by 25% over three months in pilot testing',
        'Deployed on AWS EC2 ensuring scalability and low-latency updates',
      ],
      tech: ['Node.js', 'Express', 'Socket.io', 'React', 'MongoDB', 'AWS EC2'],
      link: 'https://github.com/sudarshan99/collab-task-app',
      icon: Users,
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-400 font-mono">{'> '}</span>
            Projects
          </h2>
          <div className="h-1 w-24 bg-green-400 rounded"></div>
        </div>

        <div className="grid gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="group bg-black/50 border border-green-900/30 hover:border-green-400/50 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20"
            >
              <div className="p-8">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start space-x-4">
                    <div className="bg-green-900/30 p-3 rounded-lg group-hover:bg-green-900/50 transition-colors">
                      <project.icon className="w-6 h-6 text-green-400" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-gray-400 font-mono text-sm">{project.period}</p>
                    </div>
                  </div>
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-green-400 hover:text-green-300 transition-colors"
                    >
                      {project.link.includes('github') ? (
                        <Github className="w-6 h-6" />
                      ) : (
                        <ExternalLink className="w-6 h-6" />
                      )}
                    </a>
                  )}
                </div>

                <p className="text-gray-300 mb-6 leading-relaxed">{project.description}</p>

                <div className="space-y-2 mb-6">
                  {project.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <span className="text-green-400 mt-1">▹</span>
                      <p className="text-gray-400 text-sm">{highlight}</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-green-900/20 border border-green-900/50 text-green-400 rounded text-sm font-mono"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
