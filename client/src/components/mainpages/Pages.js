import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import Product from './products/Products'
import DetailProduct from './products/DetailProduct'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'

const Pages = () => {
    return (
        <Routes>
            <Route path='/' element={<Product />} />
            <Route path='/product/:id' element={<DetailProduct />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Pages
