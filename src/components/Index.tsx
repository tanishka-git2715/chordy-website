import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Linkedin, Instagram, Mail, Twitter } from "lucide-react";
import heroLogo from "@/assets/hero-logo.png";


type Category = {
    id: string;
    label: string;
};

const SocialLinks = () => (
    <div className="flex flex-col items-center gap-3 mt-8 pt-6 border-t border-gray-100">
        <div className="flex justify-center gap-6">
            <a
                href="https://www.linkedin.com/company/chordy-ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#0077b5] hover:opacity-80 transition-opacity transform hover:scale-110"
            >
                <Linkedin className="w-5 h-5" />
            </a>
            <a
                href="https://www.instagram.com/chordy.ai/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E4405F] hover:opacity-80 transition-opacity transform hover:scale-110"
            >
                <Instagram className="w-5 h-5" />
            </a>
            <a
                href="https://x.com/chordyai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black hover:opacity-80 transition-opacity transform hover:scale-110"
            >
                <Twitter className="w-5 h-5" />
            </a>
        </div>
        <a
            href="mailto:team@chordy.ai"
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-emerald-600 transition-colors"
        >
            <Mail className="w-4 h-4" />
            <span>team@chordy.ai</span>
        </a>
    </div>
);

const categories: Category[] = [
    { id: "founder", label: "I'm a Startup Founder" },
    { id: "investor", label: "I'm an Investor / Angel" },
    { id: "professional", label: "I'm a Professional / Freelancer" },
    { id: "student", label: "I'm a Student / Early Talent" },
    { id: "host", label: "I'm an Event / Community Host" },
];

const Index = () => {
    const [step, setStep] = useState<1 | 2 | 3>(1);
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        companyRole: "",
    });

    const handleCategorySelect = (category: Category) => {
        setSelectedCategory(category);
        setStep(2);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setStep(3);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-white via-emerald-50/30 to-white flex flex-col">
            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-4 py-8">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-md"
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-300">
                                {/* Logo and Title Row */}
                                <div className="flex flex-row items-center justify-center gap-4 mb-3">
                                    <motion.img
                                        src={heroLogo}
                                        alt="Chordy.ai"
                                        className="w-16 h-16 object-contain"
                                        animate={{
                                            y: [-5, 5, -5],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut",
                                        }}
                                    />
                                    <h1 className="text-4xl font-display font-bold text-gray-900 tracking-tight">
                                        Chordy
                                    </h1>
                                </div>

                                {/* Header Message */}
                                <div className="text-center mb-8">
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                    >
                                        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 mb-2">
                                            Hi, I'm your AI superconnector
                                        </h2>
                                        <p className="text-gray-600 text-sm leading-relaxed mb-4">
                                            Connecting you with right people at right time
                                        </p>
                                    </motion.div>
                                    <p className="text-gray-800 text-base font-medium">
                                        How would you describe yourself?
                                    </p>
                                </div>

                                {/* Category Buttons */}
                                <div className="space-y-3">
                                    {categories.map((category) => (
                                        <button
                                            key={category.id}
                                            onClick={() => handleCategorySelect(category)}
                                            className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 hover:-translate-y-0.5"
                                        >
                                            {category.label}
                                        </button>
                                    ))}
                                </div>
                                <SocialLinks />
                            </div>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-md"
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-300">
                                {/* Logo */}
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={heroLogo}
                                        alt="Chordy.ai"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Header */}
                                <div className="text-center mb-6">
                                    <h1 className="text-xl font-display font-semibold text-gray-900 mb-2 tracking-tight">
                                        Great! Let's get you on the waitlist.
                                    </h1>
                                    <p className="text-gray-600 text-sm">
                                        Category selected:{" "}
                                        <span className="text-emerald-600 font-medium">
                                            {selectedCategory?.label}
                                        </span>
                                    </p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Name <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) =>
                                                setFormData({ ...formData, name: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-900"
                                            placeholder="Your name"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Email <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) =>
                                                setFormData({ ...formData, email: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-900"
                                            placeholder="you@gmail.com"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Category
                                        </label>
                                        <input
                                            type="text"
                                            readOnly
                                            value={selectedCategory?.label || ""}
                                            className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 text-gray-600 cursor-not-allowed"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                                            Company / Role{" "}
                                            <span className="text-gray-400 font-normal">(optional)</span>
                                        </label>
                                        <input
                                            type="text"
                                            value={formData.companyRole}
                                            onChange={(e) =>
                                                setFormData({ ...formData, companyRole: e.target.value })
                                            }
                                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 outline-none transition-all text-gray-900"
                                            placeholder="Your company or role"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        className="w-full py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-2xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 mt-2"
                                    >
                                        Join the Waitlist
                                    </button>
                                </form>

                                {/* Back Button */}
                                <button
                                    onClick={() => setStep(1)}
                                    className="w-full mt-4 text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                    ← Go back
                                </button>
                                <SocialLinks />
                            </div>
                        </motion.div>
                    )}

                    {step === 3 && (
                        <motion.div
                            key="step3"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.4 }}
                            className="w-full max-w-md"
                        >
                            <div className="bg-white rounded-3xl shadow-xl p-8 border-2 border-gray-300 text-center">
                                {/* Logo */}
                                <div className="flex justify-center mb-6">
                                    <img
                                        src={heroLogo}
                                        alt="Chordy.ai"
                                        className="w-16 h-16 object-contain"
                                    />
                                </div>

                                {/* Success Icon */}
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <svg
                                        className="w-8 h-8 text-emerald-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                </div>

                                <h1 className="text-2xl font-display font-semibold text-gray-900 mb-3 tracking-tight">
                                    You're on the list!
                                </h1>
                                <p className="text-gray-600">
                                    Welcome to Chordy.ai — we'll be in touch soon.
                                </p>
                                <SocialLinks />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


        </div>
    );
};

export default Index;
