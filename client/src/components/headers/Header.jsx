import React, { useContext, useState } from 'react'
import { GlobalState } from '../../contexts/GlobalState'
import { Menu, Close, Cart } from '../../assets/icons'
import { Link } from 'react-router-dom'
import axios from 'axios'



const Header = () => {

    const { userContext } = useContext(GlobalState)
    const {
        logged: { isLogged },
        admin: { isAdmin },
        cart: { cart }
    } = userContext

    const [menu, setMenu] = useState(false)


    const logoutUser = async () => {
        try {
            await axios.get('/user/logout')
            localStorage.removeItem('firstLogin')
            window.location.href = '/'
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }

    const adminRouter = () => (
        <>
            <li><Link to='/create_product'>Create Product</Link></li>
            <li><Link to='/category'>Categories</Link></li>
        </>
    )

    const loggedRouter = () => (
        <>
            <li><Link to='/history'>History</Link></li>
            <li><Link to='/' onClick={logoutUser}>Logout</Link></li>
        </>
    )


    const toggleMenu = () => setMenu(!menu)
    const styleMenu = {
        left: menu ? 0 : '-100%'
    }

    return (
        <header>
            <div className='menu' onClick={toggleMenu}>
                <img src={Menu} alt='menu' width='30' />
            </div>

            <div className='logo'>
                <h1>
                    <Link to='/'>{isAdmin ? 'Admin' : 'SD SHOP'}</Link>
                </h1>
            </div>

            <ul style={styleMenu}>
                <li><Link to='/'>{isAdmin ? 'Products' : 'Shop'}</Link></li>
                {
                    isAdmin && adminRouter()
                }

                {
                    isLogged ?
                        loggedRouter() : (
                            <li><Link to='/login'>Login | Register</Link></li>
                        )
                }
                <li onClick={toggleMenu}>
                    <img src={Close} alt='close' width='30' className='menu' />
                </li>
            </ul>

            {
                isAdmin ? null : (
                    <div className='cart-icon'>
                        <span>{cart.length}</span>
                        <Link to='/cart'>
                            <img src={Cart} alt='close' width='30' />
                        </Link>
                    </div>
                )
            }

        </header>
    )
}

export default Header
