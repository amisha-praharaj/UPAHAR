// import React from 'react'
// import ProductCard from './ProductCard'
// import { useAppContext } from '../context/AppContext'
 
//      {
//     "id": "gd46g23h",
//     "name": "Red Roses Bouquet",
//     "category": "Flowers",
//     "price": 599,
//     "offerPrice": 499,
//     "images": ["https://www.fnp.com/images/pr/l/v20230123180524/love-snowflake-bouquet_1.jpg"],
//     "desc": "A bouquet of fresh red roses, perfect for expressing love.",
//     "createdAt": "2025-05-01T10:00:00Z",
//     "updatedAt": "2025-05-20T14:00:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs002",
//     "name": "Chocolate Truffle Cake",
//     "category": "Cakes",
//     "price": 899,
//     "offerPrice": 799,
//     "images": ["https://i.pinimg.com/736x/e9/1c/b9/e91cb9b0e38be83872bed7661e474981.jpg"],
//     "desc": "Rich chocolate truffle cake, ideal for celebrations.",
//     "createdAt": "2025-04-15T09:30:00Z",
//     "updatedAt": "2025-05-18T16:00:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs003",
//     "name": "Ferrero Rocher Box (16pcs)",
//     "category": "Chocolates",
//     "price": 749,
//     "offerPrice": 699,
//     "images": ["https://theperfectgift.ae/cdn/shop/products/ferrero-rocher-chocolate-dubai.jpg?v=1614353979"],
//     "desc": "Premium Ferrero Rocher chocolates for gifting or self-treat.",
//     "createdAt": "2025-03-28T08:00:00Z",
//     "updatedAt": "2025-05-10T12:45:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs004",
//     "name": "Custom Name Lamp",
//     "category": "Personalized Gifts",
//     "price": 1299,
//     "offerPrice": 1199,
//     "images": ["https://joyboxfactory.com/cdn/shop/files/5_a6e7efe2-0c30-4fd1-884c-6e295f850fd1.png?v=1688919272"],
//     "desc": "LED lamp personalized with names, perfect for gifting.",
//     "createdAt": "2025-04-05T11:15:00Z",
//     "updatedAt": "2025-05-19T15:00:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs005",
//     "name": "Love You Forever Greeting Card",
//     "category": "Greeting Cards",
//     "price": 249,
//     "offerPrice": 199,
//     "images": ["https://bethoughtful.in/cdn/shop/products/4-Card-A4-a.jpg?v=1598282926"],
//     "desc": "Beautiful card to express eternal love and affection.",
//     "createdAt": "2025-03-12T07:45:00Z",
//     "updatedAt": "2025-05-15T13:00:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs006",
//     "name": "Luxury Gift Hamper",
//     "category": "Gift Hampers",
//     "price": 1699,
//     "offerPrice": 1499,
//     "images": ["https://www.fnp.com/images/pr/l/v20230715140210/relaxing-rakhi-gift-hamper-for-sister_2.jpg"],
//     "desc": "A premium hamper filled with assorted goodies.",
//     "createdAt": "2025-02-20T10:30:00Z",
//     "updatedAt": "2025-05-12T10:00:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs007",
//     "name": "Mini Indoor Plant in Ceramic Pot",
//     "category": "Plants",
//     "price": 399,
//     "offerPrice": 349,
//     "images": ["https://cdn.shopify.com/s/files/1/0536/9312/0666/files/Ceramic_or_plastic_1.png?v=1655889634"],
//     "desc": "Low-maintenance indoor plant with air-purifying benefits.",
//     "createdAt": "2025-04-01T09:00:00Z",
//     "updatedAt": "2025-05-14T14:30:00Z",
//     "inStock": true
//   },
//   {
//     "id": "bs008",
//     "name": "Teddy with Heart Soft Toy",
//     "category": "Soft Toys",
//     "price": 699,
//     "offerPrice": 599,
//     "images": ["https://i.pinimg.com/736x/7e/74/a5/7e74a5cb7861ab1a5801d76153e62b95.jpg"],
//     "desc": "Cute teddy bear holding a heart, perfect for gifting.",
//     "createdAt": "2025-03-05T12:00:00Z",
//     "updatedAt": "2025-05-17T11:00:00Z",
//     "inStock": true
//   }
// ];

// const Bestseller = () => {
//   // You have the products array, so pick some product(s) to display
//   // For demo, pass the first product from your array
// const { products } = useAppContext();
  

//   return (
//     <div className='mt-16'>
//       <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
//       <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 xl:grid-cols-6  mt-6' >
//         {products.filter((product) => product.inStock).slice(0,8).map((product, index)=>(
// <ProductCard key={index}  product={product} />
//         ))} 
            
          
        
//       </div>
//     </div>
//   );
// };

// export default Bestseller;



import React from 'react'
import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'

const Bestseller = () => {
  const { product } = useAppContext(); // ✅ Use correct key

  if (!product || !Array.isArray(product)) {
    return <p className="text-center mt-6">Loading bestsellers...</p>;
  }

  return (
    <div className='mt-16'>
      <p className='text-2xl md:text-3xl font-medium'>Best Sellers</p>
      {/* <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 xl:grid-cols-6  mt-6' > */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6'>
        {product.filter((p) => p.inStock).slice(0, 8).map((p, index) => (
          <ProductCard key={index} product={p} />
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
