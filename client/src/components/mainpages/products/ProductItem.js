import React from 'react';
import { Link } from 'react-router-dom';

const ProductItem = ({ product }) => {
    return (
        <div className="product_card">
            <img src={product.images.url} alt="product" />
            <div className="product_box">
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <div className="row_btn">
                <Link className='btn_buy' to='#!'>
                    Buy
                </Link>

                <Link className='btn_view' to={`/product/${product._id}`}>
                    View
                </Link>
            </div>
        </div>

    )
};

export default ProductItem;
