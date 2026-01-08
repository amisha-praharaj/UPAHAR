import React from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { BsCart4 } from "react-icons/bs";
import { useAppContext } from "../context/AppContext";

const ProductCard = ({ product }) => {
  const { currency, addToCart, removeFromCart, cartItems, navigate } = useAppContext();

  if (!product) {
    return (
      <div className="border border-black rounded-md px-4 py-2 bg-[#b392ac] w-full flex items-center justify-center text-gray-400">
        Loading product...
      </div>
    );
  }

  // ✅ Always use _id (backend MongoDB) as product ID
  const productId = product._id || product.id;
  const quantity = cartItems[productId] || 0;

  // ✅ Handle image URLs from both local server & Cloudinary
  const getProductImage = () => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      const img = product.images[0];
      // If it's already a Cloudinary (or remote) URL, return directly
      if (img.startsWith("http") || img.startsWith("https")) return img;
      // Otherwise assume local uploads
      const baseURL = import.meta.env.VITE_IMAGE_URL || "http://localhost:5000/uploads";
      return `${baseURL}/${img}`;
    }
    // fallback
    return "/fallback.png";
  };

  return (
    <div
      onClick={() => {
        if (product.category && productId) {
          navigate(`/products/${product.category.toLowerCase()}/${productId}`);
          window.scrollTo(0, 0);
        } else {
          console.warn("Product data incomplete:", product);
        }
      }}
      className="border border-gray-500/20 rounded-md px-3 py-2 bg-[#e8c2ca] w-full cursor-pointer shadow-[10px_10px_20px_rgba(0,0,0,0.2)] flex flex-col justify-between h-full"
    >
      <div className="group flex items-center justify-center px-2 h-50">
        <img
          className="group-hover:scale-105 transition max-w-full h-auto md:max-w-36 object-contain"
          src={getProductImage()}
          alt={product.name}
        />
      </div>

      <div className="text-black-500/60 text-sm mt-3">
        <p>{product.category}</p>
        <p className="text-black font-medium text-lg truncate w-full mt-3">{product.name}</p>

        <div className="flex items-center gap-0.5 text-yellow-500 mt-3">
          {[...Array(5)].map((_, i) =>
            i < 4 ? <FaStar key={i} /> : <FaStarHalfAlt key={i} />
          )}
          <p className="text-black">(4)</p>
        </div>

        <div className="flex items-end justify-between mt-3">
          <p className="text-black md:text-xl text-base font-medium">
            {currency}
            {product.offerPrice}{" "}
            <span className="text-gray-500 line-through md:text-sm text-xs">
              {currency}
              {product.price}
            </span>
          </p>

          <div onClick={(e) => e.stopPropagation()} className="text-black">
            {quantity === 0 ? (
              <button
                className="flex items-center justify-center gap-1 bg-primary/30 border border-primary/40 md:w-[80px] w-[64px] h-[34px] rounded cursor-pointer text-black"
                onClick={() => addToCart(productId)}
              >
                <BsCart4 />
                Add
              </button>
            ) : (
              <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-primary/25 rounded select-none">
                <button
                  onClick={() => removeFromCart(productId)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  -
                </button>
                <span className="w-5 text-center">{quantity}</span>
                <button
                  onClick={() => addToCart(productId)}
                  className="cursor-pointer text-md px-2 h-full"
                >
                  +
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;










