import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaShoppingCart } from "react-icons/fa";
import { RiMenuLine } from "react-icons/ri";
import { CgProfile } from "react-icons/cg";
import toast from "react-hot-toast";
import { useAppContext } from "../context/AppContext";

const Navbar = () => {
    const [open, setOpen] = useState(false);

    const {
        user,
        setUser,
        setShowUserLogin,
        navigate,
        setSearchQuery,
        searchQuery,
        getCartCount,
        axios,
    } = useAppContext();

    // ✅ Logout Function
    const logout = async () => {
        try {
            const { data } = await axios.get("/api/user/logout");
            if (data.success) {
                toast.success(data.message);
                setUser(null);
                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    // ✅ Search Redirect
    useEffect(() => {
        if (searchQuery.length > 0) {
            navigate("/products");
        }
    }, [searchQuery]);

    return (
        <nav className="sticky top-0 z-50 bg-[#e8c2ca] border-b border-gray-300 py-3 px-4 sm:px-6 md:px-10 lg:px-20 flex items-center justify-between shadow-sm transition-all duration-300">
            {/* Logo */}
            <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center">
                <img
                    src="/images/logo.png"
                    alt="Logo"
                    className="h-14 w-14 sm:h-16 sm:w-16 rounded-full object-cover"
                />
            </NavLink>

            {/* Desktop Navigation */}
            <div className="hidden sm:flex items-center gap-6 md:gap-8 text-gray-900 font-medium">
                <NavLink to="/" className="hover:text-primary transition">Home</NavLink>
                <NavLink to="/products" className="hover:text-primary transition">All Products</NavLink>
                <NavLink to="/contact" className="hover:text-primary transition">Contact</NavLink>

                {/* Search Box (Desktop only) */}
                <div className="hidden lg:flex items-center gap-2 border border-gray-400 rounded-full px-3 py-1.5 text-sm bg-white">
                    <input
                        onChange={(e) => setSearchQuery(e.target.value)}
                        type="text"
                        placeholder="Search products"
                        className="w-36 xl:w-48 bg-transparent outline-none placeholder-gray-500"
                    />
                    <CiSearch className="text-lg" />
                </div>

                {/* Cart Icon */}
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer hover:text-primary transition"
                >
                    <FaShoppingCart className="text-lg" />
                    <span className="absolute -top-2 -right-3 text-xs font-semibold text-black bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        {getCartCount()}
                    </span>
                </div>

                {/* User Section */}
                {!user ? (
                    <button
                        onClick={() => setShowUserLogin(true)}
                        className="cursor-pointer px-5 py-2 bg-primary hover:bg-primary/90 transition text-black rounded-full text-sm"
                    >
                        Login
                    </button>
                ) : (
                    <div className="relative group cursor-pointer">
                        <CgProfile className="text-2xl" />
                        <ul className="hidden group-hover:block absolute top-6 right-0 bg-white shadow-md border border-gray-200 py-2 w-36 rounded-md text-sm z-40">
                            <li
                                onClick={() => navigate("/myorders")}
                                className="p-2 pl-4 hover:bg-primary/10 cursor-pointer"
                            >
                                My Orders
                            </li>
                            <li
                                onClick={logout}
                                className="p-2 pl-4 hover:bg-primary/10 cursor-pointer"
                            >
                                Logout
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* Right side (Mobile) */}
            <div className="flex items-center gap-3 sm:hidden">
                {/* Cart for Mobile */}
                <div
                    onClick={() => navigate("/cart")}
                    className="relative cursor-pointer hover:text-primary transition"
                >
                    <FaShoppingCart className="text-lg" />
                    <span className="absolute -top-2 -right-3 text-xs font-semibold text-black bg-primary w-[18px] h-[18px] rounded-full flex items-center justify-center">
                        {getCartCount()}
                    </span>
                </div>

                {/* Menu Button */}
                <button
                    onClick={() => setOpen(!open)}
                    aria-label="Menu"
                    className="text-xl text-gray-800"
                >
                    <RiMenuLine />
                </button>
            </div>

            {/* Mobile Dropdown Menu */}
            {open && (
                <div className="absolute top-[68px] left-0 w-full bg-white shadow-md py-4 flex flex-col gap-3 px-6 text-gray-800 font-medium sm:hidden">
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary">Home</NavLink>
                    <NavLink to="/products" onClick={() => setOpen(false)} className="hover:text-primary">All Products</NavLink>
                    {user && (
                        <NavLink to="/myorders" onClick={() => setOpen(false)} className="hover:text-primary">
                            My Orders
                        </NavLink>
                    )}
                    <NavLink to="/" onClick={() => setOpen(false)} className="hover:text-primary">Contact</NavLink>

                    {/* Search Input (Mobile) */}
                    <div className="flex items-center gap-2 border border-gray-400 rounded-full px-3 py-1.5 mt-2">
                        <input
                            onChange={(e) => setSearchQuery(e.target.value)}
                            type="text"
                            placeholder="Search..."
                            className="w-full bg-transparent outline-none text-sm"
                        />
                        <CiSearch className="text-base" />
                    </div>

                    {/* Login / Logout Button */}
                    {!user ? (
                        <button
                            onClick={() => {
                                setOpen(false);
                                setShowUserLogin(true);
                            }}
                            className="cursor-pointer px-5 py-2 mt-3 bg-primary hover:bg-primary/90 transition text-black rounded-full text-sm"
                        >
                            Login
                        </button>
                    ) : (
                        <button
                            onClick={() => {
                                setOpen(false);
                                logout();
                            }}
                            className="cursor-pointer px-5 py-2 mt-3 bg-primary hover:bg-primary/90 transition text-black rounded-full text-sm"
                        >
                            Logout
                        </button>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
