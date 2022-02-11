import React from 'react';
import ButtonRender from './ButtonRender';

const ProductItem = ({ product, isAdmin }) => {
    return (
        <div className='product_card'>
            {
                isAdmin &&
                (
                    <input type='checkbox' checked={product.checked} onChange={() => { }} />
                )
            }
            <img src={product.images.url} alt='product' />
            <div className='product_box'>
                <h2 title={product.title}>{product.title}</h2>
                <span>${product.price}</span>
                <p>{product.description}</p>
            </div>
            <ButtonRender product={product} />
        </div>

    )
};

export default ProductItem;
