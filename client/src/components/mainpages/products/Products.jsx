import React, { useContext, useState } from 'react'

import { GlobalState } from '../../../contexts/GlobalState'
import ProductItem from './ProductItem'
import Loading from '../utils/loading/Loading'
import Filters from './Filters'
import LoadMore from './LoadMore'


const Products = () => {

    const { productsContext, userContext, token: [token] } = useContext(GlobalState)
    const { gettingProduct, setGettingProduct, products, setProducts, getProducts, deleteProduct, filters } = productsContext.products
    const { isAdmin } = userContext.admin

    const [isChecked, setIsChecked] = useState(false)
    const [isTyping, setIsTyping] = useState(false)

    const checkProduct = (id) => {
        let checkedCount = 0
        const updatedProducts = products.map(product => {
            if (product._id === id) {
                product.checked = !product.checked
            }
            if (product.checked) {
                checkedCount++;
            }

            return product
        })

        const isSelectedAll = checkedCount === products.length
        setIsChecked(isSelectedAll)
        setProducts(updatedProducts)
    }

    const handleSelectAll = () => {
        const newProducts = products.map(product => {
            product.checked = !isChecked
            return product
        })

        setProducts(newProducts)
        setIsChecked(!isChecked)
    }

    const deleteAll = async () => {
        setGettingProduct(true)
        products.forEach(async item => {
            if (item.checked) {
                await deleteProduct(item._id, item.images.public_id, token)
            }
        })
        await getProducts()
    }


    if (gettingProduct && !isTyping) {
        return (<>
            <div><Loading /></div>
        </>)
    }

    return (
        <>
            <Filters setIsTyping={setIsTyping} />
            {
                isAdmin && (
                    <div className="delete-all">
                        <label htmlFor="select_all">Select all</label>
                        <input type="checkbox" name="select_all" id="select_all"
                            checked={isChecked} onChange={handleSelectAll}
                        />
                        <button onClick={deleteAll}>Delete All</button>
                    </div>
                )
            }


            <div className='products'>
                {
                    products.map(product => (
                        <ProductItem
                            key={product._id}
                            product={product}
                            isAdmin={isAdmin}
                            checkProduct={checkProduct}
                        />
                    ))
                }
            </div>
            <LoadMore />

            {
                products.length === 0 && !gettingProduct ?
                    <h1>No products matched</h1> :
                    null
            }
        </>
    )
}

export default Products
