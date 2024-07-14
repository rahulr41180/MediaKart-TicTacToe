
import React, { useState, useEffect } from 'react';
import './App.css';
import "./CSS/styles.css";
import { FunctionalityComponent } from './Components/FunctionalityComponent';

const App = () => {
  return (
    <div className="container">
      <img src="https://d1uy1wopdv0whp.cloudfront.net/sticky_images/britannia/britannia-logo-combined.png" alt="" className="app_logo" />
      <FunctionalityComponent />
    </div>
  );
};

export default App;