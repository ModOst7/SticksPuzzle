import React from 'react';
import { useSpring, animated } from 'react-spring'
import './Teacher.css'


const Teacher = () => {
  //const AnimatedImage = animated(Image);
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 1000 })
    return (
      <div className='teacherContainer'>
        <animated.img className='teacherImg' style={props} src='./zh.png'  />
        <div className='message'></div>
      </div>
    )
  };

  export default Teacher;