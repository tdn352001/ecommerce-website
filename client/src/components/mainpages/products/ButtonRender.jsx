import axios from 'axios';
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { GlobalState } from '../../../contexts/GlobalState'


const ButtonRender = ({ product, setLoading }) => {

    const {
        userContext: {
            admin: { isAdmin },
            cart: { addCart }
        },
        token: [token],
        productsContext: {
            products: { deleteProduct }
        }
    } = useContext(GlobalState)



    const handleDeleteProduct = async (e) => {
        e.preventDefault()
        if (window.confirm('Are you sure you want to delete this product?')) {
            setLoading(true)
            await deleteProduct(product._id, product.images.public_id, token)
            setLoading(false)
        }
    }

    return (
        <div className='row_btn'>
            {
                isAdmin ? (
                    <>
                        <Link className='btn_buy' to='#!' onClick={handleDeleteProduct}>
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
