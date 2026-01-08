import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });

    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.name && formData.email && formData.message) {
            setSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
        }
    };

    return (
        <div className="mt-16 flex flex-col items-center px-4">
            {/* Header Section */}
            <div className="flex flex-col items-center text-center">
                <p className="text-2xl font-medium uppercase">Contact Us</p>
                <div className="w-16 h-0.5 bg-primary rounded-full mt-1"></div>
                <p className="text-gray-600 mt-3 max-w-md">
                    Have any questions, feedback, or issues? Feel free to reach out to us using the form below.
                </p>
            </div>

            {/* Contact Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-md mt-8 bg-white shadow-md rounded-2xl p-6 flex flex-col gap-4"
            >
                <div>
                    <label className="block text-sm font-semibold mb-1">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-semibold mb-1">Message</label>
                    <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Write your message..."
                        rows="4"
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-primary text-white py-2 rounded-lg font-semibold hover:bg-primary/90 transition-all duration-200"
                >
                    Send Message
                </button>

                {submitted && (
                    <p className="text-green-600 font-medium text-center mt-2">
                        ✅ Your message has been sent successfully!
                    </p>
                )}
            </form>
        </div>
    );
};

export default Contact;
