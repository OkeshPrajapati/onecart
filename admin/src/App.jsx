// import React, { useContext } from 'react'
// import { Route, Routes } from 'react-router'
// import Home from './pages/Home'
// import Add from './pages/Add'
// import Lists from './pages/Lists'
// import Order from './pages/Order'
// import AdminLogin from './pages/AdminLogin'
// import { adminDataContext } from './context/AdminContext'



// const App = () => {
//   let {adminData} = useContext(adminDataContext)
//   return (
//     <>
//     {!adminData ? <AdminLogin/> : <>
//     <Routes>
  
//       <Route path='/' element={<Home/>}/>
//       <Route path='/admin/add-item' element={<Add/>}/>
//       <Route path='/admin/item-list' element={<Lists/>}/>
//       <Route path='/admin/order-views' element={<Order/>}/>
//       <Route path='/login' element={<AdminLogin/>}/>
//     </Routes>
//     </>
// }
//     </>
//   )

// }

// export default App


import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Add from "./pages/Add";
import Lists from "./pages/Lists";
import Order from "./pages/Order";
import AdminLogin from "./pages/AdminLogin";
import { adminDataContext } from "./context/AdminContext";
import AdminLayout from "./layout/AdminLayout";

const App = () => {
  let { adminData } = useContext(adminDataContext);

  return (
    <>
      {!adminData ? (
        <AdminLogin />
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Admin Layout Wrapper */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="add-item" element={<Add />} />
            <Route path="item-list" element={<Lists />} />
            <Route path="order-views" element={<Order />} />
          </Route>

          <Route path="/login" element={<AdminLogin />} />
        </Routes>
      )}
    </>
  );
};

export default App;