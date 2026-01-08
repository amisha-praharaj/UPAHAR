import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import { Toaster } from "react-hot-toast"
import Login from './components/Login'
import { useAppContext } from './context/AppContext'
import Footer from './components/Footer'
import AllProducts from './pages/AllProducts'
import Contact from './pages/Contact'
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'
import MyOrders from './pages/myOrders'
import SellerLogin from './components/seller/SellerLogin'
import SellerLayout from './pages/seller/SellerLayout'
import AddProduct from './pages/seller/AddProduct'
import ProductList from './pages/seller/ProductList'
import Order from './pages/seller/Order'






const App = () => {

  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin, isSeller } = useAppContext();

  return (
    <div className='text-default min-h-screen text-black-700 bg-[#b392ac]'>
      {isSellerPath ? null : <Navbar />}
      {showUserLogin ? <Login /> : null}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px-24 xl:px-32"}`}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/add-Address" element={<AddAddress />} />
          <Route path="myorders" element={<MyOrders />} />
          <Route path='/seller' element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route path="/seller/product/add" element={<AddProduct />} />

            <Route index element={isSeller ? <AddProduct /> : null} />
            <Route path='product-list' element={<ProductList />} />
            <Route path='orders' element={<Order />} />
          </Route>

        </Routes>

      </div>
      {!isSellerPath && <Footer />}
    </div>
  )
}

export default App