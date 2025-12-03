import { Code, Database, Cpu, Cloud, Shield, Wrench } from 'lucide-react';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Languages & Core',
      icon: Code,
      skills: ['Java', 'Python', 'C', 'C++', 'JavaScript', 'TypeScript', 'HTML', 'CSS'],
    },
    {
      title: 'Mobile & Web',
      icon: Code,
      skills: ['React Native', 'Android Development', 'React.js', 'Node.js', 'Express', 'Redux'],
    },
    {
      title: 'AI & Machine Learning',
      icon: Cpu,
      skills: ['TensorFlow', 'PyTorch', 'CNN', 'ResNet-50', 'Scikit-Learn', 'OpenCV', 'MLOps'],
    },
    {
      title: 'Databases',
      icon: Database,
      skills: ['MongoDB', 'MySQL', 'SQLite', 'Firebase'],
    },
    {
      title: 'DevOps & Cloud',
      icon: Cloud,
      skills: ['Docker', 'CI/CD Pipelines', 'Git', 'GitHub', 'AWS EC2'],
    },
    {
      title: 'Tools & Practices',
      icon: Wrench,
      skills: ['VS Code', 'Android Studio', 'Postman', 'Agile', 'TDD', 'REST APIs'],
    },
  ];

  const languages = [
    { name: 'English', level: 'Fluent' },
    { name: 'French', level: 'Fluent' },
    { name: 'Hindi', level: 'Conversational' },
    { name: 'Marathi', level: 'Native' },
  ];

  return (
    <section id="skills" className="py-20 px-4 bg-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-400 font-mono">{'> '}</span>
            Skills & Expertise
          </h2>
          <div className="h-1 w-24 bg-green-400 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {skillCategories.map((category, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-black to-gray-900 border border-green-900/30 hover:border-green-400/50 rounded-lg p-6 transition-all duration-300 hover:shadow-lg hover:shadow-green-900/20"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="bg-green-900/30 p-2 rounded group-hover:bg-green-900/50 transition-colors">
                  <category.icon className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="text-white font-semibold font-mono">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-green-900/10 border border-green-900/30 text-green-400 rounded-full text-sm font-mono hover:bg-green-900/20 hover:border-green-400/50 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gradient-to-br from-black to-gray-900 border border-green-900/30 rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-white font-mono">Certifications</h3>
            </div>
            <div className="bg-green-900/10 border border-green-900/30 rounded-lg p-6 hover:border-green-400/50 transition-colors">
              <h4 className="text-white font-semibold mb-2">Certified Ethical Hacker v13</h4>
              <p className="text-green-400 font-mono text-sm mb-1">EC-Council</p>
              <p className="text-gray-400 text-sm">September 2025</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-black to-gray-900 border border-green-900/30 rounded-lg p-8">
            <div className="flex items-center space-x-3 mb-6">
              <Code className="w-6 h-6 text-green-400" />
              <h3 className="text-2xl font-bold text-white font-mono">Languages</h3>
            </div>
            <div className="space-y-4">
              {languages.map((lang, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-white font-medium">{lang.name}</span>
                  <span className="px-3 py-1 bg-green-900/20 border border-green-900/50 text-green-400 rounded-full text-sm font-mono">
                    {lang.level}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
