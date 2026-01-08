const Footer = () => {
    const linkSections = [
        {
            title: "Quick Links",
            links: [
                { text: "Home", url: "#" },
                { text: "Best Sellers", url: "#" },
                { text: "Offers & Deals", url: "#" },
                { text: "Contact Us", url: "#" },
                { text: "FAQs", url: "#" }
            ]
        },
        {
            title: "Need Help?",
            links: [
                { text: "Delivery Information", url: "#" },
                { text: "Return & Refund Policy", url: "#" },
                { text: "Payment Methods", url: "#" },
                { text: "Track your Order", url: "#" },
                { text: "Contact Us", url: "#" }
            ]
        },
        {
            title: "Follow Us",
            links: [
                { text: "Instagram", url: "#" },
                { text: "Twitter", url: "#" },
                { text: "Facebook", url: "#" },
                { text: "YouTube", url: "#" }

            ]
        }
    ];

    return (
        <div className="w-full px-4 md:px-6 lg:px-4 xl:px-32 mt-24 bg-[#e8c2ca]">
            <div className="flex flex-col md:flex-row items-start justify-between gap-10 py-10 border-b border-gray-500/30 text-gray-500">
                <div>
                    <img className="w-34 md:w-32" src="\public\images\logo.png" alt="" />
                    <p className="max-w-[410px] text-black mt-6">
                        We are your one-stop destination for thoughtful gifts, beautiful flowers, delicious cakes, and personalized surprises. Whether it’s a birthday, anniversary, festival, or “just because,” we help you make every moment special — delivered with love, care, and on time.
                    </p>
                </div>
                <div className="flex flex-wrap text-black-500/500 items-start justify-between w-full md:w-[45%] gap-5">
                    {linkSections.map((section, index) => (
                        <div key={index}>
                            <h3 className="font-semibold text-base text-black md:mb-5 mb-2">{section.title}</h3>
                            <ul className="text-sm space-y-1">
                                {section.links.map((link, i) => (
                                    <li key={i}>
                                        <a href={link.url} className="hover:underline transition">{link.text}</a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
            <p className="py-4 text-center text-black text-sm md:text-base">
                Copyright {new Date().getFullYear()} © Upahar All Right Reserved.
            </p>
        </div>
    );
};

export default Footer;