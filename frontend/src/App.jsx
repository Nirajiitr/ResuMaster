import React from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import DefaultPage from './pages/DefaultPage'
import HomePage from './pages/HomePage'
const App = () => {
  return (
    <BrowserRouter>
     <Routes>
      <Route path='/' element={<DefaultPage />} />
      <Route path='/home' element={<HomePage />} />
     </Routes>
    </BrowserRouter>
  )
}

export default App