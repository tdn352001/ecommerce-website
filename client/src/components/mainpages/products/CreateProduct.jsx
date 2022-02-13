import React, { useState, useContext, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from "react-router-dom"

import { GlobalState } from '../../../contexts/GlobalState'
import Loading from '../utils/loading/Loading'
import { apiUrl } from '../../../contexts/Constants'


const initialProductState = {
    product_id: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
}

const CreateProduct = () => {

    const {
        productsContext: {
            products: {
                products,
                getProducts
            }
        },
        categoryContext: {
            category: { categories }
        },
        userContext: {
            admin: { isAdmin }
        },
        token: [token]

    } = useContext(GlobalState)

    const [product, setProduct] = useState(initialProductState)
    const [images, setImages] = useState(false)
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const params = useParams()

    const styleUpload = {
        display: images ? 'block' : 'none',
    }

    const handleUpload = async (e) => {
        e.preventDefault()
        try {
            if (!isAdmin) {
                return alert("You're not an admin")
            }

            const file = e.target.files[0]

            if (!file) {
                return alert('File not exists')
            }

            if (file.size > 1024 * 1024) {
                return alert('Size too large')
            }

            if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
                return alert('File format is incorrect')
            }

            const formData = new FormData()
            formData.append('file', file)

            setLoading(true)

            const res = await axios.post(`${apiUrl}/api/upload`, formData, {
                headers: {
                    'content-type': 'multipart/form-data',
                    Authorization: token
                }
            })
            setLoading(false)
            setImages(res.data.data)
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }

    const handleDestroy = async () => {
        try {
            if (!isAdmin) {
                return alert("You're not an admin")
            }

            setLoading(true)
            await axios.post(`${apiUrl}/api/destroy`, { public_id: images.public_id }, {
                headers: { Authorization: token }
            })
            setLoading(false)
            setImages(false)
        }
        catch (error) {
            alert(error.response.data.message)
            console.log({ error })
            setLoading(false)
        }
    }

    const handleChangeInput = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {
            if (!isAdmin) {
                return alert("You're not an admin")
            }

            if (!images) {
                return alert("No image upload")
            }

            if (product._id) {
                await axios.put(`${apiUrl}/api/products/${product._id}`, {
                    ...product,
                    images,
                }, {
                    headers: { Authorization: token }
                })
            }
            else {
                await axios.post(`${apiUrl}/api/products`, {
                    ...product,
                    images,
                }, {
                    headers: { Authorization: token }
                })

            }


            setImages(false)
            setProduct(initialProductState)
            await getProducts()
            navigate('/')

        }
        catch (error) {
            alert(error.response.data.message)
        }
    }


    useEffect(() => {
        if (params.id) {
            products.forEach(item => {
                if (item._id === params.id) {
                    setProduct(item)
                    setImages(item.images)
                    return
                }
            })
        }
        else {
            setProduct(initialProductState)
            setImages(false)
        }
    }, [params.id, products])

    return (
        <div className='create_product'>
            <div className='upload'>
                <input type='file' name='file' id='file_up' onChange={handleUpload} />

                <div id='file_img' style={loading ? null : styleUpload}>
                    {
                        loading ?
                            <Loading />
                            :
                            <>
                                <img src={images ? images.url : ''} alt='' />
                                <span onClick={handleDestroy}>X</span>
                            </>
                    }
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className='row'>
                    <label htmlFor='product_id'>Product ID</label>
                    <input type='text' name='product_id' id='product_id' required
                        value={product.product_id} onChange={handleChangeInput} disabled={product._id}
                    />
                </div>

                <div className='row'>
                    <label htmlFor='title'>Title</label>
                    <input type='text' name='title' id='title' required
                        value={product.title} onChange={handleChangeInput}
                    />
                </div>

                <div className='row'>
                    <label htmlFor='price'>Price</label>
                    <input type='number' name='price' id='price' required
                        value={product.price} onChange={handleChangeInput}
                    />
                </div>
                <div className='row'>
                    <label htmlFor='description'>Description</label>
                    <textarea type='text' name='description' id='description' required
                        value={product.description} rows="5" onChange={handleChangeInput}
                    />
                </div>
                <div className='row'>
                    <label htmlFor='content'>Content</label>
                    <textarea type='text' name='content' id='content' required
                        value={product.content} rows="7" onChange={handleChangeInput}
                    />
                </div>

                <div className='row'>
                    <label htmlFor='category'>Content</label>
                    <select name='category' id='category' value={product.category}
                        onChange={handleChangeInput}
                    >
                        <option value=''>Select a category</option>
                        {
                            categories.map(item => (
                                <option value={item._id} key={item._id}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </div>
                <button type='submit'>{product._id ? 'Update' : 'Create'}</button>

            </form>
        </div>
    )
}

export default CreateProduct