import React from 'react'
import { Routes,Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Cart from './screens/Cart/Cart'
import PlaceOrder from './screens/PlaceOrder/PlaceOrder'
import Home from './screens/Home/Home'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import {ToastContainer} from 'react-toastify'
import Verify from './screens/Verify/Verify'
import MyOrders from './screens/MyOrders/MyOrders'

const App = () => {
  const [showLogin,setShowLogin] = React.useState(false);
  return (
    <>
    <ToastContainer/>
    {showLogin ? <LoginPopup setShowLogin={setShowLogin}/> : <></>}
    <div className='app'>
      <Navbar showLogin={showLogin} setShowLogin={setShowLogin}/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/cart' element={<Cart/>}></Route>
        <Route path='/order' element={<PlaceOrder/>}></Route>
        <Route path='verify' element={<Verify/>}></Route>
        <Route path='/myorders' element={<MyOrders/>}></Route>
      </Routes>
    </div>
    <Footer/>
    </>
  )
}

export default App