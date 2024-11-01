import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ButtonAppBar from './Component/ButtonAppBar';
import Dashboard from './Component/Dashboard';
import ListComponent from './pages/ListComponent';

function App() {
  return (
    <>
      <BrowserRouter>
        <ButtonAppBar />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/board/:id' element={<ListComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
