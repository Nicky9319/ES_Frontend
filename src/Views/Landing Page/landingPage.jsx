import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';


function LandingPage() {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });
    }, []);

    return (
        <div className="min-h-screen bg-[#292B35] overflow-hidden">
            {/* Navbar with Glassmorphism */}
            <nav className="fixed w-full z-50 bg-[#292B35]/70 backdrop-blur-lg border-b border-[#95C5C5]/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4" data-aos="fade-right">
                            <img src="/assets/logo.png" alt="Logo" className="h-12 hover:scale-110 transition-transform" />
                            <span className="text-[#95C5C5] text-2xl font-bold">ESports Hub</span>
                        </div>
                        <div className="flex items-center space-x-8">
                            <a href="#problems" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Problems</a>
                            <a href="#solution" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Solution</a>
                            <a href="#audience" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Audience</a>
                            <button className="px-6 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                                Get Started
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Hero Section with Parallax */}
            <div className="relative h-screen">
                <div className="absolute inset-0 bg-gradient-to-r from-[#292B35]/90 to-transparent z-10" />
                <video 
                    className="absolute inset-0 w-full h-full object-cover"
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                >
                    <source src="/assets/hero-background.mp4" type="video/mp4" />
                </video>
                
                <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-3xl" data-aos="fade-up">
                        <h1 className="text-7xl font-bold text-white mb-6 leading-tight">
                            Revolutionizing <span className="text-[#EE8631] animate-pulse">Esports</span> For Everyone
                        </h1>
                        <p className="text-xl text-[#95C5C5] mb-8">
                            Join the next generation of competitive gaming. Where passion meets opportunity.
                        </p>
                        <div className="flex gap-4">
                            <button className="group px-8 py-4 bg-[#EE8631] text-white rounded-lg text-lg font-bold hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                                Start Your Journey
                                <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Problems Section */}
            <section id="problems" className="py-20 bg-[#1D1E24]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-[#95C5C5] text-center mb-16" data-aos="fade-up">
                        Problems We're Solving
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {problems.map((problem, index) => (
                            <div 
                                key={index}
                                data-aos="zoom-in"
                                data-aos-delay={index * 100}
                                className="bg-[#292B35] p-8 rounded-xl hover:transform hover:scale-105 transition-all hover:shadow-[0_0_30px_rgba(238,134,49,0.3)] border border-[#95C5C5]/10"
                            >
                                <div className="text-4xl mb-4">{problem.icon}</div>
                                <h3 className="text-2xl font-bold text-[#EE8631] mb-3">{problem.title}</h3>
                                <p className="text-[#E0E0E0]">{problem.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Solution Section with Floating Elements */}
            <section id="solution" className="relative py-20 bg-[#292B35] overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-float"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 5}s`,
                                width: `${Math.random() * 20 + 10}px`,
                                height: `${Math.random() * 20 + 10}px`,
                                background: `rgba(149, 197, 197, ${Math.random() * 0.1})`,
                                borderRadius: '50%'
                            }}
                        />
                    ))}
                </div>

                <div className="container mx-auto px-6 relative">
                    <h2 className="text-4xl font-bold text-[#95C5C5] text-center mb-16" data-aos="fade-up">
                        Our Solution
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div data-aos="fade-right">
                            <img src="/assets/solution-mockup.png" alt="Platform Preview" className="rounded-xl shadow-2xl hover:transform hover:scale-105 transition-all" />
                        </div>
                        <div data-aos="fade-left" className="space-y-6">
                            {solutions.map((item, index) => (
                                <div key={index} className="flex items-start space-x-4">
                                    <div className="flex-shrink-0 w-12 h-12 bg-[#EE8631] rounded-lg flex items-center justify-center text-white text-2xl">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-[#95C5C5] mb-2">{item.title}</h3>
                                        <p className="text-[#E0E0E0]">{item.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Target Audience Section */}
            <section id="audience" className="py-20 bg-[#1D1E24]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-[#95C5C5] text-center mb-16" data-aos="fade-up">
                        Who It's For
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {audience.map((group, index) => (
                            <div
                                key={index}
                                data-aos="flip-left"
                                data-aos-delay={index * 100}
                                className="bg-[#292B35] p-8 rounded-xl text-center group hover:bg-[#EE8631] transition-all duration-500"
                            >
                                <div className="text-5xl mb-6 transform group-hover:scale-110 transition-transform">
                                    {group.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-[#95C5C5] group-hover:text-white mb-4">
                                    {group.title}
                                </h3>
                                <p className="text-[#E0E0E0] group-hover:text-white/90">
                                    {group.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-[#EE8631]">
                <div className="container mx-auto px-6 text-center" data-aos="zoom-in">
                    <h2 className="text-4xl font-bold text-white mb-6">Ready to Level Up?</h2>
                    <p className="text-white/90 mb-8 max-w-2xl mx-auto">
                        Join thousands of gamers who have already taken their gaming journey to the next level.
                    </p>
                    <button className="px-8 py-4 bg-white text-[#EE8631] rounded-lg text-lg font-bold hover:bg-[#292B35] hover:text-white transition-all transform hover:scale-105 shadow-lg">
                        Join Now - It's Free
                    </button>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#292B35] text-[#95C5C5] py-12">
                <div className="container mx-auto px-6">
                    {/* Add your footer content here */}
                </div>
            </footer>
        </div>
    );
}

// Data arrays for the sections
const problems = [
    {
        icon: "🎮",
        title: "Fragmented Community",
        description: "Gamers struggle to find reliable platforms and communities for competitive play."
    },
    {
        icon: "🏆",
        title: "Limited Opportunities",
        description: "Lack of accessible tournaments and competitive events for all skill levels."
    },
    {
        icon: "💰",
        title: "Career Development",
        description: "Difficulty in transitioning from casual to professional gaming."
    }
];

const solutions = [
    {
        icon: "🌟",
        title: "Unified Platform",
        description: "One platform for all your competitive gaming needs - tournaments, practice, and community."
    },
    {
        icon: "📈",
        title: "Skill Development",
        description: "Structured progression system with personalized coaching and analytics."
    },
    {
        icon: "🤝",
        title: "Community Growth",
        description: "Connect with players, form teams, and build your gaming network."
    }
];

const audience = [
    {
        icon: "🎯",
        title: "Aspiring Pros",
        description: "Players looking to take their gaming to the professional level."
    },
    {
        icon: "👥",
        title: "Casual Competitors",
        description: "Gamers seeking structured competitive experiences."
    },
    {
        icon: "🌱",
        title: "Gaming Communities",
        description: "Established communities looking to grow and organize events."
    }
];

export default LandingPage;