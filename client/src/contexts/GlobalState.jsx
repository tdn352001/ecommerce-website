import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'
import { ProductsAPI, UsersAPI, CategoriesAPI } from '../api'

import { apiUrl } from './Constants'

export const GlobalState = createContext()

export const DataProvider = ({ children }) => {

    const [token, setToken] = useState('')



    useEffect(() => {

        const firstLogin = localStorage.getItem('firstLogin')
        if (firstLogin) {
            const refreshToken = async () => {
                try {
                    const res = await axios.get(`${apiUrl}/user/refresh_token`)
                    setToken(res.data.accessToken)
                }
                catch (error) {
                    console.log(error.response.data)
                }
            }
            refreshToken()
        }

    }, [])



    const globalState = {
        token: [token, setToken],
        productsContext: ProductsAPI(),
        userContext: UsersAPI(token),
        categoryContext: CategoriesAPI(token)
    }

    return (
        <GlobalState.Provider value={globalState}>
            {children}
        </GlobalState.Provider>
    )
}