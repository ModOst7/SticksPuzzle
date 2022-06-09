/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable no-trailing-spaces */
import React, {useEffect, useRef, useState} from 'react';
import {useSpring, useSpringRef, useChain, animated} from 'react-spring';
import './Teacher.css';

const Teacher = ({stepTitle, step}) => {
  const [show, set] = useState(false);
   const titleRef = useSpringRef();
   const teacherRef = useSpringRef();
   const messageRef = useSpringRef();
  // const AnimatedImage = animated(Image);
  const propsTitle = useSpring({ref: titleRef, to: {left: '0%'}, from: {left: '-70%'}});
  const propsTeacher = useSpring({ref: teacherRef, to: {left: '0%'}, from: {left: '-70%'}});
  const propsMessage = useSpring({ref: messageRef, to: {opacity: 1, transform: 'translate(0px, 0px)'}, from: {opacity: 0, transform: 'translate(-200px, 0px)'}});


  let n = 0;
  const springRef1 = useSpringRef();
  const propsStepSuccess1 = useSpring({
    ref: springRef1,
    loop: (step === 1)? false : () => 4 > n++,
    from: {opacity: 0, color: 'black'},
    to: {opacity: 1, color: 'black'},
    config: {duration: 500},
  });
  /* const springRef2 = useSpringRef();
  const propsStepSuccess2 = useSpring({
    from: {opacity: 0, color: 'red'},
    to: {opacity: 1, color: '#0000aa'},
  }); */
  console.log(springRef1.current);
   useChain([titleRef, teacherRef, messageRef, springRef1]);

  useEffect(() => {
    console.log(stepTitle === 'Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.');
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
