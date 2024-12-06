import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const About = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (

        <>
            <nav className="bg-[#212121] w-full text-[#F7F7F7]">
                {/* Navbar Container */}
                <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4">
                    {/* Logo Section */}
                    <div className="flex items-center space-x-4">
                        <NavLink to='/home'>
                            <img
                                className="w-24 rounded-lg"
                                src="../megaLogo.jpg"
                                alt="Logo"
                            />
                        </NavLink>
                    </div>

                    {/* Hamburger Icon for Small Screens */}
                    <button
                        onClick={toggleMenu}
                        className="inline-flex items-center p-2 text-[#F7F7F7] rounded-lg md:hidden hover:bg-[#7E57C2] focus:outline-none focus:ring-2 focus:ring-[#7E57C2]"
                    >
                        <span className="sr-only">Open Menu</span>
                        <i className="bi bi-list text-2xl"></i>
                    </button>

                    {/* Navbar Links (Hidden on Small Screens) */}
                    <div className="hidden md:flex items-center space-x-8">
                        <NavLink
                            to="/dashboard/home"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                        >
                            <i className="bi bi-house-fill text-xl"></i>
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/analytics"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                        >
                            <i className="bi bi-bar-chart-line-fill text-xl"></i>
                            <span>Analytics</span>
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                        >
                            <i className="bi bi-person-fill text-xl"></i>
                            <span>About</span>
                        </NavLink>
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
                            <i className="bi bi-box-arrow-left text-xl"></i>
                            <span>Log Out</span>
                        </div>
                    </div>
                </div>

                {/* Mobile Menu (Shown When Hamburger Icon is Clicked) */}
                {isMenuOpen && (
                    <div className="flex flex-col md:hidden space-y-2 p-4">
                        <NavLink
                            to="/dashboard/home"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)} // Close menu on link click
                        >
                            <i className="bi bi-house-fill text-xl"></i>
                            <span>Dashboard</span>
                        </NavLink>
                        <NavLink
                            to="/dashboard/analytics"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)} // Close menu on link click
                        >
                            <i className="bi bi-bar-chart-line-fill text-xl"></i>
                            <span>Analytics</span>
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) =>
                                `flex items-center space-x-2 px-3 py-2 rounded-md ${isActive ? 'bg-[#7E57C2]' : ''}`
                            }
                            onClick={() => setIsMenuOpen(false)} // Close menu on link click
                        >
                            <i className="bi bi-person-fill text-xl"></i>
                            <span>About</span>
                        </NavLink>
                        <div className="flex items-center space-x-2 px-3 py-2 rounded-md">
                            <i className="bi bi-box-arrow-left text-xl"></i>
                            <span>Log Out</span>
                        </div>
                    </div>
                )}
            </nav>




            <div className="bg-[#212121] text-white min-h-screen p-6 sm:p-10 lg:p-16 space-y-16">
                {/* Hero Section */}
                <section className="text-center space-y-4">
                    <h1 className="text-4xl sm:text-5xl font-bold animate-fade-in">
                        About Us
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto animate-fade-in-delayed">
                        Bridging Social Media Engagement with Seamless E-Commerce Solutions
                    </p>
                </section>

                {/* Vision Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#7E57C2]">
                        Our Vision
                    </h2>
                    <p className="text-gray-300 max-w-4xl mx-auto text-center">
                        Empowering influencers, sellers, and users to transform social media
                        content into actionable e-commerce listings. We streamline the selling
                        process and seamlessly bridge engagement with conversion.
                    </p>
                </section>

                {/* Benefits Section */}
                <section className="space-y-8">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#7E57C2]">
                        Why Choose Our Solution?
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Expanded Reach & Engagement",
                                description:
                                    "Transform social media posts into product listings to tap into a wider, more engaged audience.",
                                icon: "🌐",
                            },
                            {
                                title: "Streamlined Product Listings",
                                description:
                                    "AI-powered automation minimizes manual input, making listing creation faster and more efficient.",
                                icon: "⚙️",
                            },
                            {
                                title: "Improved Conversion Rates",
                                description:
                                    "Reduce friction and simplify buying, converting followers into customers effortlessly.",
                                icon: "📈",
                            },
                            {
                                title: "Automated Compliance",
                                description:
                                    "Built-in checks ensure adherence to guidelines, avoiding legal issues and rejected listings.",
                                icon: "✅",
                            },
                            {
                                title: "Personalized Listings",
                                description:
                                    "AI customizes product details to audience preferences, enhancing relevance and discoverability.",
                                icon: "✨",
                            },
                            {
                                title: "Analytics & Insights",
                                description:
                                    "Gain valuable customer insights through real-time analytics to optimize offerings.",
                                icon: "📊",
                            },
                        ].map((benefit, index) => (
                            <div
                                key={index}
                                className="bg-[#363637] p-6 rounded-xl shadow-lg text-center hover:scale-105 transition-transform space-y-4"
                            >
                                <div className="text-4xl">{benefit.icon}</div>
                                <h3 className="text-xl font-semibold">{benefit.title}</h3>
                                <p className="text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Our Approach */}
                <section className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#7E57C2]">
                        Our Approach
                    </h2>
                    <p className="text-gray-300 max-w-4xl mx-auto text-center">
                        Using advanced GenAI technology, we transform social media posts into
                        structured product listings with ease. Our solution ensures compliance,
                        personalization, and efficiency at every step.
                    </p>
                </section>

                {/* Innovation Section */}
                <section className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#7E57C2]">
                        Innovations That Drive Us
                    </h2>
                    <div className="flex flex-wrap justify-center gap-8">
                        {[
                            {
                                title: "GenAI-Powered Data Extraction",
                                description:
                                    "Automates product detail extraction from social media content.",
                            },
                            {
                                title: "Personalized Listings",
                                description:
                                    "Tailors listings to audience interests, enhancing discoverability.",
                            },
                            {
                                title: "Social Media to E-Commerce",
                                description:
                                    "Streamlines the journey from social media engagement to product sales.",
                            },
                        ].map((innovation, index) => (
                            <div
                                key={index}
                                className="bg-[#363637] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform text-center sm:w-[30%]"
                            >
                                <h3 className="text-xl font-semibold mb-2">{innovation.title}</h3>
                                <p className="text-gray-400">{innovation.description}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* About the Team */}
                <section className="space-y-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#7E57C2]">
                        Meet the Team
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { name: "Lavesh Akhadkar", role: "AI and Backend Engineer" , icon : '../ai.png' },
                            { name: "Parth Kadam", role: "Frontend Developer", icon : '../frontend.png' },
                            { name: "Aditya Shinde", role: "UI/UX Designer" , icon : '../ui.png' },
                        ].map((member, index) => (
                            <div
                                key={index}
                                className="bg-[#363637] p-6 rounded-xl shadow-lg hover:scale-105 transition-transform text-center"
                            >
                                <img src={member.icon} className="h-20 w-20 rounded-xl mx-auto mb-4" />
                                <h3 className="text-xl font-semibold">{member.name}</h3>
                                <p className="text-gray-400">{member.role}</p>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
};

export default About;
