import React from 'react'
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';



const Login = () => {
    const { setShowUserLogin, setUser, axios, navigate } = useAppContext();
    const [state, setState] = React.useState("login");
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");


    const onSubmitHandler = async (e) => {
        try {
            e.preventDefault();

            const { data } = await axios.post(`/api/user/${state}`, {
                name,
                email,
                password
            });

            if (data.success) {
                navigate('/');
                setUser(data.user)
                setShowUserLogin(false);

            }
            else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }




    }

    return (
        <div onClick={() => setShowUserLogin(false)} className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 '>
            <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()}
                className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg  shadow-xl[10px_10px_20px_rgba(0,0,0,0.2)] bg-[#b392ac]">
                <p className="text-2xl font-medium m-auto">
                    <span className="text-black">User {state === "login" ? "Login" : "Sign Up"}</span>
                </p>
                {state === "register" && (
                    <div className="text-black w-full">
                        <p>Name</p>
                        <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="bg-white border border-gray-200 rounded w-full p-2 mt-1 " type="text" required />
                    </div>
                )}
                <div className="w-full text-black">
                    <p>Email</p>
                    <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 " type="email" required />
                </div>
                <div className="w-full text-black">
                    <p>Password</p>
                    <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1" type="password" required />
                </div>
                {state === "register" ? (
                    <p className='text-black'>
                        Already have account? <span onClick={() => setState("login")} className="font-bold text-indigo-800 cursor-pointer">click here</span>
                    </p>
                ) : (
                    <p className='text-black'>
                        Create an account? <span onClick={() => setState("register")} className=" font-bold text-indigo-800 cursor-pointer">click here</span>
                    </p>
                )}
                <button className="bg-primary-dull hover:bg-primary transition-all text-black w-full py-2 rounded-md cursor-pointer">
                    {state === "register" ? "Create Account" : "Login"}
                </button>
            </form>


        </div>
    )
}

export default Login


// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useAppContext } from '../context/AppContext';

// const Login = () => {
//    const { setUser, setShowUserLogin } = useAppContext();
//   const [state, setState] = React.useState("login");
//   const [name, setName] = React.useState("");
//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (state === "login") {
//       // Simulate login
//       if (email === "test@gmail.com" && password === "123456") {
//         localStorage.setItem("user", JSON.stringify({ email }));
//         setUser({email});
//         setShowUserLogin(false);
//         alert("Login successful!");
//         navigate("/"); // redirect after login
//       } else {
//         alert("Invalid credentials");
//       }
//     } else {
//       // Simulate register
//       if (name && email && password) {
//         localStorage.setItem("user", JSON.stringify({ name, email }));
//         setUser({ name, email });
//         setShowUserLogin(false);
//         alert("Account created!");
//         setState("login");
//       } else {
//         alert("Please fill all fields");
//       }
//     }
//   }

//   return (
//     <div className='fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center text-sm text-gray-600 bg-black/50 '>
//       <form onSubmit={handleSubmit} className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white">
//         <p className="text-2xl font-medium m-auto">
//           <span className="text-indigo-500">User</span> {state === "Login" ? "Login" : "Sign Up"}
//         </p>

//         {state === "register" && (
//           <div className="w-full">
//             <p>Name</p>
//             <input onChange={(e) => setName(e.target.value)} value={name} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="text" required />
//           </div>
//         )}

//         <div className="w-full ">
//           <p>Email</p>
//           <input onChange={(e) => setEmail(e.target.value)} value={email} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="email" required />
//         </div>

//         <div className="w-full ">
//           <p>Password</p>
//           <input onChange={(e) => setPassword(e.target.value)} value={password} placeholder="type here" className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500" type="password" required />
//         </div>

//         {state === "register" ? (
//           <p>
//             Already have account? <span onClick={() => setState("login")} className="text-indigo-500 cursor-pointer">click here</span>
//           </p>
//         ) : (
//           <p>
//             Create an account? <span onClick={() => setState("register")} className="text-indigo-500 cursor-pointer">click here</span>
//           </p>
//         )}

//         <button type="submit" className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
//           {state === "register" ? "Create Account" : "Login"}
//         </button>
//       </form>
//     </div>
//   )
// }

// export default Login;
