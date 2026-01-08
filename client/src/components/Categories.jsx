import React from "react";
import { useAppContext } from "../context/AppContext";

const Allcategories = [
    {
        text: "Flowers",
        path: "flowers",
        image:
            "https://assets.intleflorist.com/site/0081A/PIM_Images/Regular/BBDLU1-1.png",
        bgcolor: "#FFAAAA",
    },
    {
        text: "Cakes",
        path: "cakes",
        image:
            "https://thebrowniestudio.com/cdn/shop/files/GiftHamper2.jpg?v=1689936622",
        bgcolor: "#71C0BB",
    },
    {
        text: "Chocolates",
        path: "chocolates",
        image:
            "https://hattys.co.uk/wp-content/uploads/2024/06/Chocolate-Gift-Bag.jpg",
        bgcolor: "#D29F80",
    },
    {
        text: "Personalized Gifts",
        path: "gifts",
        image: "https://zocivoci.com/wp-content/uploads/2025/01/r4-500x500.webp",
        bgcolor: "#FFC785",
    },
    {
        text: "Greeting Cards",
        path: "cards",
        image:
            "https://i.etsystatic.com/5494423/r/il/827388/1740225175/il_fullxfull.1740225175_7zhz.jpg",
        bgcolor: "#E69DB8",
    },
    {
        text: "Gift Hampers",
        path: "hampers",
        image: "https://thegifttree.in/wp-content/uploads/2022/08/TGT450-.webp",
        bgcolor: "#F8B55F",
    },
    {
        text: "Plants",
        path: "plants",
        image:
            "https://nurserylive.com/cdn/shop/products/nurserylive-gifts-symbol-of-endless-love-red-anthurium-gift-plant-16968608022668_512x512.jpg?v=1634229596",
        bgcolor: "#DDEB9D",
    },
    {
        text: "Soft Toys",
        path: "softoy",
        image:
            "https://i.etsystatic.com/22203425/r/il/bd579c/3579392552/il_fullxfull.3579392552_8lai.jpg",
        bgcolor: "#A9B5DF",
    },
];

const Categories = () => {
    const { navigate } = useAppContext();

    return (
        <div className="mt-16 px-4 sm:px-6 md:px-10 lg:px-16">
            {/* Section Heading */}
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center mb-6">
                Categories
            </h2>

            {/* Responsive Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-4 gap-4 sm:gap-6">
                {Allcategories.map((item, index) => (
                    <div
                        key={index}
                        onClick={() => {
                            navigate(`/products/${item.path.toLowerCase()}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                        }}
                        className="group cursor-pointer flex flex-col justify-center items-center text-center rounded-xl p-4 sm:p-5 transition-all duration-300 shadow hover:shadow-lg"
                        style={{ backgroundColor: item.bgcolor }}
                    >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 flex items-center justify-center overflow-hidden">
                            <img
                                src={item.image}
                                alt={item.text}
                                className="w-full h-full object-contain transform transition-transform duration-300 group-hover:scale-110"
                            />
                        </div>
                        <p className="mt-3 text-sm sm:text-base font-medium text-gray-800">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Categories;

