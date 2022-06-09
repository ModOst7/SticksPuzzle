/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */

import './index.css';

import React, {Component, useRef} from 'react';
import {createRoot} from 'react-dom/client';
import {Stage, Layer, Circle, Text, Line, Group} from 'react-konva';
import {useSpring, useChain, animated} from 'react-spring';

import Teacher from './Teacher/Teacher';
import SticksPuzzle from './SticksPuzzle/SticksPuzzle';


const App = () => {
  const props = useSpring({to: {opacity: 1, top: '0%', left: '16%'}, from: {opacity: 0, top: '20%', left: '16%'}, delay: 2500});
  const [stepTitle, setStepTitle] = React.useState('Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.');
  const [screenVisible, setScreenVisible] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const screenRef = useRef(null);

  const nextStep = (n) => setStep(n);
  const nextTitle = (text) => setStepTitle(text);
  const toggleScreenVisible = (vis) => setScreenVisible(vis);

  const propsWhiteScreen = useSpring({
    to: screenVisible? [
      {display: 'flex'},
      {opacity: 1},
    ] : [
      {opacity: 0},
      {display: 'none'},
    ],
  },
  );

  function exerciseCoplete() {
    // screenRef.current.className = '';
    screenRef.current.textContent = 'Все задания выполнены!';
    console.log(screenRef.current.textContent);
  }

  return <>
    <animated.div className='whiteScreen' style={propsWhiteScreen}><span ref={screenRef}>Выполнено</span></animated.div>
    <Teacher step = {step} stepTitle = {stepTitle} />
    <animated.div className={'stage-container'} style={props}>
      <SticksPuzzle exerciseCoplete = {exerciseCoplete} screen = {screenVisible} toggleVisibility = {toggleScreenVisible} step = {step} toNextStep = {nextStep} stepTitle = {stepTitle} toNextTitle = {nextTitle} />
    </animated.div>
  </>;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
