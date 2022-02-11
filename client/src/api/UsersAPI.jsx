import axios from 'axios';
import { useEffect, useState } from 'react'

const UsersAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false)
    const [isAdmin, setIsAdmin] = useState(false)
    const [cart, setCart] = useState([])
    const [history, setHistory] = useState([])
    const [callback, setCallback] = useState(false)

    const addCart = async (product) => {
        if (!isLogged) {
            return alert('Please login to continue buying.')
        }
        let alreadyInCart = false
        const newCart = [...cart]
        for (let item of newCart) {
            if (item._id === product._id) {
                alreadyInCart = true
                item.quantity = item.quantity * 1 + 1
                break
            }
        }

        if (!alreadyInCart) {
            newCart.push({ ...product, quantity: 1 })
        }
        setCart(newCart)
        await axios.patch('/user/addcart', { cart: newCart }, {
            headers: { Authorization: token }
        })
        alert('Product added to cart.')
    }

    useEffect(() => {
        if (token) {
            const getUser = async () => {
                try {
                    const res = await axios.get('/user/information', {
                        headers: { Authorization: token }
                    })
                    setIsLogged(true)
                    setCart(res.data.data.cart)
                    if (res.data.data.role === 1) {
                        setIsAdmin(true)
                    }
                }
                catch (error) {
                    alert(error.response.data.message)
                }
            }
            getUser()
        }
    }, [token])

    return {
        logged: {
            isLogged,
            setIsLogged,
        },
        admin: {
            isAdmin,
            setIsAdmin
        },
        cart: {
            cart,
            setCart,
            addCart
        },
        history: {
            history,
            setHistory
        },
        callback: {
            callback,
            setCallback
        }
    }
};

export default UsersAPI;
