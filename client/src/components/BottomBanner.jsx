import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { IoLeaf } from "react-icons/io5";
import { CiRainbow } from "react-icons/ci";
import { FaHandHoldingHeart } from "react-icons/fa";
import { MdOutlineCompost } from "react-icons/md";

const features = [
  {
    icon: <CiDeliveryTruck />,
    title: "Fastest Delivery",
    description:
      "Surprise your loved ones with same-day or midnight delivery options.",
  },
  {
    icon: <IoLeaf />,
    title: "Fresh Flowers & Quality Products",
    description:
      "Only the freshest blooms and hand-picked products, guaranteed.",
  },
  {
    icon: <CiRainbow />,
    title: "Wide Variety of Products",
    description:
      "From flowers and cakes to plants and hampers — everything in one place.",
  },
  {
    icon: <FaHandHoldingHeart />,
    title: "Trusted by Thousand",
    description: "Loved by 10,000+ happy customers",
  },
  {
    icon: <MdOutlineCompost />,
    title: "Eco-Friendly Packaging",
    description: "Sustainable packaging to protect your gifts and the planet.",
  },
];

const BottomBanner = () => {
  return (
    <div className="mt-24 px-4 sm:px-6 md:px-10 lg:px-16">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-12">
        {/* Left Image */}
        <div className="flex-shrink-0 w-full md:w-1/2">
          <img
            src="/images/gift-box-packed-blue-paper-blue-valentine-s-day-holiday-gifts.jpg"
            alt="Gift Banner"
            className="hidden md:block w-full h-auto rounded-lg object-cover"
          />
          <img
            src="/images/gift-box-packed-blue-paper-blue-valentine-s-day-holiday-gifts.jpg"
            alt="Mobile Banner"
            className="block md:hidden w-full h-auto rounded-lg object-cover"
          />
        </div>

        {/* Right Text */}
        <div className="flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#FFF] mb-6">
            Why we are the{" "}
            <span className="text-2xl sm:text-3xl font-bold text-black">best</span>
          </h1>

          <div className="flex flex-col gap-4">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="text-3xl text-[#FFF]">{feature.icon}</div>
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;










// import React from 'react'
// import { CiDeliveryTruck } from "react-icons/ci";
// import { IoLeaf } from "react-icons/io5";
// import { CiRainbow } from "react-icons/ci";
// import { FaHandHoldingHeart } from "react-icons/fa";
// import { MdOutlineCompost } from "react-icons/md";




// const features = [
//   {
//     icon: <CiDeliveryTruck />,
//     title: 'Fastest Delivery',
//     description: 'Surprise your loved ones with same-day or midnight delivery options.'
//   },
//   {
//     icon: <IoLeaf />,
//     title: 'Fresh Flowers & Quality Products',
//     description: 'Only the freshest blooms and hand-picked products, guaranteed.'
//   },

//   {
//     icon: <CiRainbow />,
//     title: 'Wide Variety of Products',
//     description: 'From flowers and cakes to plants and hampers — everything in one place.'
//   },
//   {
//     icon: <FaHandHoldingHeart />,
//     title: 'Trusted by Thousand',
//     description: 'Loved by 10,000+ happy customers'
//   },
//   {
//     icon: <MdOutlineCompost />,
//     title: 'Eco-Friendly Packaging',
//     description: 'Sustainable packaging to protect your gifts and the planet.'
//   }

// ]

// const BottomBanner = () => {
//   return (
//     <div className='relative mt-24'>
//       <img src="\public\images\gift-box-packed-blue-paper-blue-valentine-s-day-holiday-gifts.jpg" alt=""
//         className='w-550 h-109.5 hidden md:block' />
//       <img src="\public\images\bottom2.jpg" alt=""
//         className='w-full  md:hidden' />

//       <div className='absolute inset-0 flex flex-col items-center md:items-end md:justify-center
//          pt-16 md:pt_0 md:pr-24'>

//         <div>
//           <h1 className='text-2xl md:text-3xl font-semibold text-[#fca311] mb-6'>
//             Why we are the <span className='text-2xl md:text-3xl font-bold text-black'>best</span></h1>
//           {features.map((feature, index) => (
//             <div key={index} className='flex items-start gap-4 mt-2'>
//               <div className='text-3xl'>{feature.icon}</div>
//               <div>
//                 <h3 className='text-lg md:text-xl font-semibold'>{feature.title}</h3>
//                 <p className='text-black-500/70 text-xs md:text-sm'>{feature.description}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//       </div>
//     </div>
//   )
// }

// export default BottomBanner