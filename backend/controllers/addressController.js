import Address from "../models/Address.js";

// Add Address
export const addAddress = async (req, res) => {
  try {
    const userId = req.userId; // ✅ from authUser middleware
    const { address } = req.body;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    if (!address) {
      return res.status(400).json({ success: false, message: "Address data missing" });
    }

    const newAddress = await Address.create({ ...address, userId });
    res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
  } catch (error) {
    console.error("Add address error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Address
export const getAddress = async (req, res) => {
  try {
    const userId = req.userId;
    if (!userId) return res.status(400).json({ success: false, message: "User not authorized" });

    const addresses = await Address.find({ userId });
    res.status(200).json({ success: true, addresses });
  } catch (error) {
    console.error("Get address error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Address
export const updateAddress = async (req, res) => {
  try {
    const { address, addressId } = req.body;
    await Address.findByIdAndUpdate(addressId, address);
    res.status(200).json({ success: true, message: "Address updated successfully" });
  } catch (error) {
    console.error("Update address error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};










// import Address from "../models/Address.js";

// // Add Address
// export const addAddress = async (req, res) => {
//   try {
//     const { address, userId } = req.body;

//     if (!address || !userId) {
//       return res.status(400).json({ success: false, message: "Missing address or userId" });
//     }

//     const newAddress = await Address.create({ ...address, userId });
//     res.status(201).json({ success: true, message: "Address added successfully", address: newAddress });
//   } catch (error) {
//     console.error("Add address error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };

// // Get Address
// export const getAddress = async (req, res) => {
//   try {
//     const { userId } = req.body;
//     if (!userId) return res.status(400).json({ success: false, message: "UserId missing" });

//     const addresses = await Address.find({ userId });
//     res.status(200).json({ success: true, addresses });
//   } catch (error) {
//     console.error("Get address error:", error.message);
//     res.status(500).json({ success: false, message: error.message });
//   }
// };


// //update address : api/address/update

// export const updateAddress = async (req, res) => {
//     try {
//         const {address, addressId} = req.body;
//         await Address.findByIdAndUpdate(addressId, address)
//         res.status(200).json({success: true, message: "Address updated successfully"})
//     } catch (error) {
//         console.log(error.message);
//         res.status(500).json({success: false, message: error.message})
//     }
// }







