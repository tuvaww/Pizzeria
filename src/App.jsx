import React from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Home } from './pages/home/Home';
import { Reservation } from './pages/reservation/Reservation';
import { HandleBooking } from './pages/handleBooking/HandleBooking';

function App() {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                        <Route path="/reservation" element={<Reservation />} />
                        <Route path="/handle-booking" element={<HandleBooking/>} />

                    </Route>
                </Routes>
            </BrowserRouter>
        </LocalizationProvider>
    );
}

export default App;
