import React, { useRef, useEffect, useState, Component, createContext} from "react";
import { Stage, Layer, Line, Image, Rect, Ellipse, Group } from 'react-konva';
import handleMouseDown from "./freeDrawing/mouseDown";
import handleMouseMove from "./freeDrawing/mouseMove";
import { nanoid } from "nanoid";
import getElementByKey from "./shapes/getElementByKey";
import Toolbar from "./Toolbar";
import axios from "axios";
import { useLocation, useSearchParams } from "react-router-dom";
import Konva from "konva";
import { ChairSVG } from "./shapes/chair";
import { SingleBedSVG } from "./shapes/singleBed";
import { Canvg } from "canvg";
import { Html } from "react-konva-utils";
import { useImage } from "react-konva-utils";
import { Rectangle } from "./Transformer";
import Menubar from "./shapes/MenuBar";
import ExportPDF from "./Pdf";
import context from "react-bootstrap/esm/AccordionContext";
import { Context } from "konva/lib/Context";

export const StageContext = createContext(null);


function Canvas(property) {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [erasedLines, setErasedLines] = useState([]);
  const isDrawing = useRef(false);
  const [size, setSize] = useState(4);
  const [color, setColor] = useState("red");
  const [ellipses, setEllipses] = useState([]);
  const [rects, setRects] = useState([]);
  const [isSelected, setSelect] = useState(null);
  const stageRef = useRef(null);
  const layer1Ref = useRef(null);
  const toolLayer = useRef(null);
  const [image] = useImage("../../images/chair.svg");
  const [img, setImg] = useState([ChairSVG, SingleBedSVG]);
  /* const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams.get("project")); */
  

  useEffect(()=> {
    // return draggable circle to original position
    stageRef.current.findOne(".draggableEllipse").position({x: 67.5, y: 120})
    stageRef.current.findOne(".draggableCircle").position({x: 67.5, y: 160})
                console.log(ellipses);
  }, [ellipses])
  useEffect(()=> {
    // return draggable rectangle to original position
    stageRef.current.findOne(".draggableRect").position({x: 50, y: 200})
    stageRef.current.findOne(".draggableRoundedRect").position({x: 50, y: 250})
                console.log(rects);
  }, [rects])
  useEffect(() => {
    if(typeof property.projectId == "string"){
      console.log("Property u canvas useEffect load from DB:", typeof property.projectId);
      loadFromDB(property.projectId);
    }
  }, []);


// Save canvas

  async function loadFromDB (props){
    try{
      const loadedProject = await axios.post(process.env.REACT_APP_SERVER_URL + "/loadProject", {project: props});
      console.log("LoadFromDB:", loadedProject);
      setLines(loadedProject.data.lines);
      setEllipses(loadedProject.data.ellipses);
      setRects(loadedProject.data.rects);
  }
    catch(err){console.log(err)}
  } 
  
 async function sendToDB (){
  const lastUpdate = new Date();
  
   await axios.post(process.env.REACT_APP_SERVER_URL + "/workspace", 
    { title: "Naslov",
      line: lines,
      ellipse: ellipses,
      rect: rects, 
      projectId: (typeof property.projectId == "string" ? property.projectId : false),
      date: lastUpdate.toGMTString()
    })
    .then((response) => {
      console.log("response:", response);
    }, (error) => {
      console.log("error:", error);
    }); 
}; 

const handleExport = () => {
  toolLayer.current.visible(false);
  const uri = stageRef.current.toDataURL();
  console.log(uri);
  const name = "canvas" + nanoid(5);
  downloadURI(uri, name);
  toolLayer.current.visible(true);
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

const aaa = () => {
  toolLayer.current.visible(false);
  const uri = stageRef.current.toDataURL();
  console.log(uri);
  const name = "canvas" + nanoid(5);
  var link = document.createElement("a");
  link.download = name;
  link.href = uri; 
  ExportPDF(link);
  toolLayer.current.visible(true);
}
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
          { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "brown", cornerRadius:0, width:50, height:50}
        ]);} else if(i==="roundRect"){
          setRects((prevRects) => [
            ...prevRects,
            { key:nanoid(), x: e.target.x(), y: e.target.y(), fill: "brown", cornerRadius:10, width:50, height:50}
        ]);} else {
          console.log(i);
      }
      console.log(e.target.x());
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

  function  handleStageMouseDown(e) {
        // clicked on stage - cler selection
        if (e.target === e.target.getStage()) {
          setSelect(null);
          return;
        }
        // clicked on transformer - do nothing
        const clickedOnTransformer =
          e.target.getParent().className === "Transformer";
        if (clickedOnTransformer) {
          return;
        }
    
        // find clicked rect by its name
        const keyVar = e.target.key();
        const rect = getElementByKey(rects, keyVar);
        if (rect) {
          setSelect(keyVar);
        } else {
          setSelect(null);
        }
      };

  

  function lineSelect(e, action, id){
/*             console.log("LINES:",lines[0].points.filter(a=>a!=e.target.getStage().getPointerPosition().x));
 */
    if(tool==="pen" && isDrawing.current===true){

      if(action==="click"){
        console.log("start click");
        handleMouseDown(e, [lines, setLines], tool, isDrawing, size)
      } else if(action==="move"){
        console.log("Start move");
        handleMouseMove(e, [lines, setLines], isDrawing, size)
      }
  } else if(tool=== "str8Line"){
      if(action==="click"){
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        const id = lines.length;

        setLines([...lines, { id, tool, size, direction:0, points: [pos.x, pos.y] }]);
      } else if(action === "move"){
        if (!isDrawing.current) {
          return;
        }
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = lines[lines.length - 1];
        let direction = lastLine.direction;
        const x1 = lastLine.points[0];
        const y1 = lastLine.points[1];

        if( !direction ){
          if(Math.abs(x1-point.x)>Math.abs(y1-point.y)){
            lastLine.direction = "horisontal";
            console.log("Horisontal: ", lastLine.direction);
          }else if(Math.abs(point.x-x1)<Math.abs(point.y-y1)){
            lastLine.direction = "vertical";
            console.log("Vertical: ", lastLine.direction);
          } else return;
        } else if (direction === "horisontal"){
          lastLine.points = lastLine.points.concat([point.x, y1]);
        } else if(direction === "vertical") {
          lastLine.points = lastLine.points.concat([x1, point.y]);
        }else return;
        // replace last
        lines.splice(lines.length - 1, 1, lastLine);
        setLines(lines.concat());
        console.log(lines[0].points);
      }
  } else if(tool === "eraser" ){
      if(action==="click"){
        console.log("Erase click");
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        setErasedLines([...erasedLines, { tool, size, points: [pos.x, pos.y] }]);
        console.log("LINES:",erasedLines);
        erase(id);
      } else if(action==="move" && isDrawing.current === true && id!==undefined){
        console.log("Erase move");
        /*  e.target.getParent().getChildren(); */
        console.log("ID jee:", id);
        
        const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        let lastLine = erasedLines[erasedLines.length - 1];
        // add point
        lastLine.points = lastLine.points.concat([point.x, point.y]);
      
        // replace last
        erasedLines.splice(erasedLines.length - 1, 1, lastLine);
        setErasedLines(erasedLines.concat());        /* const stage = e.target.getStage();
        const point = stage.getPointerPosition();
         setLines(lines => {lines[id].points.filter(line=>(line==point.x))}) */
         console.log("LINES:",erasedLines);
      }
      }
    }

    function erase(id){
      const arr = lines[id];
      console.log("Majstor:",arr);
    }
    function Svg(){
      console.log("SVG function")
        return <Html> <Image image={image}/> </Html>;
      }

    function checkDeselect(e) {
      // deselect when clicked on empty area
      const clickedOnEmpty = e.target === e.target.getStage();
      if (clickedOnEmpty) {
        setSelect(null);
      }
    };

  return (
    <div className="canvasContainer">
      
            <select
                value={tool}
                onChange={(e) => {
                  setTool(e.target.value);
                }}
            >
                <option value="pen">Pen</option>
                <option value="str8Line">Straight lines</option>
                <option value="eraser">Eraser</option>
                <option value="dragger">Dragger</option>
            </select>
            <button onClick={handleExport}>Export as PNG</button>
              <button onClick={aaa}>Export as PDF</button>
            <button onClick={sendToDB()}>Save</button>
            <input
              value={size}
              onChange={e => {
                setSize(parseInt(e.target.value));
              }}
              type="range"
              step="2"
              min="2"
              max="20"
            />
      
      <button onClick={()=>Svg()}>SVG</button>
      <Stage
      id="CanvasStage"
      ref={stageRef}
      
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e)=>{isDrawing.current = true;
        lineSelect(e, "click");
        checkDeselect(e);
      }}
      onMouseMove={(e)=>lineSelect(e, "move")}
      onMouseup={()=>{isDrawing.current = false;
        erase();
        }}
      
      >
      {/* Backgrund color */}
      <Layer>
        <Rect
        height={window.innerHeight}
        width={window.innerWidth}
          fill="white"

        />
      </Layer>
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
        {rects.length ? rects.map((eachRect, i) => (
          <Rectangle
            draggable={tool==='dragger'?true:false}
            onDragStart={ (e) =>{changeShapeColor(e, rects, eachRect, "rect")}}
            onDragEnd={(e, eachRect) =>{ updateShape(e, rects, eachRect, "rect") }}
            onChange={(newAttrs) => {
              const rectArr = [...rects];
              rectArr[i] = newAttrs;
              setRects(rectArr);
              console.log("RECTS:",rects);
            }}
            
            shapeProps={eachRect}
          />
        )) : null}
{/* Display all regular polygons(triangle...) */}

      </Layer>
      <Layer
        id="LineLayer"
        >
          {lines.length ? lines.map((line, i) => (
            <Line
              key={i}
              points={line.points}
              stroke="red"
              strokeWidth={line.size}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              draggable={tool==='dragger'?true:false}
              /*globalCompositeOperation={
                line.tool === 'eraser' ? 'destination-out' : 'source-over'
              }*/
              onMouseMove={(e)=>{
                if(isDrawing.current === true){
                console.log("IDDDDD:", i);
                lineSelect(e, "move", i);}
              }}
            />
          )) : null}
<Group draggable={tool==='dragger'?true:false}>
          {img.length ? img.map((Papir, i)=>(
            <Html 
              >
              <Papir />
            </Html>
          )) : null}
          </Group>
              
          {/* <Html>
          <ChairSVG/>
</Html> */} 
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
