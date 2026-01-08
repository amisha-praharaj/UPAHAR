import { useEffect, createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { dummy } from "../assets/alldatas";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [currency] = useState("₹");
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [product, setProducts] = useState(dummy);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Fetch seller status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get("/api/seller/is-sauth");
      setIsSeller(!!data.success);
    } catch {
      setIsSeller(false);
    }
  };

  // ✅ Fetch user auth status
  const fetchUser = async () => {
    try {
      const { data } = await axios.get("/api/user/isauth");
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    }
  };

  // ✅ Fetch products
  const fetchProduct = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data.success && Array.isArray(data.products)) {
        setProducts(data.products);
      } else {
        toast.error("No products found. Using dummy data.");
        setProducts(dummy);
      }
    } catch (error) {
      console.error("Error loading products:", error.message);
      toast.error("Backend error. Showing dummy data.");
      setProducts(dummy);
    }
  };

  // ✅ Add item to cart
  const addToCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      newCart[itemId] = (newCart[itemId] || 0) + 1;
      toast.success("Product added to cart");
      return newCart;
    });
  };

  // ✅ Remove item from cart
  const removeFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      if (newCart[itemId]) {
        newCart[itemId] -= 1;
        if (newCart[itemId] <= 0) delete newCart[itemId];
      }
      toast.success("Product removed from cart");
      return newCart;
    });
  };

  // ✅ Get total item count
  const getCartCount = () =>
    Object.values(cartItems).reduce((total, count) => total + count, 0);

  // ✅ Get total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const itemInfo = product.find((p) => p._id === id);
      if (itemInfo) total += (itemInfo.offerPrice || 0) * qty;
      return total;
    }, 0);
  };

  // ✅ Effects
  useEffect(() => {
    fetchUser();
    fetchSeller();
    fetchProduct();
  }, []);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    currency,
    product,
    cartItems,
    addToCart,
    removeFromCart,
    getCartAmount,
    getCartCount,
    showUserLogin,
    setShowUserLogin,
    searchQuery,
    setSearchQuery,
    axios,
    fetchProduct,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);










// import { useEffect, createContext, useContext, useState } from "react";
// import toast from "react-hot-toast";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import { dummy } from "../assets/alldatas";

// axios.defaults.withCredentials = true;
// axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

// export const AppContext = createContext();

// export const AppContextProvider = ({ children }) => {
//   const [currency] = useState("₹");
//   const navigate = useNavigate();

//   const [user, setUser] = useState(null);
//   const [isSeller, setIsSeller] = useState(false);
//   const [cartItems, setCartItems] = useState({});
//   const [product, setProducts] = useState(dummy);
//   const [showUserLogin, setShowUserLogin] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   // ✅ Fetch seller status
//   const fetchSeller = async () => {
//     try {
//       const { data } = await axios.get("/api/seller/is-sauth", { withCredentials: true });
//       setIsSeller(!!data.success);
//     } catch {
//       setIsSeller(false);
//     }
//   };

//   // ✅ Fetch user auth status
//   const fetchUser = async () => {
//     try {
//       const { data } = await axios.get("/api/user/isauth");
//       if (data.success) {
//         setUser(data.user);
//         setCartItems(data.user.cartItems || {}); // corrected key
//       }
//     } catch {
//       setUser(null);
//     }
//   };

//   // ✅ Fetch products
//   const fetchProduct = async () => {
//     try {
//       const { data } = await axios.get("/api/product/list");
//       if (data.success && Array.isArray(data.products)) {
//         setProducts(data.products);
//       } else {
//         toast.error("No products found. Using dummy data.");
//         setProducts(dummy);
//       }
//     } catch (error) {
//       console.error("Error loading products:", error.message);
//       toast.error("Backend error. Showing dummy data.");
//       setProducts(dummy);
//     }
//   };

//   // ✅ Add item to cart
//   const addToCart = (itemId) => {
//     setCartItems((prev) => {
//       const newCart = { ...prev };
//       newCart[itemId] = (newCart[itemId] || 0) + 1;
//       toast.success("Product added to cart");
//       return newCart;
//     });
//   };

//   // ✅ Remove item from cart
//   const removeFromCart = (itemId) => {
//     setCartItems((prev) => {
//       const newCart = { ...prev };
//       if (newCart[itemId]) {
//         newCart[itemId] -= 1;
//         if (newCart[itemId] <= 0) delete newCart[itemId];
//       }
//       toast.success("Product removed from cart");
//       return newCart;
//     });
//   };

//   // ✅ Get total item count
//   const getCartCount = () =>
//     Object.values(cartItems).reduce((total, count) => total + count, 0);

//   // ✅ Get total cart amount
//   const getCartAmount = () => {
//     return Object.entries(cartItems).reduce((total, [id, qty]) => {
//       const itemInfo = product.find((p) => p._id === id);
//       if (itemInfo) total += (itemInfo.offerPrice || 0) * qty;
//       return total;
//     }, 0);
//   };

//   // ✅ Effects
//   useEffect(() => {
//     fetchUser();
//     fetchSeller();
//     fetchProduct();
//   }, []);

//   const value = {
//     navigate,
//     user,
//     setUser,
//     isSeller,
//     setIsSeller,
//     currency,
//     product,
//     cartItems,
//     addToCart,
//     removeFromCart,
//     getCartAmount,
//     getCartCount,
//     showUserLogin,
//     setShowUserLogin,
//     searchQuery,
//     setSearchQuery,
//     axios,
//     fetchProduct,
//   };

//   return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
// };

// export const useAppContext = () => useContext(AppContext);




