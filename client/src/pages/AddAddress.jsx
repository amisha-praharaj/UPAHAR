import React, { useState } from "react";
import { useAppContext } from "../context/AppContext";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const InputField = ({ type, placeholder, name, handleChange, address }) => (
  <input
    className="w-full px-2 py-2.5 border border-black rounded outline-none text-black-900 focus:border-white transition"
    type={type}
    placeholder={placeholder}
    name={name}
    onChange={handleChange}
    value={address[name]}
    required
  />
);

const AddAddress = () => {
  const { user, navigate } = useAppContext();

  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipcode: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const onsubmitHandler = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error("Please log in first.");
      return;
    }

    if (Object.values(address).some((val) => val.trim() === "")) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("/api/address/add", { address });
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/cart");
      } else {
        toast.error(response.data.message || "Failed to add address");
      }
    } catch (error) {
      console.error("Add address error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  return (
    <div className="mt-6 pb-16">
      <Toaster position="top-right" />
      <p className="text-2xl md:text-3xl text-black">
        Add Shipping <span className="font-semibold text-gray-700">Address</span>
      </p>
      <div className="flex flex-col reverse md:flex-row justify-between mt-10">
        <div className="flex-1 max-w-md">
          <form className="space-y-3 mt-6 text-sm" onSubmit={onsubmitHandler}>
            <div className="grid grid-cols-2 gap-3">
              <InputField handleChange={handleChange} address={address} type="text" placeholder="First Name" name="firstName" />
              <InputField handleChange={handleChange} address={address} type="text" placeholder="Last Name" name="lastName" />
            </div>

            <InputField handleChange={handleChange} address={address} type="email" placeholder="Email" name="email" />
            <InputField handleChange={handleChange} address={address} type="text" placeholder="Street Address" name="street" />

            <div className="grid grid-cols-2 gap-3">
              <InputField handleChange={handleChange} address={address} type="text" placeholder="City" name="city" />
              <InputField handleChange={handleChange} address={address} type="text" placeholder="State" name="state" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputField handleChange={handleChange} address={address} type="text" placeholder="Country" name="country" />
              <InputField handleChange={handleChange} address={address} type="number" placeholder="Zipcode" name="zipcode" />
            </div>

            <InputField handleChange={handleChange} address={address} type="text" placeholder="Phone" name="phone" />

            <button className="w-full mt-6 bg-primary-dull text-black py-3 hover:bg-primary transition cursor-pointer uppercase">
              Save Address
            </button>
          </form>
        </div>

        <img className="w-120 h-100" src="images/addresbg.jpg" alt="Add Address" />
      </div>
    </div>
  );
};

export default AddAddress;










// import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// // Input field component
// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//     <input
//         className="w-full px-2 py-2.5 border border-black rounded outline-none text-black-900 focus:border-white transition"
//         type={type}
//         placeholder={placeholder}
//         name={name}
//         onChange={handleChange}
//         value={address[name]}
//         required
//     />
// );

// const AddAddress = () => {
//     const { user, navigate } = useAppContext();

//     const [address, setAddress] = useState({
//         firstName: "",
//         lastName: "",
//         email: "",
//         street: "",
//         city: "",
//         state: "",
//         country: "",
//         zipcode: "",
//         phone: ""
//     });

//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setAddress(prev => ({ ...prev, [name]: value }));
//     };

//     const onsubmitHandler = async (e) => {
//         e.preventDefault();

//         // ✅ Check if user and address are valid
//         if (!user || !user._id) {
//             toast.error("You must be logged in to add an address");
//             return;
//         }

//         if (!address || Object.values(address).some(val => val === "")) {
//             toast.error("Please fill in all address fields");
//             return;
//         }

//         try {
//             // ✅ Send properly structured data
//             const response = await axios.post(
//                 "/api/address/add",
//                 { address, userId: user._id },
//                 { headers: { Authorization: `Bearer ${user.token}` } } // JWT token for auth
//             );

//             if (response.data.success) {
//                 toast.success(response.data.message);
//                 navigate("/cart"); // redirect to cart
//             } else {
//                 toast.error("Failed to add address");
//             }
//         } catch (error) {
//             console.error("Add address error:", error.response?.data || error.message);
//             toast.error("Something went wrong");
//         }
//     };

//     return (
//         <div className="mt-6 pb-16">
//             <Toaster position="top-right" />
//             <p className="text-2xl md:text-3xl text-black">
//                 Add Shipping <span className="font-semibold text-gray-700">Address</span>
//             </p>
//             <div className="flex flex-col reverse md:flex-row justify-between mt-10">
//                 <div className="flex-1 max-w-md">
//                     <form className="space-y-3 mt-6 text-sm" onSubmit={onsubmitHandler}>
//                         <div className="grid grid-cols-2 gap-3">
//                             <InputField handleChange={handleChange} address={address} type="text" placeholder="First Name" name="firstName" />
//                             <InputField handleChange={handleChange} address={address} type="text" placeholder="Last Name" name="lastName" />
//                         </div>

//                         <InputField handleChange={handleChange} address={address} type="email" placeholder="Email" name="email" />
//                         <InputField handleChange={handleChange} address={address} type="text" placeholder="Street Address" name="street" />

//                         <div className="grid grid-cols-2 gap-3">
//                             <InputField handleChange={handleChange} address={address} type="text" placeholder="City" name="city" />
//                             <InputField handleChange={handleChange} address={address} type="text" placeholder="State" name="state" />
//                         </div>

//                         <div className="grid grid-cols-2 gap-3">
//                             <InputField handleChange={handleChange} address={address} type="text" placeholder="Country" name="country" />
//                             <InputField handleChange={handleChange} address={address} type="number" placeholder="Zipcode" name="zipcode" />
//                         </div>

//                         <InputField handleChange={handleChange} address={address} type="text" placeholder="Phone" name="phone" />

//                         <button className="w-full mt-6 bg-primary-dull text-black py-3 hover:bg-primary transition cursor-pointer uppercase">
//                             Save Address
//                         </button>
//                     </form>
//                 </div>

//                 <img className="w-120 h-100" src="images/addresbg.jpg" alt="Add Address" />
//             </div>
//         </div>
//     );
// };

// export default AddAddress;










// import React, { useState } from 'react';
// import { useAppContext } from '../context/AppContext';
// import axios from 'axios';
// import toast, { Toaster } from 'react-hot-toast';

// // Input field component
// const InputField = ({ type, placeholder, name, handleChange, address }) => (
//   <input
//     className="w-full px-2 py-2.5 border border-black rounded outline-none text-black-900 focus:border-white transition"
//     type={type}
//     placeholder={placeholder}
//     name={name}
//     onChange={handleChange}
//     value={address[name]}
//     required
//   />
// );

// const AddAddress = () => {
//   const { user, navigate } = useAppContext();

//   const [address, setAddress] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     street: "",
//     city: "",
//     state: "",
//     country: "",
//     zipcode: "",
//     phone: ""
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setAddress(prev => ({ ...prev, [name]: value }));
//   };

//   const onsubmitHandler = async (e) => {
//     e.preventDefault();

//     if (!user) {
//       toast.error("You must be logged in to add an address");
//       return;
//     }

//     try {
//       const response = await axios.post(
//         "/api/address/add",
//         { address, userId: user._id },
//         { headers: { Authorization: `Bearer ${user.token}` } }
//       );

//       if (response.data.success) {
//         toast.success(response.data.message);
//         navigate("/cart");
//       } else {
//         toast.error("Failed to add address");
//       }
//     } catch (error) {
//       console.error(error.response?.data || error.message);
//       toast.error("Something went wrong");
//     }
//   };

//   return (
//     <div className="mt-6 pb-16">
//       <Toaster position="top-right" />
//       <p className="text-2xl md:text-3xl text-black">
//         Add Shipping <span className="font-semibold text-gray-700">Address</span>
//       </p>
//       <div className="flex flex-col reverse md:flex-row justify-between mt-10">
//         <div className="flex-1 max-w-md">
//           <form className="space-y-3 mt-6 text-sm" onSubmit={onsubmitHandler}>
//             <div className="grid grid-cols-2 gap-3">
//               <InputField handleChange={(handleChange)} address={address} type="text" placeholder="First Name" name="firstName" />
//               <InputField handleChange={(handleChange)} address={address} type="text" placeholder="Last Name" name="lastName" />
//             </div>

//             <InputField handleChange={(handleChange)} address={address} type="email" placeholder="Email" name="email" />
//             <InputField handleChange={(handleChange)} address={address} type="text" placeholder="Street Address" name="street" />

//             <div className="grid grid-cols-2 gap-3">
//               <InputField handleChange={(handleChange)} address={address} type="text" placeholder="City" name="city" />
//               <InputField handleChange={(handleChange)} address={address} type="text" placeholder="State" name="state" />
//             </div>

//             <div className="grid grid-cols-2 gap-3">
//               <InputField handleChange={(handleChange)} address={address} type="text" placeholder="Country" name="country" />
//               <InputField handleChange={(handleChange)} address={address} type="number" placeholder="Zipcode" name="zipcode" />
//             </div>

//             <InputField handleChange={(handleChange)} address={address} type="text" placeholder="Phone" name="phone" />

//             <button className="w-full mt-6 bg-primary-dull text-black py-3 hover:bg-primary transition cursor-pointer uppercase">
//               Save Address
//             </button>
//           </form>
//         </div>

//         <img className="w-120 h-100" src="images/addresbg.jpg" alt="Add Address" />
//       </div>
//     </div>
//   );
// };

// export default AddAddress;
