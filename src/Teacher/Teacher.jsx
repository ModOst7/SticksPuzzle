import React from 'react';
import { useSpring, animated } from 'react-spring'


const Teacher = () => {
  //const AnimatedImage = animated(Image);
  const props = useSpring({ to: { opacity: 1 }, from: { opacity: 0 }, delay: 1000 })
    return (
    <animated.img style={props} src='./zh.png' width={window.innerWidth/8} />
    )
  };

  export default Teacher;