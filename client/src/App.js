import React from 'react'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
function App() {
    return (
        <BrowserRouter>
        <Routes>
            <Route  path='/' element={<h1>home</h1>}></Route>      
            <Route path="/register"  element={<Register/>}></Route>
            <Route path="/login"  element={<Login/>}></Route>    
            <Route path="/dashboard"  element={<Dashboard/>}></Route> 
        </Routes>       
        </BrowserRouter>
    );
}

export default App;