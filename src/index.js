import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import WeatherApp from './Components/WeatherApp';
import Footer from './Components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div>
    <WeatherApp />
    <Footer />
    </div>
);

