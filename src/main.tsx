import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Index from './components/Index.tsx'
import Admin from './components/Admin.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/admin" element={<Admin />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>,
)
