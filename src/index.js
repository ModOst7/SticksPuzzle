/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import './index.css';

import React, {Component} from 'react';
import {createRoot} from 'react-dom/client';
import {Stage, Layer, Circle, Text, Line, Group} from 'react-konva';
import {useSpring, useChain, animated} from 'react-spring';

import Teacher from './Teacher/Teacher';
import SticksPuzzle from './SticksPuzzle/SticksPuzzle';

const stepsTitle = {
  1: 'Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.',
  2: 'Сост222чкам, а левая и правая – 2.',
};

const App = () => {
  const props = useSpring({to: {opacity: 1}, from: {opacity: 0}, delay: 2500});
  const [stepTitle, setStepTitle] = React.useState('Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.');
  const [screenVisible, setScreenVisible] = React.useState(false);
  const [step, setStep] = React.useState(1);

  const nextStep = (n) => setStep(n);

  return <>
    <animated.div className='whiteScreen'></animated.div>
    <Teacher title = {stepTitle} />
    <animated.div style={props}>
      <SticksPuzzle screen = {screenVisible}/>
    </animated.div>
  </>;
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
