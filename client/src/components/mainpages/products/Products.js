import React, { useContext } from 'react'
import { GlobalState } from '../../../contexts/GlobalState'
import ProductItem from './ProductItem'

const Products = () => {

    const state = useContext(GlobalState)
    const [products] = state.productsContext.products
    console.log(products)
    return (
        <div className='products'>
            {
                products.map(product => (<ProductItem key={product._id} product={product} />))
            }
        </div>
    )
}

export default Products
