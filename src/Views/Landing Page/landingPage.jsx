
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
                <div className="absolute inset-0 bg-gradient-to-r from-[#292B35]/95 via-[#292B35]/80 to-transparent z-10" />
                <img 
                    src="https://images.unsplash.com/photo-1558742569-fe6d39d05837?auto=format&fit=crop&w=1920&q=80"
                    alt="Gaming Setup"
                    className="absolute inset-0 w-full h-full object-cover brightness-75"
                />
                
                {/* <div className="absolute top-0 right-0 h-full w-1/2 z-5 opacity-30 pointer-events-none">
                    <img 
                        src="https://images.unsplash.com/photo-1599587837611-678d49425e81?auto=format&fit=crop&w=800&q=80" 
                        alt="Pro Gamer" 
                        className="h-full object-contain object-right" 
                    />
                </div> */}
                
                <div className="relative z-20 container mx-auto px-6 h-full flex items-center justify-between">
                    <div className="max-w-2xl" data-aos="fade-up">
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                            Welcome to <span className="text-[#EE8631] animate-pulse">ELOSphere</span>
                        </h1>
                        <p className="text-xl text-[#95C5C5] mb-8">
                            The ultimate platform where esports excellence meets opportunity. Join the next generation of competitive gaming.
                        </p>
                        <p className="text-lg text-[#95C5C5]/80 mb-8">
                            Organize and participate in tournaments, connect with fellow gamers, track your progress, and take your gaming career to new heights. Whether you're a casual player or aspiring pro, ELOSphere is your gateway to competitive gaming excellence.
                        </p>
                        <div className="flex gap-4 flex-wrap">

                            <button className="group px-8 py-4 bg-[#EE8631] text-white rounded-lg text-lg font-bold hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                                Start Your Journey
                                <span className="ml-2 group-hover:translate-x-2 inline-block transition-transform">→</span>
                            </button>
                        </div>
                    </div>

                    {/* <div className="hidden lg:block w-1/3" data-aos="fade-left">
                        <div className="relative rounded-lg overflow-hidden shadow-2xl">
                            <img 
                                src="https://images.unsplash.com/photo-1560419015-7c427e8ae5ba?auto=format&fit=crop&w=800&q=80" 
                                alt="Gaming Setup" 
                                className="w-full rounded-lg"
                            />
                            <div className="absolute inset-0 bg-gradient-to-r from-[#292B35]/20 to-transparent"></div>
                        </div>
                    </div> */}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#292B35] to-transparent" />
            </div>

            {/* Game Categories Section */}
            {/* <section className="py-10 bg-[#292B35]">
                <div className="container mx-auto px-6">
                    <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                        {games.map((game, index) => (
                            <div key={index} data-aos="fade-up" data-aos-delay={index * 100} className="text-center group">
                                <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-[#1D1E24] overflow-hidden group-hover:bg-[#EE8631] transition-colors duration-300">
                                    <img 
                                        src={game.icon} 
                                        alt={game.name} 
                                        className="w-full h-full object-cover transform scale-110" 
                                    />
                                </div>
                                <p className="text-[#95C5C5] group-hover:text-[#EE8631] transition-colors">{game.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

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


            {/* Future of Competitive Play Section */}
            <section className="py-16 bg-[#292B35]">
                <div className="container mx-auto px-6">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-[#95C5C5]" data-aos="fade-up">
                            The Future of Competitive Play
                        </h2>
                        <p className="text-[#95C5C5]/80 mt-4" data-aos="fade-up" data-aos-delay="100">
                            Where Real Competition Begins
                        </p>
                       
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: "📰",
                                title: "Esports News & Updates",
                                description: "Get the latest esports news and tournament updates",
                                image: "https://images.unsplash.com/photo-1603481546579-65d935ba9cdd?auto=format&fit=crop&w=800&q=80"
                            },
                            {
                                icon: "🏆",
                                title: "Community-Powered Events",
                                description: "Create custom tournaments with entry rules, prizes, and skill brackets that actually make sense.",
                                image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80"
                            },
                            {
                                icon: "🚀",
                                title: "Path-to-Pro Circuits",
                                description: "Structured leagues where consistent performance gets you noticed by scouts and orgs.",
                                image: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&w=800&q=80"
                            }
                        ].map((feature, index) => (
                            <div 
                                key={index}
                                data-aos="fade-up"
                                data-aos-delay={index * 100}
                                className="bg-[#1D1E24] rounded-xl overflow-hidden hover:transform hover:scale-105 transition-all border border-[#95C5C5]/10"
                            >
                                <div className="p-6">
                                    <div className="text-4xl mb-4">{feature.icon}</div>
                                    <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                                    <p className="text-[#E0E0E0] text-sm mb-6">{feature.description}</p>
                                    <img 
                                        src={feature.image} 
                                        alt={feature.title}
                                        className="w-full h-48 object-cover rounded-lg opacity-75"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="text-center mt-12" data-aos="fade-up">
                        <button className="px-8 py-4 bg-[#EE8631] text-white rounded-lg text-lg font-bold hover:bg-[#AD662F] transform hover:scale-105 transition-all">
                            Join 
                        </button>
                        
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

                        <div data-aos="fade-right" className="max-w-xl mx-auto">
                            <img 
                                src=""
                                alt="Platform Preview" 
                                className="rounded-xl shadow-2xl hover:transform hover:scale-105 transition-all w-full max-w-md mx-auto" 
                            />

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

                        Join and take your gaming journey to the next level with ELOSphere.
                    </p>
                    <div className="flex flex-col md:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-[#EE8631] rounded-lg text-lg font-bold hover:bg-[#292B35] hover:text-white transition-all transform hover:scale-105 shadow-lg">
                            Create Account
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
                           
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold mb-6 text-[#EE8631]">Quick Links</h3>
                            <ul className="space-y-3">
                                <li>
                                    <a href="#" className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors">
                                        Home
                                    </a>
                                </li>
                                <li>
                                    <a href="mailto:elosphere.4@gmail.com" className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a href="#faq" className="text-[#E0E0E0] hover:text-[#EE8631] transition-colors">
                                        FAQ
                                    </a>
                                </li>
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

        description: "One platform for all your competitive gaming needs - tournaments, mentorship, and competitive growth."

    },
    {
        icon: "📈",
        title: "Skill Development",

        description: "Structured progression system with mentorship from verified mentors."

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



const faqs = [
    {
        question: "How do I join tournaments?",
        answer: "Joining tournaments is easy! Create an account, browse available tournaments, and register for any of them. You can participate as an individual or form/join a team depending on the tournament requirements."
    },
    {
        question: "Is ELOSphere free to use?",
        answer: "Yes! ELOSphere is completely free."
    },
    {
        question: "What games are supported?",
        answer: "We support major esports titles including League of Legends, Valorant, CS:GO, Dota 2, Fortnite, Apex Legends, Rocket League, and more."
    },
    {
        question: "Can I organize my own tournaments?",
        answer: "Absolutely! ELOSphere provides tournament creation tools for communities of all sizes. You can customize formats, set prize pools, invite participants, and manage the entire event."
    },
    {
        question: "How can I get mentorship or improve my skills?",
        answer: "ELOSphere offers mentors where you can connect with verified mentors for your game of choice."
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