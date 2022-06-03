import React from 'react';
import { useSpring, animated } from 'react-spring'
import './Teacher.css'


const Teacher = () => {
  const [stepTitle, setStepTitle] = React.useState('Составьте прямоугольник, верхняя и нижняя стороны которого будут равны 3 палочкам, а левая и правая – 2.');
  //const AnimatedImage = animated(Image);
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 1000 })
    return (
      <>
      <div className='exercise-title'>
        <animated.h2>Задача-головоломка</animated.h2>
        <animated.h4>Составьте фигуры из указанного количества счетных палочек.</animated.h4>
      </div>
      <div className='teacherContainer'>
        <animated.img className='teacherImg' style={props} src='./zh.png'  />
        <div>
          <animated.div className='message'>Для формирования приемов умственных действий (сравнения, обобщения, анализа, систематизации и др.) при работе со способными к математике дошкольниками применяется занимательный материал и развлечения на математическом материале: задачи-головоломки, задачи-шутки (занимательные вопросы), наглядные логические задачи. Давайте попробуем их решить.</animated.div>
          <div className='step'>{stepTitle}</div>
          </div>
      </div>
      </>
    )
  };

  export default Teacher;