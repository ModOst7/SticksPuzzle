import ReactDOM from 'react-dom/client';
import './index.css';

import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle, Text, Line, Group } from 'react-konva';

import Teacher from './Teacher/Teacher';
import SticksPuzzle from './SticksPuzzle/SticksPuzzle';
 
<<<<<<< HEAD

=======
>>>>>>> 0f4333bdfa6066e4ee13477f9d8b53d83015f103




const App = () => {
  return <>
    <Teacher />
    </>
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
