import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import Header from './components/headers/Header'
import Pages from './components/mainpages/Pages'
import { DataProvider } from './contexts/GlobalState'
import './assets/css/App.css';

const App = () => {
    return (
        <DataProvider>
            <Router>
                <div className='App'>
                    <Header />
                    <Pages />
                </div>
            </Router>
        </DataProvider>
    )
}

export default App
