/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable max-len */
/* eslint-disable require-jsdoc */


import React, {useEffect, useState} from 'react';
import {Stage, Layer, Circle, Rect, Text, Line, Group} from 'react-konva';
import './SticksPuzzle.css';


const stickLength = 80;
const circRadius = 10;

const step_1 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: (i > 5)? 90 : 0,
  point2_x: (i > 5)? (i*100 + stickLength*Math.cos(Math.PI/180*90)) : (i*100 + stickLength),
  point2_y: (i > 5)? (100 + stickLength*Math.sin(Math.PI/180*90)) : (100),
  isDragging: false,
  color1: '#a45a52',
  color2: '#a45a52',
}));

const step_2 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: i%5*30,
  point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%5)*30),
  point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%5)*30),
  isDragging: false,
  color1: '#a45a52',
  color2: '#a45a52',
}));

const step_4 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: i !== 6? i%5*30 : 0,
  point2_x: i !== 6? (i*100 + stickLength*Math.cos(Math.PI/180*(i%5)*30)) : (i*100 + stickLength),
  point2_y: i !== 6? (100 + stickLength*Math.sin(Math.PI/180*(i%5)*30)) : 100,
  isDragging: false,
  color1: '#a45a52',
  color2: '#a45a52',
}));

const step_5 = [...Array(10)].map((_, i) => {
  if (i === 7) {
    return {
      id: i.toString(),
      point1_x: i*100,
      point1_y: 100,
      rotation: 120,
      point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
      point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
      isDragging: false,
      color1: '#a45a52',
      color2: '#a45a52',
    };
  }
  if (i === 8) {
    return {
      id: i.toString(),
      point1_x: i*100,
      point1_y: 100,
      rotation: 120,
      point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
      point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
      isDragging: false,
      color1: '#a45a52',
      color2: '#a45a52',
    };
  }
  if (i === 9) {
    return {
      id: i.toString(),
      point1_x: i*100,
      point1_y: 100,
      rotation: 120,
      point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
      point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
      isDragging: false,
      color1: '#a45a52',
      color2: '#a45a52',
    };
  }
  return {
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: i%2*60,
    point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*60),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*60),
    isDragging: false,
    color1: '#a45a52',
    color2: '#a45a52',
  };
});

const step_7 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: (i%2)*90,
  point2_x: (i*100 + stickLength*Math.cos(Math.PI/180*((i%2)*90))),
  point2_y: (100 + stickLength*Math.sin(Math.PI/180*((i%2)*90))),
  isDragging: false,
  color1: '#a45a52',
  color2: '#a45a52',
}));


function generateSticks() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    point1_x: 50 + i*100,
    point1_y: 100,
    rotation: i%3*45,
    point2_x: 50 + i*100 + stickLength*Math.cos(Math.PI/180*(i%3)*45),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%3)*45),
    isDragging: false,
    color1: '#a45a52',
    color2: '#a45a52',
  }));
}

const INITIAL_STATE = generateSticks();


const SticksPuzzle = ({exerciseCoplete, screen, toggleVisibility, step, toNextStep, stepTitle, toNextTitle}) => {
  const [sticks, setSticks] = React.useState(step_1);

  // const step = 7;

  const handleDragStart = (e) => {
    const id = e.target.id();
    console.log('id = ' + id);
    setSticks(
        sticks.map((stick) => {
          return {
            ...stick,
          /* color1: stick.id === id? "#999900" : "#666666",
          color2: stick.id === id? "#999900" : "#666666",*/
          };
        }),
    );
  };


  const handleDragEnd = (e) => {
    // const id = e.target.id();
    let tempArr = [...sticks];
    const matrix = [
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];

    tempArr = tempArr.map((stick) => {
      return {
        ...stick,
        color1: '#a45a52',
        color2: '#a45a52',
      };
    });

    sticks.forEach((stick) => {
      sticks.forEach((stick2) => {
        if (stick.id === stick2.id) return;
        if ((Math.abs(stick.point1_x - stick2.point1_x) < circRadius) && (Math.abs(stick.point1_y - stick2.point1_y) < circRadius)) {
          tempArr[stick.id].color1 = '#009900';
          tempArr[stick2.id].color1 = '#009900';
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
        if ((Math.abs(stick.point1_x - stick2.point2_x) < circRadius) && (Math.abs(stick.point1_y - stick2.point2_y) < circRadius)) {
          tempArr[stick.id].color1 = '#009900';
          tempArr[stick2.id].color2 = '#009900';
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
        if ((Math.abs(stick.point2_x - stick2.point1_x) < circRadius) && (Math.abs(stick.point2_y - stick2.point1_y) < circRadius)) {
          tempArr[stick.id].color2 = '#009900';
          tempArr[stick2.id].color1 = '#009900';
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
        if ((Math.abs(stick.point2_x - stick2.point2_x) < circRadius) && (Math.abs(stick.point2_y - stick2.point2_y) < circRadius)) {
          tempArr[stick.id].color2 = '#009900';
          tempArr[stick2.id].color2 = '#009900';
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
      });
    });
    console.log(matrix);
    setSticks(tempArr);

    checkAnswer(step, matrix);
  };

  const handleMove = (e) => {
    const id = e.target.id();

    setSticks(
        sticks.map((stick) => {
          if (id.toString() == stick.id) {
            return {
              ...stick,
              point1_x: stick.id === id? e.target.attrs.x : stick.point1_x,
              point1_y: stick.id === id? e.target.attrs.y : stick.point1_y,
              point2_x: stick.id === id? e.target.attrs.x + stickLength*Math.cos(Math.PI/180*stick.rotation) : stick.point2_x,
              point2_y: stick.id === id? e.target.attrs.y + stickLength*Math.sin(Math.PI/180*stick.rotation) : stick.point2_y,
            };
          }
          return {
            ...stick,
            point1_x: stick.id === id? e.target.attrs.x : stick.point1_x,
            point1_y: stick.id === id? e.target.attrs.y : stick.point1_y,
            point2_x: stick.id === id? e.target.attrs.x + stickLength*Math.cos(Math.PI/180*stick.rotation) : stick.point2_x,
            point2_y: stick.id === id? e.target.attrs.y + stickLength*Math.sin(Math.PI/180*stick.rotation) : stick.point2_y,
          };
        }),
    );
  };

  const checkAnswer = (step, matrix) => {
    let key = false;
    console.log('step = ', step);
    if (step === 1) {
      key = true;
      let sum = 0;
      matrix.forEach(((row) => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        });
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 732) key = false;
      console.log(sum);
      console.log(key);
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_2);
          toggleVisibility(false);
          toNextStep(2);
          toNextTitle('?????????????????? 2 ???????????? ???????????????????????? ???? 5 ??????????????.');
        }, 2000);
      }
    }
    if (step === 2) {
      let sum = 0;
      let sum360 = false;
      key = false;
      matrix.forEach(((row) => {
        let rowSum = 0;
        row.forEach((element) => {
          rowSum = rowSum + element;
          sum = sum + element;
        });
        if (rowSum === 360) sum360 = true;
      }));
      if ((sum === 1084) && sum360) {
        key = true;
        console.log(sum);
        console.log(key);
        setSticks(step_1);
        // step = 3;
      }
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_1);
          toggleVisibility(false);
          toNextStep(3);
          toNextTitle('?????????????????? 2 ???????????? ???????????????? ???? 7 ??????????????.');
        }, 2000);
      }
    }
    if (step === 3) {
      key = false;
      let sum = 0;
      let sum4 = false;
      let sum360 = false;
      matrix.forEach(((row) => {
        let rowSum = 0;
        row.forEach((element) => {
          rowSum = rowSum + element;
          sum = sum + element;
        });
        if (rowSum === 4) sum4 = true;
        if (rowSum === 360) sum360 = true;
      }));
      if ( ((sum === 732) && sum4) || ((sum === 1088) && sum360) ) key = true;
      console.log(sum);
      console.log(key);
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_4);
          toggleVisibility(false);
          toNextStep(4);
          toNextTitle('?????????????????? 3 ???????????? ???????????????????????? ???? 7 ??????????????.');
        }, 2000);
      }
    }
    if (step === 4) {
      key = false;
      let sum = 0;
      let sum123 = false;
      let sum360 = false;
      matrix.forEach(((row) => {
        let rowSum = 0;
        row.forEach((element) => {
          sum = sum + element;
          rowSum = rowSum + element;
        });
        if (rowSum === 123) sum123 = true;
        if (rowSum === 360) sum360 = true;
      }));
      if ((sum === 1452) && sum123 && sum360) key = true;
      console.log(sum);
      console.log(key);
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_5);
          toggleVisibility(false);
          toNextStep(5);
          toNextTitle('?????????????????? 4 ???????????? ???????????????????????? ???? 9 ??????????????.');
        }, 2000);
      }
    }
    if (step === 5) {
      key = false;
      let sum = 0;
      let sum0 = false;
      let fewInRow = false;
      matrix.forEach(((row) => {
        let rowSum = 0;
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems = nonZeroElems + 1;
          sum = sum + element;
          rowSum = rowSum + element;
        });
        if ((nonZeroElems === 2) || (nonZeroElems === 1)) fewInRow = true;
        if (rowSum === 0) sum0 = true;
      }));
      if (((sum === 2058) || (sum === 2534) || (sum === 2535) || (sum === 2355) || (sum === 2712) || (sum === 1938)) && sum0 && !fewInRow) key = true;
      console.log(sum);
      console.log(key);
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_1);
          toggleVisibility(false);
          toNextStep(6);
          toNextTitle('?????????????????? 3 ???????????? ???????????????? ???? 10 ??????????????.');
        }, 2000);
      }
    }
    if (step === 6) {
      key = true;
      let sum = 0;
      matrix.forEach(((row) => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        });
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 1100) key = false;
      console.log(sum);
      console.log(key);
      // if (key) setSticks(step_2);
      if (key) {
        toggleVisibility(true);
        window.setTimeout(() => {
          setSticks(step_7);
          toggleVisibility(false);
          toNextStep(7);
          toNextTitle('?????????????????? 2 ???????????????? ???? 10 ??????????????: ?????????????? ?? ??????????????????.');
        }, 2000);
      }
    }
    if (step === 7) {
      key = true;
      let sum = 0;
      matrix.forEach(((row) => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        });
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 1183) key = false;
      console.log(sum);
      console.log(key);
      // if (key) setSticks(step_2);
      if (key) {
        exerciseCoplete();
        toggleVisibility(true);
        window.setTimeout(() => {
          // setSticks(step_7);
          // toggleVisibility(false);
          // toNextStep(7);
          // toNextTitle('?????????????????? 2 ???????????????? ???? 10 ??????????????: ?????????????? ?? ??????????????????.');
        }, 2000);
      }
    }
  };

  const [stageWidth, setStageWidth] = useState(window.innerWidth);
  const [stageHeight, setStageHeight] = useState(window.innerHeight);
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setStageWidth(window.innerWidth);
      setStageHeight(window.innerHeight);
    }
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures that effect is only run on mount


  return (
    <Stage className='stage' width={stageWidth*0.8} height={stageHeight*0.5} scaleX={window.innerWidth/window.screen.width} scaleY={window.innerWidth/window.screen.width}>
      <Layer className="layer">
        <Rect
          x={20}
          y={20}
          width={1500}
          height={450}
          fill='#eaf5db'
          shadowBlur={10}
          cornerRadius={10}
        />
        {sticks.map((stick) => (
          <Group
            x={stick.point1_x}
            y={stick.point1_y}
            key={stick.id}
            id={stick.id}
            rotation={stick.rotation}
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            onDragMove={handleMove}
          >
            <Line
              points={[0, 0, 0 + stickLength, 0]}
              stroke="#BA8C63"
              lineCap='round'
              lineJoin='round'
              strokeWidth = {5}
              shadowBlur={5}
              hitStrokeWidth = {10}
            />
            <Text
              text={stick.id}
              x={40}
              y={5}
            />
            <Circle
              x={0}
              y={0}
              shadowBlur={2}
              radius={5}
              numPoints={5}
              innerRadius={20}
              outerRadius={stickLength}
              fill={stick.color1}
              opacity={1}
              scaleX={stick.isDragging ? 1.2 : 1}
              scaleY={stick.isDragging ? 1.2 : 1}
            />
            <Circle
              x={0 + stickLength}
              y={0}
              shadowBlur={2}
              radius = {5}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill={stick.color2}
              opacity={1}
              scaleX={stick.isDragging ? 1.2 : 1}
              scaleY={stick.isDragging ? 1.2 : 1}
            />
          </Group>
        ))}
        <Circle
          x={900}
          y={900}
          radius = {100}
          numPoints={5}
          innerRadius={20}
          outerRadius={40}
          fill="#999999"
          opacity={0.8}
          onClick = {() => {
            setSticks(step_7);
          }}
        />
      </Layer>
    </Stage>
  );
};

export default SticksPuzzle;
