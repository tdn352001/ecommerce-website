import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios'

import { GlobalState } from '../../../contexts/GlobalState'

const OrderHistory = () => {

    const { userContext, token: [token] } = useContext(GlobalState)
    const { history: { history, setHistory }, admin: { isAdmin } } = userContext


    useEffect(() => {
        if (token) {
            const getHistory = async () => {
                try {
                    if (isAdmin) {
                        const res = await axios.get('/api/payment', {
                            headers: { Authorization: token }
                        })
                        setHistory(res.data.payments)
                    } else {
                        const res = await axios.get('/user/history', {
                            headers: { Authorization: token }
                        })
                        setHistory(res.data.history)
                    }
                }
                catch (error) {
                    console.log({ error: error.response.data.message })
                }

            }
            getHistory()
        }
    }, [token, isAdmin, setHistory])

    return (
        <div className='history-page'>
            <h2>History</h2>

            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Payment ID</th>
                        <th>Date of Purchased</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(item => (
                            <tr key={item._id}>
                                <td>{item.paymentID}</td>
                                <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/history/${item._id}`}>
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
};

export default OrderHistory