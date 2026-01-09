🎁 UPAHAR – Gift Buying & Selling E-Commerce Website

UPAHAR is a full-stack MERN (MongoDB, Express, React, Node.js) based e-commerce platform designed for buying and selling gifts.
The application supports user authentication, product management, image uploads, and secure backend APIs.

🚀 Tech Stack
Frontend :-
-> React (Vite)
-> JavaScript (ES6+)
-> CSS
-> Axios

Backend:-
-> Node.js
-> Express.js
-> MongoDB (Mongoose)
-> JWT Authentication
-> Express Session

Other Tools & Services:-
-> Cloudinary (Image Upload)
-> MongoDB Atlas
-> dotenv

✨ Features

-> User authentication (JWT & sessions)
-> Product listing and management
-> Image upload using Cloudinary
-> Secure REST APIs
-> Environment-based configuration
-> Responsive UI
-> Seller can add, update, delete the product

🔐 Environment Variables Setup
Backend .env

Create a .env file inside the backend folder:

JWT_SECRET="your_jwt_secret"
NODE_ENV="development"

SELLER_EMAIL="your_email@gmail.com"
SELLER_PASSWORD="your_email_password"

SESSION_SECRET="your_session_secret"

MONGODB_URI="your_mongodb_connection_string"

# Cloudinary
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"

Frontend .env

Create a .env file inside the client folder:

VITE_CURRENCY="$"

VITE_BACKEND_URL="http://localhost:5000"

VITE_IMAGE_URL="http://localhost:5000/uploads"

SESSION_SECRET="your_session_secret"


⚠️ Important:
Never push .env files to GitHub. Add them to .gitignore.

▶️ How to Run the Project Locally
1️⃣ Clone the Repository
git clone https://github.com/your-username/UPAHAR.git
cd UPAHAR

2️⃣ Install Backend Dependencies
cd backend
npm install

3️⃣ Start Backend Server
npm run dev


Backend runs on: http://localhost:5000

4️⃣ Install Frontend Dependencies
cd ../client
npm install

5️⃣ Start Frontend Server
npm run dev


Frontend runs on: http://localhost:5173

🔒 Security Notes

Use strong secrets for JWT and sessions

Keep API keys private

Use environment variables for all sensitive data

Enable CORS properly for production


👩‍💻 Author

Amisha Praharaj
Frontend / MERN Full Stack Developer

📜 License

This project is licensed under the MIT License.
