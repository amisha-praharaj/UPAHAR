import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
import { IoIosArrowRoundForward } from 'react-icons/io';

const HeroSection = () => {
    return (
        <div className='relative '>
            {/* Carousel */}
            <div className='relative md:block object-cover w-full'>
                <Carousel
                    autoPlay
                    interval={2000}
                    showThumbs={false}
                    showArrows={true}
                    infiniteLoop={true}
                >
                    <div>
                        <img
                            className="filled h-[400px] md:h-[500px] w-full object-cover"
                            src="/images/top-view-bouquet-flowers-with-gift-box-copy-space_23-2149024600.jpg"
                            alt="1"
                        />
                    </div>
                    <div>
                        <img
                            className="filled h-[400px] md:h-[500px] w-full object-cover"
                            src="/images/istockphoto-1472849611-612x612.jpg"
                            alt="2"
                        />
                    </div>
                    <div>
                        <img
                            className="filled h-[400px] md:h-[500px] w-full object-cover"
                            src="/images/chocolate-gift-basket-assorted-treats-banner-copy-space-close-up-chocolate-gift-basket-filled-assorted-334455883.webp"
                            alt="3"
                        />
                    </div>
                    <div>
                        <img
                            className="filled h-[400px] md:h-[500px] w-full object-cover"
                            src="/images/concept-mother-s-day-holiday-greeting-gift-design-with-carnation-bouquet-bright-blue-table-background_315337-3550.jpg"
                            alt="4"
                        />
                    </div>
                    <div>
                        <img
                            className="filled h-[400px] md:h-[500px] w-full object-cover"
                            src="/images/cute-plush-toy-studio.jpg"
                            alt="5"
                        />
                    </div>
                </Carousel>
            </div>

            {/* Hero Content Overlay */}
            <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>

                <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
                    Wrap your feelings. Unwrap a smile
                </h1>

                <div className='flex items-center mt-6 font-medium'>
                    <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary-dull hover:bg-primary transition rounded text-black cursor-pointer'>
                        Shop now
                        <IoIosArrowRoundForward className='md:hidden text-white transition group-focus:translate-x-1' />
                    </Link>

                    <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3 cursor-pointer'>
                        Explore deals
                        <IoIosArrowRoundForward className='transition group-hover:translate-x-1' />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;


// import React from 'react'
// import { Link } from 'react-router-dom'
// import { IoIosArrowRoundForward } from "react-icons/io";

// const MainBanner = () => {
//     return (
//         <div className='relative'>
//             <img src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" alt="banner"
//                 className='w-full h-109.5 hidden md:block' />
//             <img src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" alt="banner"
//                 className='w-full md:hidden' />

//             <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end
//              md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>

//                 <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left
//                 max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
//                     Wrap your fellings.Unwrap a smile</h1>



//                 <div className='flex items-center mt-6 font-medium'>
//                     <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary-dull
//                  hover:bg-primary transition rounded text-black cursor-pointer'>
//                         Shop now
//                         <IoIosArrowRoundForward className='md:hidden text-white transition group-focus:translate-x-1 ' />
//                     </Link>

//                     <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3
//              cursor-pointer'>
//                         Explore deals
//                         <IoIosArrowRoundForward className='transition group-hover:translate-x-1' />
//                     </Link>


//                 </div>
//             </div>
//         </div>
//     )
// }

// export default MainBanner




// import React from 'react'
// import { Link } from 'react-router-dom'
// import { IoIosArrowRoundForward } from "react-icons/io";

// const MainBanner = () => {
//     return (
//         <div className='relative'>
//             <img src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" alt="banner"
//              className='w-full h-109.5 hidden md:block' />
//              <img src="/images/top-view-bouquet-flowers-with-gift-box-copy-space (1).jpg" alt="banner"
//              className='w-full md:hidden' />

//              <div className='absolute inset-0 flex flex-col items-center md:items-start justify-end
//              md:justify-center pb-24 md:pb-0 px-4 md:pl-18 lg:pl-24'>

//                 <h1 className='text-2xl md:text-4xl lg:text-5xl font-bold text-center md:text-left
//                 max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15'>
//                     Wrap your fellings.Unwrap a smile</h1>
            


//              <div className='flex items-center mt-6 font-medium'>
//                 <Link to={"/products"} className='group flex items-center gap-2 px-7 md:px-9 py-3 bg-primary-dull
//                  hover:bg-primary transition rounded text-black cursor-pointer'>
//                 Shop now
//                 <IoIosArrowRoundForward  className='md:hidden text-white transition group-focus:translate-x-1 '/>
//                 </Link>

//              <Link to={"/products"} className='group hidden md:flex items-center gap-2 px-9 py-3
//              cursor-pointer'>
//                 Explore deals
//                 <IoIosArrowRoundForward  className='transition group-hover:translate-x-1'/>
//                 </Link>


//              </div>
//              </div>
//         </div>
//     )
// }

// export default MainBanner