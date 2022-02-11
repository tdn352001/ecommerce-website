import React, { useContext } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'

import Login from './auth/Login'
import Register from './auth/Register'
import Product from './products/Products'
import DetailProduct from './products/DetailProduct'
import Cart from './cart/Cart'
import NotFound from './utils/not_found/NotFound'
import { GlobalState } from '../../contexts/GlobalState'
import OrderHistory from './history/OrderHistory'
import OrderDetail from './history/OrderDetail'
import Categories from './categories/Categories'
import CreateProduct from './products/CreateProduct'

const Pages = () => {

    const { userContext } = useContext(GlobalState)
    const { isLogged } = userContext.logged
    const { isAdmin } = userContext.admin

    return (
        <Routes>
            <Route path='/' element={<Product />} />
            <Route path='/product/:id' element={<DetailProduct />} />
            <Route path='/login' element={
                isLogged ?
                    (<Navigate to='/' />) :
                    (<Login />)
            } />

            <Route path='/register' element={
                isLogged ?
                    (<Navigate to='/' />) :
                    (<Register />)

            } />

            <Route path='/history/:id' element={
                isLogged ?
                    (<OrderDetail />) :
                    (<Navigate to='/' />)

            } />

            <Route path='/history' element={
                isLogged ?
                    (<OrderHistory />) :
                    (<Navigate to='/' />)

            } />

            <Route path='/category' element={
                isAdmin ?
                    (<Categories />) :
                    (<NotFound />)
            } />

            <Route path='/create_product' element={
                isAdmin ?
                    (<CreateProduct />) :
                    (<NotFound />)
            } />

            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    )
}

export default Pages
