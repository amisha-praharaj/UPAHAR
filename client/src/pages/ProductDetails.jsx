import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { useAppContext } from "../context/AppContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const { product: allProducts, addToCart } = useAppContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!allProducts || allProducts.length === 0) return;

    const foundProduct = allProducts.find((item) => item._id === id);
    if (foundProduct) {
      setProduct(foundProduct);
      setSelectedImage(foundProduct.images?.[0] || "/placeholder.png");
    }
  }, [id, allProducts]);

  if (!product) {
    return (
      <div className="text-center mt-20 text-gray-600">
        Loading product...
      </div>
    );
  }

  const relatedProducts = allProducts.filter((item) => item._id !== product._id);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left section - Image */}
        <div>
          <div className="border p-4">
            <img
              src={selectedImage}
              alt={product.name}
              className="w-full h-72 object-contain"
            />
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {product.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`thumb-${index}`}
                className={`w-16 h-16 object-cover border cursor-pointer ${selectedImage === img ? "border-blue-500" : "border-gray-200"
                  }`}
                onClick={() => setSelectedImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right section - Details */}
        <div>
          <h2 className="text-2xl font-semibold">{product.name}</h2>
          <div className="mt-4">
            <p className="line-through text-gray-950">MRP: ₹{product.price}</p>
            <p className="text-lg font-bold text-black-800">
              Offer Price: ₹{product.offerPrice}
            </p>
            <p className="text-sm text-black-300">(inclusive of all taxes)</p>
          </div>

          <div className="mt-4">
            <h4 className="font-semibold mb-2">About Product</h4>
            <p className="text-black-300 text-sm">{product.desc}</p>
          </div>

          <div className="mt-6 flex gap-4">
            <button
              onClick={() => addToCart(product._id)}
              className="bg-gray-300 px-6 py-2 rounded hover:bg-primary-dull"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="bg-primary-dull text-black px-6 py-2 rounded hover:bg-gray-300"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max ">
          <p className="text-2xl">Related Products</p>
          <div className="w-20 h-0.5 bg-primary rounded-full mt-4"></div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-2 gap-3 md:gap-6 lg:grid-cols-5 mt-6 w-full">
          {relatedProducts
            .filter((item) => item.inStock)
            .map((item, index) => (
              <ProductCard key={index} product={item} />
            ))}
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border rounded text-black bg-gray-300 hover:bg-primary transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;




