import React, { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Products from './pages/Products'
import About from './pages/About'
import Contact from './pages/Contact'
import Cart from './pages/Cart'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import axios from 'axios'
import Footer from './components/Footer'
import SingleProduct from './pages/SingleProduct'
import CategoryProduct from './pages/CategoryProduct'
import { useCart } from './context/CartContext'
import Protectedroute from './components/Protectedroute'

const App = () => {

  const [location, setLocation] = useState()
  const [openDropDown, setOpenDropDown] = useState(false)
  const { cartItem, setCartItem } = useCart()


  const getLocation = async () => {
    navigator.geolocation.getCurrentPosition(async pos => {
      const { latitude, longitude } = pos.coords
      // console.log(latitude)
      // console.log(longitude)

      const url = `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`

      try {
        const location = await axios.get(url)
        const exactLocation = location.data.address
        setLocation(exactLocation)
        setOpenDropDown(false)
        // console.log(exactLocation)

      } catch (error) {
        console.log(error)
      }

    })
  }

  useEffect(() => {
    getLocation()
  }, [])

  // Load cart From Local storage on initial Render
  useEffect(() => {
    const storedCart = localStorage.getItem('cartItem')
    if (storedCart) {
      setCartItem(JSON.parse(storedCart))
    }
  }, []);

  // save Cart to Local Storage
  useEffect(() => {
    localStorage.setItem('cartItem', JSON.stringify(cartItem))

  }, [cartItem])

  return (

    <BrowserRouter>
      <Navbar location={location} getLocation={getLocation} openDropDown={openDropDown} setOpenDropDown={setOpenDropDown} />
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='products' element={<Products />}></Route>
        <Route path='/products/:id' element={<SingleProduct />}></Route>
        <Route path='/category/:category' element={<CategoryProduct />}></Route>
        <Route path='about' element={<About />}></Route>
        <Route path='contact' element={<Contact />}></Route>
        <Route path='cart' element={<Protectedroute><Cart location={location} getLocation={getLocation} /></Protectedroute>}></Route>
      </Routes>
      <Footer />
    </BrowserRouter>

  )
}

export default App