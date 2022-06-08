/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import React, {useEffect, useRef, useState} from 'react';
import {useSpring, useSpringRef, useChain, animated} from 'react-spring';
import './Teacher.css';

const stepsTitle = {
  1: 'Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.',
  2: 'Сост222чкам, а левая и правая – 2.',
};

const Teacher = ({stepTitle}) => {
  const [show, set] = useState(false);
   const springRef = useSpringRef();
  // const AnimatedImage = animated(Image);
  const propsTeacher = useSpring({to: {left: '0%'}, from: {left: '-70%'}, delay: 1000});
  const propsMessage = useSpring({to: {opacity: 1}, from: {opacity: 0}, delay: 1500});
  const propsTitle = useSpring({to: {left: '0%'}, from: {left: '-70%'}});
  const propsStep = useSpring({
    ref: springRef,
    to: {opacity: 1}, 
    from: {opacity: 0}, 
    delay: 2000,
  });

  const springRef1 = useSpringRef();
  const propsStepSuccess1 = useSpring({
    ref: springRef1,
    from: {opacity: 0.5, color: 'red'},
    to: {opacity: 1, color: '#aa0000'},
    delay: 2000,
  });
  /* const springRef2 = useSpringRef();
  const propsStepSuccess2 = useSpring({
    from: {opacity: 0, color: 'red'},
    to: {opacity: 1, color: '#0000aa'},
  }); */

  useChain([springRef1]);

  useEffect(() => {
    console.log(stepTitle);
  }, [stepTitle]);

  return (
    <>
      <div className='exercise-title'>
        <animated.h2 style={propsTitle}>Задача-головоломка</animated.h2>
        <animated.h4 style={propsTitle}>Составьте фигуры из указанного количества счетных палочек.</animated.h4>
      </div>
      <div className='teacherContainer'>
        <animated.img className='teacherImg' style={propsTeacher} src='./zh.png' />
        <div>
          <animated.div className='message' style={propsMessage}>
            Для формирования приемов умственных действий (сравнения, обобщения, анализа, систематизации и др.) 
            при работе со способными к математике дошкольниками применяется занимательный материал и развлечения 
            на математическом материале: задачи-головоломки, задачи-шутки (занимательные вопросы), наглядные логические задачи. Давайте попробуем их решить.
            </animated.div>
          <animated.div className='step' style={propsStepSuccess1}>{stepTitle}</animated.div>
        </div>
      </div>
    </>
  );
};


export default Teacher;
