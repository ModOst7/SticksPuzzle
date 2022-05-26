import React from 'react';
import useImage from 'use-image';
import { Image } from 'react-konva';

const Teacher = (props) => {
    const [image] = useImage('./zh.png');
    console.log('ss');
    return <Image scaleX={0.3} scaleY={0.3} image={image} />;
  };

  export default Teacher;