import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'

import { GlobalState } from '../../../contexts/GlobalState'
import PaypalButton from './PayPal'


const Cart = () => {

    const { userContext, token: [token] } = useContext(GlobalState)
    const {
        cart: { cart, setCart },
        callback: { callback, setCallback }
    } = userContext

    const [total, setTotal] = useState(0)



    const addToCart = async (cart) => {
        axios.patch('user/addcart', { cart }, {
            headers: { Authorization: token }
        })
    }

    const increment = (id) => {
        const newCart = []
        cart.forEach(item => {
            if (item._id === id) {
                item.quantity += 1
            }
            newCart.push(item)
        })
        setCart(newCart)
        addToCart(newCart)
    }

    const decrement = (id) => {
        cart.forEach(item => {
            if (item._id === id) {
                if (item.quantity > 1) {
                    item.quantity -= 1
                }
            }
        })
        setCart([...cart])
        addToCart(cart)
    }

    const removeProduct = (id) => {
        if (window.confirm('Do you want to delete this product?')) {
            cart.forEach((item, index) => {
                if (item._id === id) {
                    cart.splice(index, 1)
                }
            })
            setCart([...cart])
            addToCart()
        }
    }

    const tranSuccess = async (payment) => {
        const { paymentID, address } = payment
        await axios.post('/api/payment', { cart, paymentID, address }, {
            headers: { Authorization: token }
        })

        setCart([])
        addToCart([])
        alert('You have successfully placed an order')
        setCallback(!callback)
    }

    useEffect(() => {
        const getTotal = () => {
            const total = cart.reduce((prev, item) => prev + item.price * item.quantity, 0)
            setTotal(total)
        }
        getTotal()
    }, [cart])

    if (cart.length === 0) {
        return (
            <h2 className='cart__empty'>Cart Empty</h2>
        )
    }

    return (
        <div>
            {
                cart.map(product => (
                    <div className='detail cart' key={product._id}>
                        <img src={product.images.url} alt='thumbnail' className='img_container' />
                        <div className='box-detail'>
                            <h2>{product.title}</h2>
                            <h3>$ {product.price * product.quantity}</h3>
                            <p>{product.description}</p>
                            <p>{product.content}</p>
                            <div className='amount'>
                                <button className={product.quantity === 1 ? 'btn__disable' : ''} onClick={() => decrement(product._id)}> - </button>
                                <span>{product.quantity}</span>
                                <button onClick={() => increment(product._id)}> + </button>
                            </div>
                            <div className='delete' onClick={() => removeProduct(product._id)}>X</div>
                        </div>
                    </div>
                ))
            }

            <div className='total'>
                <h3>Total: $ {total}</h3>
                <PaypalButton total={total} tranSuccess={tranSuccess} />
            </div>
        </div>
    )
}

export default Cart
