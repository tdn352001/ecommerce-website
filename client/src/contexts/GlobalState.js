import React, { createContext, useState } from 'react'
import ProductsAPI from '../api/ProductsAPI'

export const GlobalState = createContext()


export const DataProvider = ({ children }) => {

    const [token, setToken] = useState('')

    const globalState = {
        token: [token, setToken],
        productsContext: ProductsAPI()
    }

    return (
        <GlobalState.Provider value={globalState}>
            {children}
        </GlobalState.Provider>
    )
}