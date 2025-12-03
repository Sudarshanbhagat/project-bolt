import { Mail, Phone, MapPin, Github, Linkedin, Download, Send, Copy } from 'lucide-react';
import { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'copied' | 'error'>('idle');
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'sudarshanwork99@gmail.com',
      link: 'mailto:sudarshanwork99@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+91 9156297268',
      link: 'tel:+919156297268',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Pune, Maharashtra',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      link: 'https://github.com/sudarshan99',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      link: 'https://linkedin.com/in/sudarshan-bhagat',
    },
  ];

  return (
    <section id="contact" className="py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            <span className="text-green-400 font-mono">{'> '}</span>
            Get In Touch
          </h2>
          <div className="h-1 w-24 bg-green-400 rounded"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-4 font-mono">Let's Connect</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                I'm always interested in hearing about new opportunities, collaborations, or just having a chat about technology.
                Feel free to reach out through any of the channels below.
              </p>

              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 group">
                    <div className="bg-green-900/30 p-3 rounded-lg group-hover:bg-green-900/50 transition-colors">
                      <item.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                          <p className="text-gray-400 text-sm font-mono">{item.label}</p>
                          {item.link ? (
                            <div className="flex items-center space-x-2">
                              <a
                                href={item.link}
                                className="text-white hover:text-green-400 transition-colors"
                              >
                                {item.value}
                              </a>
                              {item.label === 'Email' && (
                                <button
                                  type="button"
                                  onClick={async () => {
                                    try {
                                      await navigator.clipboard.writeText(item.value);
                                      setCopyStatus('copied');
                                      setTimeout(() => setCopyStatus('idle'), 2500);
                                    } catch (err) {
                                      console.error('Copy failed', err);
                                      setCopyStatus('error');
                                      setTimeout(() => setCopyStatus('idle'), 2500);
                                    }
                                  }}
                                  className="bg-green-900/20 p-2 rounded hover:bg-green-900/40 transition-colors"
                                  aria-label="Copy email"
                                >
                                  <Copy className="w-4 h-4 text-green-300" />
                                </button>
                              )}
                              {item.label === 'Email' && (
                                <button
                                  type="button"
                                  onClick={() => {
                                    // open mail client via anchor
                                    window.location.href = item.link;
                                  }}
                                  className="bg-green-400 text-black px-3 py-1 rounded font-mono text-sm hover:bg-green-500 ml-2"
                                >
                                  Open email client
                                </button>
                              )}

                              {item.label === 'Email' && copyStatus !== 'idle' && (
                                <span className={`text-sm ${copyStatus === 'copied' ? 'text-green-300' : 'text-red-400'}`}>{copyStatus === 'copied' ? 'Copied' : 'Failed'}</span>
                              )}
                            </div>
                          ) : (
                            <p className="text-white">{item.value}</p>
                          )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-white mb-4 font-mono">Social Links</h3>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-green-900/20 hover:bg-green-900/40 border border-green-900/50 hover:border-green-400/50 p-4 rounded-lg transition-all duration-300 group"
                    aria-label={social.label}
                  >
                    <social.icon className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>
            </div>

            <a
              href="/RESUME_SUDARSHAN_PRADIP_BHAGAT_2003.pdf"
              download
              className="inline-flex items-center space-x-2 bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded transition-all duration-300 font-mono font-semibold group"
            >
              <Download className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>Download Resume</span>
            </a>
          </div>

          <div className="bg-black/50 border border-green-900/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-white mb-6 font-mono">Send a Message</h3>
            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                // Simple mailto: approach — open user's email client
                const to = 'sudarshanwork99@gmail.com';
                const subject = `Contact from portfolio: ${name || 'New message'}`;
                const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${encodeURIComponent(message)}`;
                const mailto = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${body}`;
                // This will open the user's default email client with pre-filled subject and body
                window.location.href = mailto;
                setStatus('success');
              }}
            >
              <div>
                <label htmlFor="name" className="block text-gray-400 mb-2 font-mono text-sm">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-black border border-green-900/50 focus:border-green-400 rounded px-4 py-3 text-white focus:outline-none transition-colors font-mono"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 mb-2 font-mono text-sm">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-black border border-green-900/50 focus:border-green-400 rounded px-4 py-3 text-white focus:outline-none transition-colors font-mono"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 mb-2 font-mono text-sm">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-black border border-green-900/50 focus:border-green-400 rounded px-4 py-3 text-white focus:outline-none transition-colors resize-none font-mono"
                  placeholder="Your message..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-green-400 hover:bg-green-500 text-black px-6 py-3 rounded transition-all duration-300 font-mono font-semibold flex items-center justify-center space-x-2 group"
              >
                {status === 'loading' ? (
                  <span>Sending...</span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
              {status === 'success' && (
                <p className="text-sm text-green-300 mt-2">Email client opened — send the message from your email app.</p>
              )}
              {status === 'error' && (
                <p className="text-sm text-red-400 mt-2">Failed to send message. Try again.</p>
              )}
            </form>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-green-900/30 text-center">
          
          <p className="text-gray-400 font-mono">
            <span className="text-green-400">{'> '}</span>
            Built with React + Vite + Tailwind CSS
          </p>
          <p className="text-gray-500 text-sm mt-2">
            &copy; {new Date().getFullYear()} Sudarshan Bhagat. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
