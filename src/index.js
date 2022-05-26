import ReactDOM from 'react-dom/client';
import './index.css';

import React, { Component } from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle, Text, Line, Group } from 'react-konva';
import { toBeChecked, toBePartiallyChecked } from '@testing-library/jest-dom/dist/matchers';

 
import Teacher from './Teacher';

const stickLength = 80;
const circRadius = 10;

var step_1 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: (i > 5)? 90 : 0,
  point2_x: (i > 5)? (i*100  + stickLength*Math.cos(Math.PI/180*90)) : (i*100  + stickLength),
  point2_y: (i > 5)? (100 + stickLength*Math.sin(Math.PI/180*90)) : (100),
  isDragging: false,
  color1: "#666666",
  color2: "#666666"
}));

var step_2 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: i%5*30,
  point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%5)*30),
  point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%5)*30),
  isDragging: false,
  color1: "#666666",
  color2: "#666666"
}));

var step_4 = [...Array(10)].map((_, i) => ({
  id: i.toString(),
  point1_x: i*100,
  point1_y: 100,
  rotation: i !== 6? i%5*30 : 0,
  point2_x: i !== 6? (i*100 + stickLength*Math.cos(Math.PI/180*(i%5)*30)) : (i*100 + stickLength),
  point2_y: i !== 6? (100 + stickLength*Math.sin(Math.PI/180*(i%5)*30)) : 100,
  isDragging: false,
  color1: "#666666",
  color2: "#666666"
}));

var step_5 = [...Array(10)].map((_, i) => {
  if (i === 7) return {
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: 120,
    point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }
  if (i === 8) return {
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: 120,
    point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }
  if (i === 9) return {
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: 120,
    point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*120),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*120),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }
  return {
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: i%2*60,
    point2_x: i*100 + stickLength*Math.cos(Math.PI/180*(i%2)*60),
    point2_y: 100 + stickLength*Math.sin(Math.PI/180*(i%2)*60),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }});

  var step_7 = [...Array(10)].map((_, i) => ({
    id: i.toString(),
    point1_x: i*100,
    point1_y: 100,
    rotation: (i%2)*90,
    point2_x: (i*100 + stickLength*Math.cos(Math.PI/180*((i%2)*90))),
    point2_y: (100 + stickLength*Math.sin(Math.PI/180*((i%2)*90))),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }));


function generateSticks() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    point1_x: i*50 + window.innerWidth/5,
    point1_y: i*50 + window.innerWidth/5,
    rotation: i%3*45,
    point2_x: i*50 + window.innerWidth/5 + stickLength*Math.cos(Math.PI/180*(i%3)*45),
    point2_y: i*50 + window.innerWidth/5 + stickLength*Math.sin(Math.PI/180*(i%3)*45),
    isDragging: false,
    color1: "#666666",
    color2: "#666666"
  }));
}

const INITIAL_STATE = generateSticks();




const App = () => {
  const [sticks, setSticks] = React.useState(INITIAL_STATE);
  let step = 7;

  const handleDragStart = (e) => {
    const id = e.target.id();
    console.log("id = " + id);
    setSticks(
      sticks.map((stick) => {
        return {
          ...stick
          /*color1: stick.id === id? "#999900" : "#666666",
          color2: stick.id === id? "#999900" : "#666666",*/
        };
      })
    );
  };


  
  const handleDragEnd = (e) => {
    const id = e.target.id();
    let tempArr = [...sticks];
    let matrix = [
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0,0,0],
    ]

    tempArr = tempArr.map((stick) => {
      return {
        ...stick,
        color1: "#666666",
        color2: "#666666"
      }
    });
    
    sticks.forEach((stick) => {
      sticks.forEach((stick2) => {
        if (stick.id === stick2.id) return;
        if ((Math.abs(stick.point1_x - stick2.point1_x) < circRadius) && (Math.abs(stick.point1_y - stick2.point1_y) < circRadius)) {
          tempArr[stick.id].color1 = "#009900";
          tempArr[stick2.id].color1 = "#009900";
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        } 
        if ((Math.abs(stick.point1_x - stick2.point2_x) < circRadius) && (Math.abs(stick.point1_y - stick2.point2_y) < circRadius)) {
          tempArr[stick.id].color1 = "#009900";
          tempArr[stick2.id].color2 = "#009900";
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
        if ((Math.abs(stick.point2_x - stick2.point1_x) < circRadius) && (Math.abs(stick.point2_y - stick2.point1_y) < circRadius)) {
          tempArr[stick.id].color2 = "#009900";
          tempArr[stick2.id].color1 = "#009900";
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
        if ((Math.abs(stick.point2_x - stick2.point2_x) < circRadius) && (Math.abs(stick.point2_y - stick2.point2_y) < circRadius)) {
          tempArr[stick.id].color2 = "#009900";
          tempArr[stick2.id].color2 = "#009900";
          matrix[stick.id][stick2.id] = stick2.rotation || 1;
        }
      })
    })
    console.log(matrix);
    setSticks(tempArr);

    checkAnswer(step, matrix);
  };

  const handleMove = (e) => {
    const id = e.target.id();

    setSticks(
      sticks.map((stick) => {
        if (id.toString() == stick.id) return {
          ...stick,
          point1_x: stick.id === id? e.target.attrs.x : stick.point1_x,
          point1_y: stick.id === id? e.target.attrs.y : stick.point1_y,
          point2_x: stick.id === id? e.target.attrs.x + stickLength*Math.cos(Math.PI/180*stick.rotation) : stick.point2_x,
          point2_y: stick.id === id? e.target.attrs.y + stickLength*Math.sin(Math.PI/180*stick.rotation) : stick.point2_y
        };
        return {
          ...stick,
          point1_x: stick.id === id? e.target.attrs.x : stick.point1_x,
          point1_y: stick.id === id? e.target.attrs.y : stick.point1_y,
          point2_x: stick.id === id? e.target.attrs.x + stickLength*Math.cos(Math.PI/180*stick.rotation) : stick.point2_x,
          point2_y: stick.id === id? e.target.attrs.y + stickLength*Math.sin(Math.PI/180*stick.rotation) : stick.point2_y,
        };
      })
    );
  }

  const checkAnswer = (step, matrix) => {
    let key = false;

    if (step === 1) {
      key = true;
      let sum = 0;
      matrix.forEach((row => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        })
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 732) key = false;
      console.log(sum)
      console.log(key);
      if (key) setSticks(step_2);
    }
    if (step === 2) {
      let sum = 0;
      let sum360 = false;
      key = false;
      matrix.forEach((row => {
        let rowSum = 0;
        row.forEach((element) => {
          rowSum = rowSum + element;
          sum = sum + element;
        })
        if (rowSum === 360) sum360 = true;
      }));
      if ((sum === 1084) && sum360) {
        key = true;
        console.log(sum)
        console.log(key)
        setSticks(step_1);
        step = 3;
      }
    }
    if (step === 3) {
      key = false;
      let sum = 0;
      let sum4 = false;
      let sum360 = false;
      matrix.forEach((row => {
        let rowSum = 0;
        row.forEach((element) => {
            rowSum = rowSum + element;
            sum = sum + element;
          })
        if (rowSum === 4) sum4 = true;
        if (rowSum === 360) sum360 = true;
      }));
      if ( ((sum === 732) && sum4) || ((sum === 1088) && sum360) ) key = true;
      console.log(sum)
      console.log(key);
    }
    if (step === 4) {
      key = false;
      let sum = 0;
      let sum123 = false;
      let sum360 = false;
      matrix.forEach((row => {
        let rowSum = 0;
        row.forEach((element) => {
          sum = sum + element;
          rowSum = rowSum + element;
        })
      if (rowSum === 123) sum123 = true;
      if (rowSum === 360) sum360 = true;
      }));
      if ((sum === 1452) && sum123 && sum360) key = true;
      console.log(sum);
      console.log(key);
    }
    if (step === 5) {
      key = false;
      let sum = 0;
      let sum0 = false;
      let fewInRow = false;
      matrix.forEach((row => {
        let rowSum = 0;
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems = nonZeroElems + 1;
          sum = sum + element;
          rowSum = rowSum + element;
        })
      if ((nonZeroElems === 2) || (nonZeroElems === 1)) fewInRow = true;
      if (rowSum === 0) sum0 = true;
      }));
      if (((sum === 2058) || (sum === 2534) || (sum === 2535) || (sum === 2355) || (sum === 2712) || (sum === 1938)) && sum0 && !fewInRow) key = true;
      console.log(sum);
      console.log(key);
    }
    if (step === 6) {
      key = true;
      let sum = 0;
      matrix.forEach((row => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        })
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 1100) key = false;
      console.log(sum)
      console.log(key);
      //if (key) setSticks(step_2);
    }
    if (step === 7) {
      key = true;
      let sum = 0;
      matrix.forEach((row => {
        let nonZeroElems = 0;
        row.forEach((element) => {
          if (element !== 0) nonZeroElems+=1;
          sum = sum + element;
        })
        if (nonZeroElems < 2) key = false;
      }));
      if (sum !== 1183) key = false;
      console.log(sum)
      console.log(key);
      //if (key) setSticks(step_2);
    }

  }

  return (
    <Stage width={window.innerWidth} height={window.innerHeight} scaleX={1} scaleY={1}>
      <Layer>
        <Text text="Try to drag a stick" />
        <Teacher />
        {sticks.map((stick) => (
          <Group
          x={stick.point1_x}
          y={stick.point1_y}
          key={stick.id}
          id={stick.id}
          rotation={stick.rotation}
          draggable
          onDragStart = {handleDragStart}
          onDragEnd = {handleDragEnd}
          onDragMove = {handleMove}
          >
            <Circle
              x={0}
              y={0}
              radius = {10}
              numPoints={5}
              innerRadius={20}
              outerRadius={stickLength}
              fill={stick.color1}
              opacity={0.8}
              scaleX={stick.isDragging ? 1.2 : 1}
              scaleY={stick.isDragging ? 1.2 : 1}
              
            />
            <Line
                
                points={[0, 0, 0 + stickLength, 0]}
                stroke="black"
                strokeWidth = {5}
                hitStrokeWidth = {10}
              />
            <Text 
              text={stick.id} 
              x={40}
              y={5}
              />
            <Circle
              x={0 + stickLength}
              y={0}
              radius = {10}
              numPoints={5}
              innerRadius={20}
              outerRadius={40}
              fill={stick.color2}
              opacity={0.8}
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

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
