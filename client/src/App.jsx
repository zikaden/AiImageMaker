import React from 'react';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import CreatePost from './pages/CreatePost';
import Home from './pages/Home';
import logo from "./assets/logo.png"



const App = () => (

  <BrowserRouter>
    <header className="w-full flex justify-between items-center bg-[#ecebe7] sm:px-8 px-4 py-4 shadow">
      <Link to="/">
        <img src={logo} alt="logo" className="w-28 object-contain" />
      </Link>
      <Link to="/create-post" className="font-inter font-medium bg-black text-white px-4 py-2 rounded-md shadow hover:cursor-pointer">Create</Link>
    </header>
    <main className='sm:p-8 px-4 py-8 w-full bg-white min-h-[calc(100vh-73px)]'>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create-post" element={<CreatePost />}></Route>
      </Routes>
    </main>
  </BrowserRouter>
);

export default App;
