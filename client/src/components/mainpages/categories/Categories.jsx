import axios from 'axios'
import React, { useContext, useState } from 'react'

import { GlobalState } from '../../../contexts/GlobalState'

const Categories = () => {

    const { categoryContext, token: [token] } = useContext(GlobalState)
    const {
        category: { categories, setCategories }
    } = categoryContext

    const [category, setCategory] = useState('')
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')

    const createCategory = async (e) => {
        e.preventDefault()
        try {
            if (onEdit) {
                await axios.put(`/api/category/${id}`, { name: category }, {
                    headers: { Authorization: token }
                })
                const updatedCategories = categories.map(item => {
                    if (item._id === id) {
                        item.name = category
                    }
                    return item
                })
                setCategories(updatedCategories)
                alert('Updated Successfully')
                setOnEdit(false)
            }
            else {
                const res = await axios.post('/api/category', { name: category }, {
                    headers: { Authorization: token }
                })
                const newCategory = res.data.category
                setCategories([...categories, newCategory])
            }
            setCategory('')
        }
        catch (error) {
            alert(error.response.data.message)
        }


    }

    const editCategory = async (id, name) => {
        setID(id)
        setCategory(name)
        setOnEdit(true)
    }

    const deleteCategory = async (id) => {
        try {
            if (window.confirm('Are you sure you want to delete this category?')) {
                await axios.delete(`/api/category/${id}`, {
                    headers: { Authorization: token }
                })
                const updatedCategories = categories.filter(item => item._id !== id)
                setCategories(updatedCategories)
                alert('Deleted Successfully')
            }
        }
        catch (error) {
            alert(error.response.data.message)
        }

    }

    return (
        <div className='categories'>
            <form onSubmit={createCategory}>
                <label htmlFor='category'>Category</label>
                <input type='text' name='category' id='category' value={category} onChange={(e) => setCategory(e.target.value)} required />

                <button type='submit'>{onEdit ? 'Update' : 'Create'}</button>
            </form>

            <div className='col'>
                {
                    categories.map((item) => (
                        <div className='row' key={item._id}>
                            <p>{item.name}</p>
                            <div>
                                <button onClick={() => editCategory(item._id, item.name)}>Edit</button>
                                <button onClick={() => deleteCategory(item._id)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Categories