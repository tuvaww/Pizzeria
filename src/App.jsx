import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/home/Home';
import { Reservation } from './pages/reservation/Reservation';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/reservation' element={<Reservation />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
