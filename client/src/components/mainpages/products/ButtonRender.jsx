import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../contexts/GlobalState'


const ButtonRender = ({ product }) => {

    const { userContext } = useContext(GlobalState)
    const {
        admin: { isAdmin },
        cart: { addCart }
    } = userContext


    return (
        <div className='row_btn'>
            {
                isAdmin ? (
                    <>
                        <Link className='btn_buy' to='#!'>
                            Delete
                        </Link>

                        <Link className='btn_view' to={`/edit_product/${product._id}`}>
                            Edit
                        </Link>
                    </>
                ) : (
                    <>
                        <Link className='btn_buy' to='#!' onClick={() => addCart(product)}>
                            Buy
                        </Link>

                        <Link className='btn_view' to={`/product/${product._id}`}>
                            View
                        </Link>
                    </>
                )
            }
        </div>
    )
};

export default ButtonRender;
