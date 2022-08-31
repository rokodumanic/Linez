import React, { useRef, useEffect, useState} from "react";
import { Stage, Layer, Line, Text, Rect, Ellipse, RegularPolygon } from 'react-konva';
import handleMouseDown from "./freeDrawing/mouseDown";
import handleMouseMove from "./freeDrawing/mouseMove";
import { nanoid } from "nanoid";
import getElementByKey from "./shapes/getElementByKey";
import Toolbar from "./Toolbar";


const Canvas = () => {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const isDrawing = useRef(false);
  const [ellipses, setEllipses] = useState([]);
  const [rects, setRects] = useState([]);
  const stageRef = useRef(null);
  const layer1Ref = useRef(null);
  const toolLayer = useRef(null);

  useEffect(()=> {
    // return draggable circle to original position
    stageRef.current.findOne(".draggableEllipse").position({x: 37.5, y: 120})
    stageRef.current.findOne(".draggableCircle").position({x: 37.5, y: 160})
                console.log(ellipses);
  }, [ellipses])
  useEffect(()=> {
    // return draggable circle to original position
    stageRef.current.findOne(".draggableRect").position({x: 20, y: 190})
    stageRef.current.findOne(".draggableRoundedRect").position({x: 20, y: 250})
                console.log(rects);
  }, [rects])
// Save canvas
const handleExport = () => {
  const uri = stageRef.current.toDataURL();
  console.log(uri);
  const name = "canvas" + nanoid(5);
  downloadURI(uri, name);
};
//download PNG
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
// Update polygons

// Add polygons
  function apendShape(e, i){
    {
      if(i==="ellipse"){
      // push new ellipse to ellipses
      setEllipses((prevEllipses) => [
        ...prevEllipses,
        { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "red", radiusX:30, radiusY:15 }
      ]);} else if(i==="circle"){
        // push new circle to ellipses
        setEllipses((prevEllipses) => [
          ...prevEllipses,
          { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "red", radiusX:25, radiusY:25 }
        ]);} else if(i==="rect"){
        // push new circle to circles
        setRects((prevRects) => [
          ...prevRects,
          { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "brown", cornerRadius:0}
        ]);} else if(i==="roundRect"){
          setRects((prevRects) => [
            ...prevRects,
            { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "brown", cornerRadius:10}
        ]);} else {
          console.log(i);
        
      }
    }
  }
// update polygons
  function updateShape(e, list, eachItem, i) {
    let arr = [...list];
    let obj = getElementByKey(arr, eachItem.key);
    if( obj !== null) {
      obj.x= e.target.x();
      obj.y= e.target.y();
      obj.fill= ((i==="ellipse") ? "red" :  ((i === "rect") ? "brown" : console.log(i))) };
      if(i==="ellipse"){setEllipses(arr);}
      else if(i === "rect"){setRects(arr);}
      else{console.log("err!updateShape()")}
    }
// change polygon color 
  function changeShapeColor(e, list, eachItem, i) {
      let arr = [...list];
      let obj = getElementByKey(arr, eachItem.key);
      if( obj !== null) {
        obj.fill= "pink" };
      if(i==="ellipse"){ setEllipses(arr); }
      else if(i==="rect"){ setRects(arr);}
      else{console.log(i);}
      }

  return (
    <div>
      <select
        value={tool}
        onChange={(e) => {
          setTool(e.target.value);
        }}
      >
        <option value="pen">Pen</option>
        <option value="eraser">Eraser</option>
        <option value="dragger">Dragger</option>
      </select>
      <button onClick={handleExport}>Click here to log stage data URL</button>
      <Stage
      ref={stageRef}
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e)=> handleMouseDown(e, [lines, setLines], tool, isDrawing)}
      onMousemove={(e)=> handleMouseMove(e, [lines, setLines], isDrawing)}
      onMouseup={()=>isDrawing.current = false}
      >
        <Layer ref={layer1Ref}>
        
{/* Display all ellipses and circles */}
        {ellipses.length ? ellipses.map((eachEllipses) => (
          <Ellipse
            key={eachEllipses.key}
            x={eachEllipses.x}
            y={eachEllipses.y}
            draggable={tool==='dragger'?true:false}
            radiusX={eachEllipses.radiusX}
            radiusY={eachEllipses.radiusY}
            fill={eachEllipses.fill}
            onDragStart={ (e) =>{changeShapeColor(e, ellipses, eachEllipses, "ellipse")}}
            onDragEnd={ (e) => {updateShape(e, ellipses, eachEllipses, "ellipse")}}
          />
        )) : null}
{/* Display all rect elements */}
        {rects.length ? rects.map((eachRect) => (
          <Rect
            key={eachRect.key}
            x={eachRect.x}
            y={eachRect.y}
            cornerRadius={eachRect.cornerRadius}
            draggable={tool==='dragger'?true:false}
            width={50}
            height={50}
            fill={eachRect.fill}
            onDragStart={ (e) =>{changeShapeColor(e, rects, eachRect, "rect")}}
            onDragEnd={(e, key) =>{ updateShape(e, rects, eachRect, "rect") }}
          />
        )) : null}
{/* Display all regular polygons(triangle...) */}

      </Layer>
      <Layer>
          {lines.length ? lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="red"
              strokeWidth={5}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }
            />
          )) : null}
        </Layer>
      <Layer ref={toolLayer} visible={true}>
        <Toolbar 
          layer={layer1Ref}
          tool={tool}
          apendEllipse={(e) => {apendShape(e, "ellipse")}}
          apendCircle={(e) => {apendShape(e, "circle")}}
          apendRect={(e) => {apendShape(e, "rect")}}
          apendRoundedRect={(e) => {apendShape(e, "roundRect")}}
          // apendPolygon={(e) => {apendShape(e, "triangle")}}
        />
      </Layer>
      </Stage>
    </div>
  );
};

export default Canvas;
