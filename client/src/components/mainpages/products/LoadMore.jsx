import React, { useContext } from 'react'
import { GlobalState } from '../../../contexts/GlobalState'




const LoadMore = () => {
    const { productsContext: {
        products: { filters, setFilters }
    },
    } = useContext(GlobalState)


    return (
        <div className="load_more">
            {
                filters.result < filters.page * 12 ? '' :
                    (
                        <button onClick={() => setFilters({ ...filters, page: filters.page + 1 })}>
                            Load More
                        </button>
                    )
            }
        </div>
    )
}

export default LoadMore