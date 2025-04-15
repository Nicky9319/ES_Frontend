import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function LandingPage() {
    const [activeFaq, setActiveFaq] = useState(null);
    
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true
        });

        // Add image size check
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (img.naturalWidth > 1000) {
                console.warn(`Large image detected: ${img.src}. Consider optimizing.`);
            }
        });
    }, []);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    return (
        <div className="min-h-screen bg-[#292B35] overflow-hidden">
            {/* Navbar with Glassmorphism */}
            <nav className="fixed w-full z-50 bg-[#292B35]/70 backdrop-blur-lg border-b border-[#95C5C5]/10">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-4" data-aos="fade-right">
                            <img src="/assets/logo.png" alt="Logo" className="h-12 hover:scale-110 transition-transform" />
                            <span className="text-[#95C5C5] text-2xl font-bold">ELOSphere</span>
                        </div>
                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#problems" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Problems</a>
                            <a href="#solution" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Solution</a>
                            <a href="#audience" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">Audience</a>
                            <a href="#faq" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">FAQ</a>
                            <button className="px-6 py-2 bg-[#EE8631] text-white rounded-lg hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                                Get Started
                            </button>
                        </div>
                        <div className="md:hidden">
                            {/* Mobile menu button would go here */}
                            <button className="text-[#95C5C5]">☰</button>
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
                
                <div className="absolute top-0 right-0 h-full w-1/2 z-5 opacity-40 pointer-events-none">
                    <img src="/assets/esports-overlay.png" alt="Esports Player" className="h-full object-contain object-right" />
                </div>
                
                <div className="relative z-20 container mx-auto px-6 h-full flex items-center">
                    <div className="max-w-3xl" data-aos="fade-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Welcome to <span className="text-[#EE8631] animate-pulse">ELOSphere</span>
                        </h1>
                        <p className="text-xl text-[#95C5C5] mb-8">
                            The ultimate platform where esports excellence meets opportunity. Join the next generation of competitive gaming.
                        </p>
                        <div className="flex gap-4 flex-wrap">
                            <button className="group px-8 py-4 bg-[#EE8631] text-white rounded-lg text-lg font-bold hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                                Start Your Journey
                                <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
                            </button>
                            
                        </div>
                        
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#292B35] to-transparent" />
            </div>

            {/* Game Categories Section */}
            <section className="py-10 bg-[#292B35]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {games.map((game, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#1D1E24] p-3 group-hover:bg-[#EE8631] transition-colors duration-300">
                                    <img src={game.icon} alt={game.name} className="w-full h-full object-contain" />
                                </div>
                                <p className="text-[#95C5C5] group-hover:text-[#EE8631] transition-colors">{game.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

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

            {/* Featured Tournaments Section */}
            <section className="py-16 bg-[#292B35]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center mb-12">
                        <h2 className="text-3xl font-bold text-[#95C5C5]" data-aos="fade-right">
                            Featured Tournaments
                        </h2>
                        <a href="#" className="mt-4 md:mt-0 text-[#EE8631] hover:underline flex items-center" data-aos="fade-left">
                            View all tournaments <span className="ml-2">→</span>
                        </a>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {tournaments.map((tournament, index) => (
                            <div 
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-[#1D1E24] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all border border-[#95C5C5]/10"
                            >
                                <div className="relative">
                                    <img src={tournament.image} alt={tournament.title} className="w-full h-48 object-cover" />
                                    <div className="absolute top-0 right-0 bg-[#EE8631] text-white px-3 py-1 rounded-bl-lg">
                                        {tournament.prize}
                                    </div>
                                </div>
                                <div className="p-6">
                                    <div className="flex justify-between items-center mb-3">
                                        <span className="text-[#95C5C5] text-sm">{tournament.date}</span>
                                        <span className={`px-2 py-1 rounded text-xs ${tournament.status === 'Live' ? 'bg-green-500/20 text-green-400' : 'bg-[#EE8631]/20 text-[#EE8631]'}`}>
                                            {tournament.status}
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">{tournament.title}</h3>
                                    <div className="flex justify-between items-center mt-4">
                                        <div className="flex items-center space-x-2">
                                            <div className="w-6 h-6">
                                                <img src={tournament.gameIcon} alt="Game" className="w-full h-full object-contain" />
                                            </div>
                                            <span className="text-[#E0E0E0] text-sm">{tournament.participants} participants</span>
                                        </div>
                                        <button className="px-3 py-1 bg-[#EE8631]/20 text-[#EE8631] rounded hover:bg-[#EE8631]/30 transition-colors">
                                            Join Now
                                        </button>
                                    </div>
                                </div>
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

            {/* Testimonials */
            /* <section className="py-20 bg-[#292B35]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-[#95C5C5] text-center mb-16" data-aos="fade-up">
                        What Our Users Say
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <div 
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-[#1D1E24] p-6 rounded-xl border border-[#95C5C5]/10"
                            >
                                <div className="text-[#EE8631] text-4xl mb-4">"</div>
                                <p className="text-[#E0E0E0] italic mb-6">{testimonial.quote}</p>
                                <div className="flex items-center">
                                    <img 
                                        src={testimonial.avatar} 
                                        alt={testimonial.name} 
                                        className="w-12 h-12 rounded-full mr-4 object-cover" 
                                    />
                                    <div>
                                        <h4 className="text-[#95C5C5] font-bold">{testimonial.name}</h4>
                                        <p className="text-[#E0E0E0] text-sm">{testimonial.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* FAQ Section */}
            <section id="faq" className="py-20 bg-[#1D1E24]">
                <div className="container mx-auto px-6">
                    <h2 className="text-4xl font-bold text-[#95C5C5] text-center mb-16" data-aos="fade-up">
                        Frequently Asked Questions
                    </h2>
                    <div className="max-w-3xl mx-auto">
                        {faqs.map((faq, index) => (
                            <div 
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 50}
                                className="mb-4"
                            >
                                <button 
                                    className={`w-full text-left p-4 rounded-lg flex justify-between items-center ${activeFaq === index ? 'bg-[#EE8631] text-white' : 'bg-[#292B35] text-[#95C5C5] hover:bg-[#292B35]/80'}`}
                                    onClick={() => toggleFaq(index)}
                                >
                                    <span className="font-bold">{faq.question}</span>
                                    <span className="text-xl">{activeFaq === index ? '−' : '+'}</span>
                                </button>
                                {activeFaq === index && (
                                    <div className="bg-[#292B35]/50 p-4 rounded-b-lg mt-1 text-[#E0E0E0]">
                                        {faq.answer}
                                    </div>
                                )}
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
                        Join thousands of gamers who have already taken their gaming journey to the next level with ELOSphere.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-[#EE8631] rounded-lg text-lg font-bold hover:bg-[#292B35] hover:text-white transition-all transform hover:scale-105 shadow-lg">
                            Create Free Account
                        </button>
                       
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-[#292B35] text-[#95C5C5] py-16 border-t border-[#95C5C5]/10">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
                        {/* Company Info */}
                        <div className="col-span-1 md:col-span-1">
                            <div className="flex items-center space-x-3 mb-6">
                                <img src="/assets/logo.png" alt="ELOSphere Logo" className="h-10" />
                                <span className="text-xl font-bold text-[#95C5C5]">ELOSphere</span>
                            </div>
                            <p className="text-[#E0E0E0] mb-6">
                                Revolutionizing esports for everyone. Connect, compete, and build your gaming career.
                            </p>
                            <div className="flex space-x-4">
                                {['twitter', 'discord', 'twitch', 'instagram'].map(social => (
                                    <a key={social} href="#" className="text-[#95C5C5] hover:text-[#EE8631] transition-colors">
                                        <img src={`/assets/${social}-icon.svg`} alt={social} className="h-6 w-6" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-[#EE8631]">Quick Links</h3>
                            <ul className="space-y-3">
                                {['Home', 'About Us', 'Tournaments'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-[#EE8631]">Support</h3>
                            <ul className="space-y-3">
                                {['Help Center', 'Contact Us', 'Privacy Policy', 'Terms of Service', 'FAQ'].map(link => (
                                    <li key={link}>
                                        <a href="#" className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors">
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                       
                    </div>
                    <div className="mt-12 pt-8 border-t border-[#95C5C5]/10 text-center text-[#E0E0E0]">
                        <p>© {new Date().getFullYear()} ELOSphere. All rights reserved.</p>
                    </div>
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

const games = [
    { name: "League of Legends", icon: "/assets/lol-icon.png" },
    { name: "Valorant", icon: "/assets/valorant-icon.png" },
    { name: "CS:GO", icon: "/assets/csgo-icon.png" },
    { name: "Dota 2", icon: "/assets/dota-icon.png" },
    { name: "Fortnite", icon: "/assets/fortnite-icon.png" },
    { name: "Apex Legends", icon: "/assets/apex-icon.png" }
];

const tournaments = [
    {
        title: "ELOSphere Summer Championships",
        image: "/assets/tournament-1.jpg",
        date: "Jun 15 - Jul 10, 2025",
        status: "Upcoming",
        prize: "$10,000",
        gameIcon: "/assets/lol-icon.png",
        participants: "128"
    },
    {
        title: "Pro Valorant Showdown",
        image: "/assets/tournament-2.jpg",
        date: "Apr 20 - Apr 25, 2025",
        status: "Live",
        prize: "$5,000",
        gameIcon: "/assets/valorant-icon.png",
        participants: "64"
    },
    {
        title: "Casual CS:GO Weekend",
        image: "/assets/tournament-3.jpg",
        date: "May 5 - May 7, 2025",
        status: "Upcoming",
        prize: "$2,500",
        gameIcon: "/assets/csgo-icon.png",
        participants: "32"
    }
];

const stats = [
    { value: "50K+", label: "Active Players" },
    { value: "1.2K+", label: "Tournaments" },
    { value: "$500K+", label: "Prize Money" },
    { value: "120+", label: "Pro Teams" }
];

const testimonials = [
    {
        quote: "ELOSphere changed my gaming career. I went from casual player to sponsored team member in just 6 months!",
        name: "Alex Rodriguez",
        role: "Professional Valorant Player",
        avatar: "/assets/testimonial-1.jpg"
    },
    {
        quote: "The structured tournaments and ranking system is exactly what our community needed. Finally, a platform that gets it!",
        name: "Sarah Chen",
        role: "Team Manager, Phoenix Esports",
        avatar: "/assets/testimonial-2.jpg"
    },
    {
        quote: "As a tournament organizer, ELOSphere has simplified everything. The tools are intuitive and powerful.",
        name: "Mike Johnson",
        role: "Esports Event Coordinator",
        avatar: "/assets/testimonial-3.jpg"
    }
];

const faqs = [
    {
        question: "How do I join tournaments?",
        answer: "Joining tournaments is easy! Create an account, browse available tournaments, and click 'Join Now'. You can participate as an individual or form/join a team depending on the tournament requirements."
    },
    {
        question: "Is ELOSphere free to use?",
        answer: "Yes! Basic access to ELOSphere is completely free. We offer premium subscriptions with advanced features for serious competitors and teams, but you can enjoy most features without paying anything."
    },
    {
        question: "What games are supported?",
        answer: "We currently support major esports titles including League of Legends, Valorant, CS:GO, Dota 2, Fortnite, Apex Legends, Rocket League, and more. We're constantly adding support for new games based on community feedback."
    },
    {
        question: "How does the ranking system work?",
        answer: "Our proprietary ELO-based ranking system tracks your performance across all tournaments and matches. As you play and win, your ranking improves, matching you with competitors of similar skill levels. Rankings are game-specific and refresh seasonally to keep competition fresh."
    },
    {
        question: "Can I organize my own tournaments?",
        answer: "Absolutely! ELOSphere provides tournament creation tools for communities of all sizes. You can customize formats, set prize pools, invite participants, and manage the entire event with our intuitive organizer dashboard."
    },
    {
        question: "How can I get mentorship or improve my skills?",
        answer: "ELOSphere offers mentors where you can connect with verified mentors for your game of choice. We also provide automated performance analytics, replay analysis tools, and skill development programs to help you improve."
    }
];

// Add an animation for floating elements
const styles = document.createElement('style');
styles.innerHTML = `
    @keyframes float {
        0% { transform: translateY(0px); }
        50% { transform: translateY(-10px); }
        100% { transform: translateY(0px); }
    }
    .animate-float {
        animation: float 5s ease-in-out infinite;
    }
`;
document.head.appendChild(styles);

export default LandingPage;