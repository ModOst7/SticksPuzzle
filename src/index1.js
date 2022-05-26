import ReactDOM from 'react-dom/client';
import './index.css';

import React from 'react';
import { createRoot } from 'react-dom/client';
import { Stage, Layer, Circle, Text, Line, Group } from 'react-konva';

const stickLength = 80;
const circRadius = 10;


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
    /*sticks.forEach((stick1) => {
      sticks.forEach((stick2) => {
        if ((Math.abs(stick1.point1_x - stick2.point1_x) < circRadius) && (Math.abs(stick1.point1_y - stick2.point1_y) < circRadius))
      })
    })*/

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
    /*setSticks(
      sticks.map((stick) => {        
        return {
          ...stick,
          color1: stick.id === id? "#666666" : stick.color1,
          color2: stick.id === id? "#666666" : stick.color2,
          point1_x: stick.id === id? e.target.attrs.x : stick.point1_x,
          point1_y: stick.id === id? e.target.attrs.y : stick.point1_y,
          point2_x: stick.id === id? e.target.attrs.x + stickLength*Math.cos(Math.PI/180*stick.rotation) : stick.point2_x,
          point2_y: stick.id === id? e.target.attrs.y + stickLength*Math.sin(Math.PI/180*stick.rotation) : stick.point2_y,
        };
      })
    );*/
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
          /*color1: (
            ((Math.abs(sticks[id].point1_x - stick.point1_x) < circRadius) && (Math.abs(sticks[id].point1_y - stick.point1_y) < circRadius)) ||
            ((Math.abs(sticks[id].point2_x - stick.point1_x) < circRadius) && (Math.abs(sticks[id].point2_y - stick.point1_y) < circRadius)) 
          )? "#009900" : "#666666",
          color2: (
            ((Math.abs(sticks[id].point1_x - stick.point2_x) < circRadius) && (Math.abs(sticks[id].point1_y - stick.point2_y) < circRadius)) ||
            ((Math.abs(sticks[id].point2_x - stick.point2_x) < circRadius) && (Math.abs(sticks[id].point2_y - stick.point2_y) < circRadius))
          )? "#009900" : "#666666"*/
        };
      })
    );
  }


  return (
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
        <Text text="Try to drag a stick" />
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
      </Layer>
    </Stage>
  );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
