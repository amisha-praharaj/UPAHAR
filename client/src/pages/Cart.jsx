import { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { IoIosRemoveCircleOutline } from "react-icons/io";
import { FaArrowLeftLong } from "react-icons/fa6";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    product,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    navigate,
    getCartAmount,
    user,
    setShowUserLogin,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]); // 🔹 will store from backend
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // 🔹 Load cart products from global state
  const getCart = () => {
    if (!product || !cartItems) return;

    const tempA = Object.keys(cartItems)
      .map((key) => {
        const newprd = product.find(
          (pdt) =>
            pdt._id?.toString() === key.toString() ||
            pdt.id?.toString() === key.toString()
        );
        if (!newprd) return null;
        return { ...newprd, quantity: cartItems[key] };
      })
      .filter(Boolean);

    setCartArray(tempA);
  };

  useEffect(() => {
    if (product.length > 0 && cartItems) {
      getCart();
    }
  }, [product, cartItems]);

  // 🔹 Fetch addresses from backend (for logged-in user)
  const fetchAddresses = async () => {
    try {
      const { data } = await axios.get("/api/address/get", { withCredentials: true });
      if (data.success) {
        setAddresses(data.addresses);
        setSelectedAddress(data.addresses[0]); // select first by default
      } else {
        setAddresses([]);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
      toast.error("Failed to load addresses");
    }
  };

  useEffect(() => {
    if (user) {
      fetchAddresses();
    }
  }, [user]);

  // 🧾 Place order logic
  const placeOrder = () => {
    if (!user) {
      toast.error("Please login to place your order");
      setShowUserLogin(true);
      return;
    }

    if (getCartCount() === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!selectedAddress) {
      toast.error("Please select a delivery address");
      return;
    }

    toast.success("Proceeding to checkout...");
    navigate("/checkout");
  };

  return product.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16">
      {/* 🛒 Left Section */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart{" "}
          <span className="text-sm text-gray-500">{getCartCount()}</span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-100/80 text-xl font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.length > 0 ? (
          cartArray.map((prd, index) => (
            <div
              key={prd._id || index}
              className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div
                  onClick={() => {
                    navigate(`/product/${prd.category.toLowerCase()}/${prd._id}`);
                    scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                >
                  <img
                    className="max-w-full h-full object-cover"
                    src={prd.images?.[0]}
                    alt={prd.name}
                  />
                </div>
                <div>
                  <p className="hidden md:block font-bold text-black">{prd.name}</p>
                  <div className="font-normal text-black-900">
                    <div className="flex items-center">
                      <div className="flex items-center">
                        <p>Qty:&nbsp;</p>
                        <span className="text-black font-medium">{prd.quantity}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center text-black">
                {currency}
                {(prd.offerPrice || prd.price) * prd.quantity}
              </p>
              <button
                onClick={() => removeFromCart(prd._id)}
                className="cursor-pointer mx-auto"
              >
                <IoIosRemoveCircleOutline className="inline-block w-6 h-6 text-black hover:text-red-500" />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 mt-6">Your cart is empty.</p>
        )}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-black font-medium"
        >
          <FaArrowLeftLong className="group-hover:-translate-x-1 transition" />
          Continue Shopping
        </button>
      </div>

      {/* 💳 Right Section */}
      <div className="max-w-[360px] h-[77vh] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />

        {/* Address */}
        <div className="mb-6 relative">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          {selectedAddress ? (
            <p className="text-gray-500 mt-2">
              {selectedAddress.firstName} {selectedAddress.lastName}, <br />
              {selectedAddress.street}, {selectedAddress.city}, {selectedAddress.state},{" "}
              {selectedAddress.country} - {selectedAddress.zipCode}
            </p>
          ) : (
            <p className="text-gray-500 mt-2">No address found</p>
          )}

          <button
            onClick={() => setShowAddress(!showAddress)}
            className="text-indigo-800 hover:underline mt-2"
          >
            Change
          </button>

          {showAddress && (
            <div className="absolute top-20 bg-white border border-gray-300 rounded shadow-lg text-sm w-full max-h-40 overflow-y-auto">
              {addresses.map((address, index) => (
                <p
                  key={index}
                  onClick={() => {
                    setSelectedAddress(address);
                    setShowAddress(false);
                  }}
                  className="text-gray-600 p-2 hover:bg-gray-100 cursor-pointer"
                >
                  {address.street}, {address.city}, {address.state}, {address.country}
                </p>
              ))}
              <p
                onClick={() => navigate("/add-address")}
                className="text-primary text-center cursor-pointer p-2 hover:bg-primary/20"
              >
                ➕ Add new address
              </p>
            </div>
          )}
        </div>

        {/* Payment */}
        <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
        <select
          onChange={(e) => setPaymentOption(e.target.value)}
          className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
        >
          <option value="COD">Cash On Delivery</option>
          <option value="Online">Online Payment</option>
        </select>

        <hr className="border-gray-300 my-5" />

        {/* Summary */}
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="text-black flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-primary-dull text-black font-medium hover:bg-primary transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  ) : null;
};

export default Cart;










// import { useState, useEffect } from "react";
// import { useAppContext } from "../context/AppContext";
// import { IoIosRemoveCircleOutline } from "react-icons/io";
// import { FaArrowLeftLong } from "react-icons/fa6";
// import { dummyAddress } from "../assets/alldatas";
// import toast from "react-hot-toast";

// const Cart = () => {
//     const {
//         product,
//         currency,
//         cartItems,
//         removeFromCart,
//         getCartCount,
//         updateCartItem,
//         navigate,
//         getCartAmount,
//         user,
//         setShowUserLogin,
//     } = useAppContext();

//     const [cartArray, setCartArray] = useState([]);
//     const [addresses, setAddresses] = useState(dummyAddress);
//     const [showAddress, setShowAddress] = useState(false);
//     const [selectedAddress, setSelectedAddress] = useState(dummyAddress[0]);
//     const [paymentOption, setPaymentOption] = useState("COD");

//     // 🔄 Load cart products from global state
//     const getCart = () => {
//         if (!product || !cartItems) return;

//         const tempA = Object.keys(cartItems)
//             .map((key) => {
//                 const newprd = product.find(
//                     (pdt) => pdt._id?.toString() === key.toString() || pdt.id?.toString() === key.toString()
//                 );
//                 if (!newprd) return null;
//                 return { ...newprd, quantity: cartItems[key] };
//             })
//             .filter(Boolean);

//         setCartArray(tempA);
//     };

//     useEffect(() => {
//         if (product.length > 0 && cartItems) {
//             getCart();
//         }
//     }, [product, cartItems]);

//     // 🧾 Place order logic
//     const placeOrder = () => {
//         if (!user) {
//             toast.error("Please login to place your order");
//             setShowUserLogin(true); // or navigate("/login");
//             return;
//         }

//         if (getCartCount() === 0) {
//             toast.error("Your cart is empty");
//             return;
//         }

//         toast.success("Proceeding to checkout...");
//         navigate("/checkout");
//     };

//     return product.length > 0 && cartItems ? (
//         <div className="flex flex-col md:flex-row mt-16">
//             {/* 🛒 Left Section */}
//             <div className="flex-1 max-w-4xl">
//                 <h1 className="text-3xl font-medium mb-6">
//                     Shopping Cart <span className="text-sm text-gray-500">{getCartCount()}</span>
//                 </h1>

//                 <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-100/80 text-xl font-medium pb-3">
//                     <p className="text-left">Product Details</p>
//                     <p className="text-center">Subtotal</p>
//                     <p className="text-center">Action</p>
//                 </div>

//                 {cartArray.length > 0 ? (
//                     cartArray.map((prd, index) => (
//                         <div
//                             key={prd._id || index}
//                             className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3"
//                         >
//                             <div className="flex items-center md:gap-6 gap-3">
//                                 <div
//                                     onClick={() => {
//                                         navigate(`/product/${prd.category.toLowerCase()}/${prd._id}`);
//                                         scrollTo(0, 0);
//                                     }}
//                                     className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
//                                 >
//                                     <img
//                                         className="max-w-full h-full object-cover"
//                                         src={prd.images?.[0]}
//                                         alt={prd.name}
//                                     />
//                                 </div>
//                                 <div>
//                                     <p className="hidden md:block font-bold text-black">{prd.name}</p>
//                                     <div className="font-normal text-black-900">
//                                         <div className="flex items-center">
//                                             <div>
//                                                 <div className="flex items-center">
//                                                     <p>Qty:&nbsp;</p>
//                                                     <span className="text-black font-medium">{prd.quantity}</span>
//                                                 </div>
//                                             </div>

//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                             <p className="text-center text-black">
//                                 {currency}
//                                 {(prd.offerPrice || prd.price) * prd.quantity}
//                             </p>
//                             <button onClick={() => removeFromCart(prd._id)} className="cursor-pointer mx-auto">
//                                 <IoIosRemoveCircleOutline className="inline-block w-6 h-6 text-black hover:text-red-500" />
//                             </button>
//                         </div>
//                     ))
//                 ) : (
//                     <p className="text-gray-500 mt-6">Your cart is empty.</p>
//                 )}

//                 <button
//                     onClick={() => {
//                         navigate("/products");
//                         scrollTo(0, 0);
//                     }}
//                     className="group cursor-pointer flex items-center mt-8 gap-2 text-black font-medium"
//                 >
//                     <FaArrowLeftLong className="group-hover:-translate-x-1 transition" />
//                     Continue Shopping
//                 </button>
//             </div>

//             {/* 💳 Right Section */}
//             <div className="max-w-[360px] h-[75vh] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
//                 <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
//                 <hr className="border-gray-300 my-5" />

//                 {/* Address */}
//                 <div className="mb-6">
//                     <p className="text-sm font-medium uppercase">Delivery Address</p>
//                     <div className="relative flex justify-between items-start mt-2">
//                         <p className="text-gray-500">
//                             {selectedAddress
//                                 ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
//                                 : "no address found"}
//                         </p>
//                         <button onClick={() => setShowAddress(!showAddress)} className="text-indigo-800 hover:underline cursor-pointer">
//                             Change
//                         </button>
//                         {showAddress && (
//                             <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full">
//                                 {addresses.map((address, index) => (
//                                     <p
//                                         key={index}
//                                         onClick={() => {
//                                             setSelectedAddress(address);
//                                             setShowAddress(false);
//                                         }}
//                                         className="text-gray-500 p-2 hover:bg-gray-200 cursor-pointer"
//                                     >
//                                         {address.street}, {address.city}, {address.state}, {address.country}
//                                     </p>
//                                 ))}
//                                 <p
//                                     onClick={() => navigate("/add-address")}
//                                     className="text-primary text-center cursor-pointer p-2 hover:bg-primary/20"
//                                 >
//                                     Add address
//                                 </p>
//                             </div>
//                         )}
//                     </div>

//                     {/* Payment */}
//                     <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
//                     <select
//                         onChange={(e) => setPaymentOption(e.target.value)}
//                         className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
//                     >
//                         <option value="COD">Cash On Delivery</option>
//                         <option value="Online">Online Payment</option>
//                     </select>
//                 </div>

//                 <hr className="border-gray-300" />

//                 {/* Summary */}
//                 <div className="text-gray-500 mt-4 space-y-2">
//                     <p className="flex justify-between">
//                         <span>Price</span>
//                         <span>{currency}{getCartAmount()}</span>
//                     </p>
//                     <p className="flex justify-between">
//                         <span>Shipping Fee</span>
//                         <span className="text-green-600">Free</span>
//                     </p>
//                     <p className="flex justify-between">
//                         <span>Tax (2%)</span>
//                         <span>{currency}{(getCartAmount() * 2) / 100}</span>
//                     </p>
//                     <p className="text-black flex justify-between text-lg font-medium mt-3">
//                         <span>Total Amount:</span>
//                         <span>{currency}{getCartAmount() + (getCartAmount() * 2) / 100}</span>
//                     </p>
//                 </div>

//                 <button
//                     onClick={(placeOrder)}
//                     className="w-full py-3 mt-6 cursor-pointer bg-primary-dull text-black font-medium hover:bg-primary transition"
//                 >
//                     {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
//                 </button>
//             </div>
//         </div>
//     ) : null;
// };

// export default Cart;







