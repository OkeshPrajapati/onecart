import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './pages/Registration'
import Home from './pages/Home'
import Login from './pages/login'
import Navbar from './components/Navbar'
import { userDataContext } from './context/userContext'
import About from './pages/About'
import Collections from './pages/Collections'
import Product from './pages/Product'
import Contact from './pages/Contact'
import { useLocation } from 'react-router-dom';
import { Navigate } from "react-router-dom";
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import PlaceOrder from './pages/PlaceOrder'
import MyOrders from './pages/MyOrders'

const App = () => {
  let { userData } = useContext(userDataContext)
  let location = useLocation();

  return (
    <>
      {userData && <Navbar />}
      <Routes>
        <Route path='/login' element={
          userData ?
            (<Navigate to={location.state?.from || "/"} />)
            : (<Login />)
        } />



        <Route path='/register' element={
          userData ? (<Navigate to={location.state?.from ||
            "/"} />)
            : (<Registration />)} />


        <Route path='/'
          element={userData ? <Home /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />



        <Route path='/about'
          element={userData ? <About /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />



        <Route path='/collections'
          element={userData ? <Collections /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

        <Route path='/product'
          element={userData ? <Product /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

        <Route path='/contact'
          element={userData ? <Contact /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

        <Route path='/productdetail/:id'
          element={userData ? <ProductDetail /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

        <Route path='/cart'
          element={userData ? <Cart /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

        <Route path='/placeorder'
          element={userData ? <PlaceOrder /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />


            <Route path='/orders'
          element={userData ? <MyOrders /> : <Navigate to="/login" state=
            {{ from: location.pathname }} />} />

      </Routes>
    </>
  )
}

export default App
