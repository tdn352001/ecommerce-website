
import { useEffect, useState } from 'react'
import axios from 'axios'
import { apiUrl } from '../contexts/Constants'

const CategoriesAPI = (token) => {
    const [categories, setCategories] = useState([])


    useEffect(() => {
        const getCategories = async () => {
            const res = await axios.get(`${apiUrl}/api/category`, {
                headers: { Authorization: token }
            })
            console.log(res.data)
            setCategories(res.data.categories)
        }
        getCategories()
    }, [token])


    return {
        category: {
            categories,
            setCategories
        },
    }
}


export default CategoriesAPI