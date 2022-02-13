import React, { useContext, memo, useRef, useEffect } from 'react'
import { GlobalState } from '../../../contexts/GlobalState'



const Filters = ({ setIsTyping }) => {

    const { productsContext: {
        products: { filters, setFilters }
    },
        categoryContext: {
            category: { categories }
        },
    } = useContext(GlobalState)


    const handleChangFilters = (e) => {
        console.log(e.target.value)
        setFilters(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const searchInput = useRef()


    useEffect(() => {
        searchInput.current.onfocus = () => setIsTyping(true)
        searchInput.current.onblur = () => setIsTyping(false)
    }, [setIsTyping])

    return (
        <div className="filter_menu">
            <div className="row">
                <span>Filters: </span>
                <select name="category" value={filters.category} onChange={handleChangFilters}>
                    <option value="">All Products</option>
                    {
                        categories.map(category => (
                            <option key={category._id} value={`category=${category._id}`}>
                                {category.name}
                            </option>
                        ))
                    }
                </select>
            </div>

            <input type="text" name="keyWord" id="keyWord" placeholder="Enter your search!"
                value={filters.keyWord} onChange={handleChangFilters} ref={searchInput} />

            <div className="row">
                <span>Sort By: </span>
                <select name="sort" value={filters.sort} onChange={handleChangFilters}>
                    <option value="">Newest</option>
                    <option value="sort=oldest">Oldest</option>
                    <option value="sort=-price">Price: High - Low</option>
                    <option value="sort=price">Price: Low - High</option>
                </select>
            </div>
        </div>
    )
}

export default memo(Filters)