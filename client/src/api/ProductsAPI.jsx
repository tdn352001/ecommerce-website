import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { apiUrl } from '../contexts/Constants'

const ProductsAPI = () => {
    const [gettingProduct, setGettingProduct] = useState(false)
    const [products, setProducts] = useState([])
    const [callback, setCallback] = useState(false)
    const [filters, setFilters] = useState({
        category: '',
        sort: '',
        keyWord: '',
        page: 1,
        result: 0
    })


    const getProducts = useCallback(() => {
        setGettingProduct(true)
        axios.get(`${apiUrl}/api/products?limit=${filters.page * 12}&${filters.category}&${filters.sort}&title[regex]=${filters.keyWord}`)
            .then(res => {
                setProducts(res.data.products)
                setGettingProduct(false)
                setFilters(prev => ({
                    ...prev,
                    result: res.data.result
                }))
                return res.data.products
            })

    }, [filters.category, filters.sort, filters.keyWord, filters.page])

    const deleteProduct = async (id, public_id, token) => {
        try {
            await axios.post(`${apiUrl}/api/destroy`, { public_id: public_id },
                {
                    headers: { Authorization: token }
                })

            await axios.delete(`${apiUrl}/api/products/${id}`, {
                headers: { Authorization: token }
            })
            getProducts()

            return {
                message: 'Product deleted'
            }
        }
        catch (error) {
            return { error }
        }
    }

    useEffect(() => {
        getProducts()
    }, [getProducts])

    return {
        products: {
            gettingProduct,
            setGettingProduct,
            products,
            setProducts,
            getProducts,
            deleteProduct,
            filters,
            setFilters,
            callback,
            setCallback
        }
    }
};

export default ProductsAPI;
