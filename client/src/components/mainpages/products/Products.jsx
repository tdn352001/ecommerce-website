import React, { useContext } from 'react'

import { GlobalState } from '../../../contexts/GlobalState'
import ProductItem from './ProductItem'
import Loading from '../utils/loading/Loading'


const Products = () => {

    const { productsContext, userContext } = useContext(GlobalState)
    const [products] = productsContext.products
    const { isAdmin } = userContext.admin

    return (
        <>
            <div className='products'>
                {
                    products.map(product => (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                        />
                    ))
                }
            </div>
            {
                products.length === 0 &&
                <Loading />
            }
        </>
    )
}

export default Products
