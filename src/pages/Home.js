import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';
import Sidebar from './Sidebar';
import './Home.css';

function Home() {
    
    return (
        <div className="home-container">
            <Sidebar />
           
        </div>
    );
}

export default Home;
