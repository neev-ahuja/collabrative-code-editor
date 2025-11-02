import React, { useState, useEffect } from 'react';
import { Code2, Users, Zap, MessageSquare, Sparkles, Globe, Github, FileText, Shield, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    const handleMouseMove = (e : {clientX : number , clientY :number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev : any) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[id^="section-"]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Real-Time Collaboration",
      description: "Code simultaneously with your team. See cursors, edits, and changes instantly."
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: "Multi-Language Support",
      description: "JavaScript, Python, Java, C++, and 50+ languages with syntax highlighting."
    },
    {
      icon: <MessageSquare className="w-8 h-8" />,
      title: "Integrated Live Chat",
      description: "Discuss code without leaving the editor. Built-in voice and video calls."
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "AI Code Assistant",
      description: "Get intelligent code suggestions, bug fixes, and documentation on demand."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Compilation",
      description: "Run and test your code in the browser. No setup required."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Universal Access",
      description: "Work from anywhere. Cloud-synced projects accessible on any device."
    }
  ];

  const steps = [
    { num: "01", title: "Create Room", desc: "Start a new coding session instantly" },
    { num: "02", title: "Share Link", desc: "Invite teammates with a simple URL" },
    { num: "03", title: "Code Together", desc: "Collaborate in real-time seamlessly" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black text-white overflow-hidden relative">
      {/* Animated background gradient */}
      <div 
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 102, 241, 0.15), transparent 80%)`
        }}
      />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/4 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          <div className="mb-8 inline-block">
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 animate-fade-in">
            Code Together in Real-Time
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Collaborate, compile, and create instantly with your team. The most powerful collaborative coding platform built for modern developers.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <button className="group px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg font-semibold text-lg hover:shadow-lg hover:shadow-indigo-500/50 transition-all duration-300 hover:scale-105 flex items-center gap-2" 
              onClick={() => navigate('/startcoding')}
            >
              Start Coding
              <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg font-semibold text-lg hover:bg-white/10 transition-all duration-300">
              Watch Demo
            </button>
          </div>

          {/* Code snippet animation */}
          <div className="max-w-4xl mx-auto bg-gray-900/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span className="ml-4 text-sm text-gray-400">main.js</span>
            </div>
            <div className="font-mono text-left text-sm space-y-2">
              <div className="text-purple-400">const <span className="text-blue-400">collaborate</span> = <span className="text-yellow-400">async</span> () ={'>'} {'{'}</div>
              <div className="pl-4 text-gray-300">
                <span className="text-pink-400">await</span> editor.<span className="text-green-400">connect</span>();
              </div>
              <div className="pl-4 text-gray-400">// Your team joins instantly ✨</div>
              <div className="pl-4 text-gray-300">
                team.<span className="text-green-400">code</span>(<span className="text-orange-400">'together'</span>);
              </div>
              <div className="text-purple-400">{'}'}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="section-features" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-400">Everything you need to code collaboratively</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className={`group p-8 bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl hover:bg-gray-800/50 hover:border-indigo-500/50 transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-indigo-500/20 ${
                  isVisible['section-features'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 100}ms` }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="section-howto" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-transparent via-indigo-950/10 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['section-howto'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              How It Works
            </h2>
            <p className="text-xl text-gray-400">Get started in seconds</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <div
                key={idx}
                className={`relative text-center transition-all duration-1000 ${
                  isVisible['section-howto'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
                style={{ transitionDelay: `${idx * 200}ms` }}
              >
                <div className="relative mb-6">
                  <div className="w-24 h-24 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-500/30">
                    {step.num}
                  </div>
                  {idx < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-3/4 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-transparent"></div>
                  )}
                </div>
                <h3 className="text-2xl font-bold mb-2">{step.title}</h3>
                <p className="text-gray-400">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section id="section-demo" className="relative py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible['section-demo'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
              See It In Action
            </h2>
            <p className="text-xl text-gray-400">Experience the future of collaborative coding</p>
          </div>

          <div className={`relative transition-all duration-1000 ${isVisible['section-demo'] ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-3xl overflow-hidden shadow-2xl">
              <div className="flex items-center gap-2 px-6 py-4 bg-gray-800/50 border-b border-gray-700/50">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-4 text-sm text-gray-400 flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  3 developers coding
                </div>
              </div>
              <div className="p-8">
                <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl flex items-center justify-center border border-gray-700/50">
                  <div className="text-center">
                    <Code2 className="w-20 h-20 mx-auto mb-4 text-indigo-400 animate-pulse" />
                    <p className="text-gray-400 text-lg">Interactive Editor Demo</p>
                    <p className="text-gray-500 text-sm mt-2">Live collaboration interface</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-gray-800 py-12 px-4 sm:px-6 lg:px-8 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Code2 className="w-8 h-8 text-indigo-400" />
                <span className="text-2xl font-bold">CodeSync</span>
              </div>
              <p className="text-gray-400 mb-4">
                The collaborative code editor built for modern development teams.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><FileText className="w-4 h-4" /> Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><Github className="w-4 h-4" /> GitHub</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center gap-2"><Shield className="w-4 h-4" /> Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 CodeSync. Built with ❤️ by <span className="text-indigo-400 font-semibold">Your Name</span>
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-gray-400 hover:text-indigo-400 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;