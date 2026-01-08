import jwt from "jsonwebtoken";
//login seller :api/seller/login

export const sellerLogin = async(req,res)=>{
    try{
const {email,password} = req.body;

    if (email === process.env.SELLER_EMAIL && password === process.env.SELLER_PASSWORD) {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

       res.cookie("sellerToken", token, {
      httpOnly: true,
      sameSite: "Lax", // or 'None' if you are using cross-origin
      secure: false,   // Set to `true` if using https
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

return res.json({success:true, message:"Login Successfully"});

}else{
    return res.json({success:false, message:"Invalid Credentials"});
}

    } catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});
    }
    
} 

//seller auth : api/seller/is-auth
export const isSellerauth = async (req, res) => {
  try {
    
    return res.json({ success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

//seller logout : api/seller/logout

export const sellerlogout = async (req,res)=>{
    try{
   res.clearCookie('sellerToken',{
    httpOnly: true,  //prevent js to access cookie
    secure:process.env.NODE_ENV === 'production', // use secure cookie in production
    sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict', // prevent csrf attack
   });
   return res.json({success:true, message:"Logged Out Successfully"});
    }catch(error){
        console.log(error.message);
        res.json({success:false, message:error.message});

    }
}