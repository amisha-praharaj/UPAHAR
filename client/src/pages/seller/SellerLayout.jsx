import { useAppContext } from "../../context/AppContext";
import { TiDocumentAdd } from "react-icons/ti";
import { MdOutlinePlaylistAddCheckCircle } from "react-icons/md";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const SellerLayout = () => {


    const { axios, navigate } = useAppContext();




    const sidebarLinks = [
        { name: "Add Product ", path: "/seller", icon: <TiDocumentAdd /> },
        { name: "Product List", path: "/seller/product-list", icon: <MdOutlinePlaylistAddCheckCircle /> },
        { name: "Orders", path: "/seller/orders", icon: <MdOutlineLibraryAddCheck /> },
    ];

    const logout = async () => {
        try {
            const { data } = await axios.get('/api/seller/logout');
            if (data.success) {
                toast.success(data.message);
                navigate('/')
            }
            else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            <div className="sticky top-0 z-50 h-18 flex items-center justify-between px-9 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 bg-[#e8c2ca]  transition-all">
                <Link to="/">
                    <img className="absolute top-0.5 left-4 h-16 rounded-full" src="/images/logo.png" alt="dummyLogo" />
                </Link>
                <div className="flex items-center gap-5 text-black-500">
                    <p>Hi! Admin</p>
                    <button onClick={logout} className="cursor-pointer px-8 py-2 bg-primary-dull hover:bg-primary transition text-black rounded-full">Logout</button>
                </div>
            </div>
            <div className="flex">
                <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col ">
                    {sidebarLinks.map((item) => (
                        <NavLink to={item.path} key={item.name} end={item.path === "/seller"}
                            className={({ isActive }) => `flex items-center py-3 px-4 gap-3 
                            ${isActive ? "border-r-4 md:border-r-[6px] bg-primary border-gray-100/90 text-white"
                                    : "hover:bg-gray-100/90 border-white"
                                }`
                            }
                        >
                            {item.icon}
                            <p className="md:block hidden text-center">{item.name}</p>
                        </NavLink>
                    ))}
                </div>
                <Outlet />
            </div>
        </>
    );
};

export default SellerLayout