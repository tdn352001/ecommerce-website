import React, { useContext } from 'react'
import { GlobalState } from '../../contexts/GlobalState'
import { Menu, Close, Cart } from '../../assets/icons'
import { Link } from 'react-router-dom'


const Header = () => {

    const { alo } = useContext(GlobalState)


    return (
        <header>
            <div className="menu">
                <img src={Menu} alt="menu" width='30' />
            </div>

            <div className="logo">
                <h1>
                    <Link to="/">SD SHOP</Link>
                </h1>
            </div>

            <ul>
                <li><Link to="/">Products</Link></li>
                <li><Link to="/login">Login | Register</Link></li>
                <li>
                    <img src={Close} alt="close" width='30' className="menu" />
                </li>
            </ul>

            <div className='cart-icon'>
                <span>0</span>
                <Link to='/cart'>
                    <img src={Cart} alt="close" width='30' />
                </Link>
            </div>

        </header>
    )
}

export default Header
