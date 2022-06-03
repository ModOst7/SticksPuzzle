import React from 'react';
import { useSpring, animated } from 'react-spring'
import './Teacher.css'


const Teacher = () => {
  //const AnimatedImage = animated(Image);
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 1000 })
    return (
      <div className='teacherContainer'>
        <animated.img className='teacherImg' style={props} src='./zh.png'  />
        <div className='message'>Для формирования приемов умственных действий (сравнения, обобщения, анализа, систематизации и др.) при работе со способными к математике дошкольниками применяется занимательный материал и развлечения на математическом материале: задачи-головоломки, задачи-шутки (занимательные вопросы), наглядные логические задачи. Давайте попробуем их решить.</div>
      </div>
    )
  };

  export default Teacher;