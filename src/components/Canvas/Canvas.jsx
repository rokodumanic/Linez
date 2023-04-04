import React, { useRef, useEffect, useState} from "react";
import { Stage, Layer, Line, Image, Rect, Ellipse, Group, Transformer, Path } from 'react-konva';
import handleMouseDown from "./freeDrawing/mouseDown";
import handleMouseMove from "./freeDrawing/mouseMove";
import { nanoid } from "nanoid";
import getElementByKey from "./shapes/getElementByKey";
import Toolbar from "./Toolbar";
import axios from "axios";
import Menubar from "./shapes/MenuBar";
import ExportPDF from "./Pdf";

function Canvas(property) {
  const [tool, setTool] = useState('pen');
  const [lines, setLines] = useState([]);
  const [strLines, setStrLines] = useState([]);
  const [erasedLines, setErasedLines] = useState([]);
  const isDrawing = useRef(false);
  const isErasing = useRef(false);
  const [size, setSize] = useState(4);
  const [color, setColor] = useState("red");
  const [ellipses, setEllipses] = useState([]);
  const [rects, setRects] = useState([]);
  const [isSelected, setSelect] = useState(null);
  const stageRef = useRef(null);
  const backgroundLayerRef = useRef(null);
  const layer1Ref = useRef(null);
  const lineLayerRef = useRef(null);
  const toolLayer = useRef(null);
  const shapeRef = useRef();
    const trRef = useRef();
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

  useEffect(() => {
    if (isSelected!=null) {
      // we need to attach transformer manually
      console.log("VVVVVVVVVVVVVVVVVVVVVVVVVV",  trRef, shapeRef.current, isSelected);
      console.log("WWWWWWWWWWWWWWWWWWWWW", trRef.current._nodes);
      if(trRef.current._nodes !=null){
      delete trRef.current._nodes;
      }
      console.log("XXXXXXXXXXXXXXX", layer1Ref.current);

      trRef.current.nodes(layer1Ref.current.find("#"+isSelected));

      console.log("trRef.current.getLayer()",isSelected, trRef.current, layer1Ref.current);
      layer1Ref.current.batchDraw();
    }
  }, [isSelected]);

  
// Save canvas

  async function loadFromDB (props){
    try{
      const loadedProject = await axios.post(process.env.REACT_APP_SERVER_URL + "/loadProject", {project: props});
      console.log("LoadFromDB:", loadedProject);
      setLines(loadedProject.data.lines);
      setStrLines(loadedProject.data.strLines);
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
      strLine: strLines,
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

function handleExport(){
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
    console.log("eachItem:", eachItem);
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

  function strLineDragStart(e, list, key){
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let arr = [...list];
    let obj = getElementByKey(arr, key);
    if( obj !== null) {
      obj.offset = [obj.points[0]-e.target.x, obj.points[1]-e.target.y, obj.points[2]-e.target.x, obj.points[3]-e.target.y]
      obj.stroke= "pink" };
      setStrLines(arr);
      console.log("POINT", point);
  }

  function strLineDrag(e, list, key){
    console.log("eachItem:", key);
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let arr = [...list];
    let obj = getElementByKey(arr, key);
    const origin = obj;
    console.log("OBJECT", obj);
    if( obj !== null) {
      const offsetX = obj.points[0]-point.x;
      const offsetY = obj.points[1]-point.y;
      console.log("e.target.x()", point);
      console.log("POINTS BEFORE",obj.points, point);
      obj.points[0] = e.target.x+obj.offset[0];
      obj.points[1] = e.target.y+obj.offset[1];
      obj.points[2] = e.target.x+obj.offset[2];
      obj.points[3] = e.target.y+obj.offset[3];
      /* obj.x=e.target.x;
      obj.y=e.target.y; */
      obj.stroke= "blue"};
      setStrLines(arr);
      console.log("POINTS AFTER:", obj.points, point);
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

  function lineSelect(e, id){
/*             console.log("LINES:",lines[0].points.filter(a=>a!=e.target.getStage().getPointerPosition().x));
 */
    if(tool==="pen" && isDrawing.current===true){

      if(e.type ==="mousedown"){
        handleMouseDown(e, [lines, setLines], tool, isDrawing, size)
      } else if(e.type ==="mousemove"){
        handleMouseMove(e, [lines, setLines], isDrawing, size)
      }
  } else if(tool=== "str8Line"){
      if(e.type ==="mousedown"){
        console.log("str8 click e:", e);
        isDrawing.current = true;
        const pos = e.target.getStage().getPointerPosition();
        const id = nanoid();
        handleMouseDown(e, [lines, setLines], tool, isDrawing, size);
        
        setStrLines([...strLines, { id:nanoid(), tool, size, direction:0, stroke:"red", points: [pos.x, pos.y] }]);
        console.log("AAAAAAAAAAAAAAAAAAAA2",strLines);
      } else if(e.type ==="mousemove" && isDrawing.current===true){
          console.log("22222222222222222", e.target, e.target.getStage());
          const stage = e.target.getStage();
          const point = stage.getPointerPosition();
          let lastLine = lines[lines.length - 1];
          // add point
          if(Math.abs(lastLine.points[0]-point.x)>Math.abs(lastLine.points[1]-point.y)){
            //HORISONTAL
            lastLine.points = lastLine.points.concat([point.x, lastLine.points[1]]);
            lastLine.direction = 1;
          } else if(Math.abs(lastLine.points[0]-point.x)<Math.abs(lastLine.points[1]-point.y)){
            //VERTICAL
            lastLine.points = lastLine.points.concat([lastLine.points[0], point.y]);
            lastLine.direction = 2;
          }

          // replace last
          lines.splice(lines.length - 1, 1, lastLine);
          setLines(lines.concat());
          console.log(lines[0].points);
        /* const stage = e.target.getStage();
        const point = stage.getPointerPosition();
        const arr = [...lines];
        let lastLine = arr[lines.length - 1];
        // add point
        arr[lines.length - 1].points.concat([point.x, point.y]);
      
        // replace last
        arr[lines.length - 1].points.splice(lines.length - 1, 1, lastLine);
        setLines(arr); */
        console.log("11111111111111111",lines[0].points);
      
      } else if(e.type ==="mouseup"){
          const stage = e.target.getStage();
          const point = stage.getPointerPosition();
          let arr = [...strLines];
          let obj = arr[strLines.length - 1];
          const x1 = obj.points[0];
          const y1 = obj.points[1];
        if(Math.abs(x1-point.x)>Math.abs(y1-point.y)){
          //HORISONTAL
          arr[strLines.length - 1].direction = 1;
          console.log("Horisontal: ", arr[strLines.length - 1].direction);
        }else if(Math.abs(point.x-x1)<Math.abs(point.y-y1)){
          //VERTICAL
          arr[strLines.length - 1].direction = 2;
          console.log("Vertical: ", arr[strLines.length - 1].points);
        } else if(point.x-x1 === 0 && point.y-y1===0){
          arr.splice(strLines.length - 1, 1);
          setStrLines(arr);
          return;
        }else return;
        let direction = arr[strLines.length - 1].direction;
          if(direction==1){
        //HORISONTAL
            arr[strLines.length - 1].points.push(point.x);
            arr[strLines.length - 1].points.push(arr[strLines.length - 1].points[1]);

            console.log("arr[strLines.length - 1].points",arr[strLines.length - 1].points)
          } else if(direction==2){
        //VERTICAL
            arr[strLines.length - 1].points.push(arr[strLines.length - 1].points[0]);
            arr[strLines.length - 1].points.push(point.y);
          } else{return;}
                    
          console.log("DDDDDDDDDDDDDDDDDD:",arr[strLines.length - 1]);
          setStrLines(arr);
          let newArr = [...lines];
          newArr.splice(newArr.length-1, 1);
          setLines(newArr);
      }
  } else if(tool === "eraser" ){
      if(e.type ==="mousedown"){
        const shapeId = e.target.getStage().mouseClickStartShape._id;

        isErasing.current = true;
        const pos = e.target.getStage().getPointerPosition();        
        
      } else if(e.type ==="mouseover" && isDrawing.current === true && checkDeselect(e)){
       
        /*  e.target.getParent().getChildren(); */
          const stage = e.target.getStage();
          const point = stage.getPointerPosition();
          let arr = [...strLines];
          const index = Array.prototype.indexOf.call(e.target.parent.children, e.target);
          console.log("INDEX!!!!!!!!!", index);
          const margin = size/2;
          console.log("arr[INDEX]", arr[index]);
          const x1 = arr[index].points[2];
          const y1 = arr[index].points[3];
          console.log("HHEEEEELP", x1, y1);
          if(arr[index].direction === 1){
            arr[index].points.splice(2,1,(point.x-size));
          } else if(arr[index].direction === 2){
            arr[index].points.splice(3,1,(point.y-size));
            
          }
          setStrLines(arr);
          addStrLine(point, arr[index], x1, y1);
          console.log("INDEX",x1, y1, arr[index].points[2] ,e.target.index, e.currentTarget, arr, index, arr[index]);
        

        // replace last
/*          setStrLines(lines => {lines[id].points.filter()})
 */         
      }
      }
    }

    function addStrLine(point, element, x1, y1){
      console.log("ADD STR LINES");
      if(element.direction===1){
        setStrLines((prevLines)=>[
          ...prevLines, 
          {id: nanoid(), tool:element.tool, size:element.size, direction:element.direction, stroke:element.stroke, points:[(point.x+size), element.points[1], x1, element.points[3]]}]);
      }
      else if(element.direction===2)
      {setStrLines((prevLines)=>[
        ...prevLines, 
        {id: nanoid(), tool:element.tool, size:element.size, direction:element.direction, stroke:element.stroke, points:[element.points[0], (point.y+size), element.points[2], y1]}]);}
    }

    /* function Svg(){
      console.log("SVG function")
        return <Html> <Image image={image}/> </Html>;
      } */

    function checkDeselect(e) {
      // deselect when clicked on empty area
      const clickedOnEmpty = backgroundLayerRef.current._id === e.target.getStage().pointertargetShape.parent._id;
      console.log("clickedOnEmpty", e.target.getStage().pointertargetShape.parent._id,  backgroundLayerRef.current._id);
      if (clickedOnEmpty) {
        setSelect(null);
        return 0;
      } else if(!clickedOnEmpty){
        console.log("CheckDeselect detected something");
        return 1;
      } else{
        console.log("CheckDeselectFaied")
      }
    };

    function rectClick(e){
      console.log("AAAAAAAAAa", e.target.parent._id, layer1Ref.current._id);
        if( e.target.parent._id === layer1Ref.current._id ){
          const shapeId = e.target.getStage().mouseClickStartShape.attrs.id;

          console.log("1. IF",shapeId);
          if(isSelected===shapeId){
            setSelect(null)
          } else{
           setSelect(shapeId);
          }
    }
  }

    function who(type){
      if(type === "rect"){
        return [rects, setRects];
      } else if(type === "ellipse"){
       return [ellipses, setEllipses];
      } else if(type==="line"){
        return [lines, setLines];
      }else{
        console.log("Who() missed");
        return 0;}
    }

    function onTChange(newAttrs, i, type) {
      const [arr, set] = who(type);
      arr[i] = newAttrs;
      set(()=>arr);
      console.log("RECTS:",arr); 
    }

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
                <option value="delete">Delete</option>
                <option value="dragger">Dragger</option>
            </select>
            <button onClick={()=>handleExport()}>Export as PNG</button>
              <button onClick={aaa}>Export as PDF</button>
            <button onClick={()=>sendToDB()}>Save</button>
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
      
      {/* <button onClick={()=>Svg()}>SVG</button> */}
      <Stage
      id="CanvasStage"
      ref={stageRef}
      
      width={window.innerWidth}
      height={window.innerHeight}
      onMouseDown={(e)=>{
        isDrawing.current = true;
        lineSelect(e);
        if(tool==="delete" || tool==="dragger"){checkDeselect(e);}
        console.log("POINTS AFTER!!!!!:", strLines);
}

      }
      onMouseMove={(e)=>{
        if(isDrawing.current === true)
        {console.log("STAGE MOVE", e);
        lineSelect(e);}}}
      onMouseup={(e)=>{
        console.log("Mouse Up e:",e);
        isDrawing.current = false;
        if(tool==="str8Line"){lineSelect(e);}
          
        console.log("mouse up LINES", strLines);
        }}
      
      >
      {/* Backgrund color */}
      <Layer
      ref={backgroundLayerRef}
      >
        <Rect
        height={window.innerHeight}
        width={window.innerWidth}
          fill="white"

        />
      </Layer>
        <Layer ref={layer1Ref}>
        
{/* Display all ellipses and circles */}
        {ellipses.length ? ellipses.map((eachEllipses, i) => (
          <Ellipse
            id={eachEllipses.key}
            key={eachEllipses.key}
            x={eachEllipses.x}
            y={eachEllipses.y}
            draggable={tool==='dragger'?true:false}
            selectable={true}
            radiusX={eachEllipses.radiusX}
            radiusY={eachEllipses.radiusY}
            fill={eachEllipses.fill}
            onClick={(e)=>{rectClick(e)}}
            onDragStart={ (e) =>{changeShapeColor(e, ellipses, eachEllipses, "ellipse")}}
            onDragEnd={ (e) => {updateShape(e, ellipses, eachEllipses, "ellipse")}}
            onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = layer1Ref.current.find("#"+isSelected)[0];
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        onTChange({
          ...eachEllipses,
          x: node.x(),
          y: node.y(),
          // set minimal value
          radiusX: Math.max(5, node.radiusX() * scaleX),
          radiusY: Math.max(node.radiusY() * scaleY),
        }, i, "ellipse");
      }}
          />
        )) : null}
{/* Display all rect elements */}
        {rects.length ? rects.map((eachRect, i) => (
          <Rect
      id={eachRect.key}
      key={eachRect.key}
      x={eachRect.x}
      y={eachRect.y}
      cornerRadius={eachRect.cornerRadius}
      width={eachRect.width}
      height={eachRect.height}
      fill={eachRect.fill}
      ref={shapeRef}
      onClick={(e)=>{rectClick(e)}}
      draggable={tool==='dragger'?true:false}
      selectable={true}
      onDragStart={ (e) =>{changeShapeColor(e, rects, eachRect, "rect")}}
      onDragEnd={(e) =>{ updateShape(e, rects, eachRect, "rect") }}
      onTransformEnd={(e) => {
        // transformer is changing scale of the node
        // and NOT its width or height
        // but in the store we have only width and height
        // to match the data better we will reset scale on transform end
        const node = layer1Ref.current.find("#"+isSelected)[0];
        const scaleX = node.scaleX();
        const scaleY = node.scaleY();
        // we will reset it back
        node.scaleX(1);
        node.scaleY(1);
        debugger;
        onTChange({
          ...eachRect,
          x: node.x(),
          y: node.y(),
          // set minimal value
          width: Math.max(5, node.width() * scaleX),
          height: Math.max(node.height() * scaleY),
        }, i, "rect");
        setSelect(null);
      }}
          />
        )) : null}

          {(isSelected!=null)?(<Transformer
            ref={trRef}
            selectable={false}
            boundBoxFunc={(oldBox, newBox) => {
              // limit resize
              if (newBox.radiusX < 5 || newBox.radiusY < 5) {
                return oldBox;
              }
              return newBox;
            }}
          />):null}
        
{/* Display all regular polygons(triangle...) */}
        
      </Layer>
      <Layer
        id="LineLayer"
        ref={lineLayerRef}
        >
          {lines.length ? lines.map((line, i) => (
            <Line
              key={line.id}
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
              onClick={(e)=>{
                if(tool === "delete"){
                  let arr = [...lines];
                  arr.splice(i, 1);
                  setLines(arr);
                  console.log("LINES after Delete:", lines);
                }
              }}
              onMouseMove={(e)=>{
                if(isDrawing.current === true){
                console.log("IDDDDD:", line.id);
                lineSelect(e, line.id);}
              }}
            />
          )) : null}

          {strLines.length ? strLines.map((strLine, i)=>(
            
            <Line 
              key={strLine.id}
              x={strLine.x != null ? strLine.x : 0}
              y={strLine.y != null ? strLine.y : 0}
              points={strLine.points}
              draggable={tool==="dragger" ? true : false}
              stroke={strLine.stroke}
              strokeWidth={strLine.size}
              tension={0.5}
              lineCap="round"
              lineJoin="round"
              onDragStart={(e)=>{strLineDragStart(e, strLines, strLine.id)}}
              onDragEnd={(e)=>{strLineDrag(e, strLines, strLine.id)}}
              onClick={(e)=>{
                if(tool === "delete"){
                  let arr = [...strLines];
                  arr.splice(i, 1);
                  setStrLines(arr);
                  console.log("LINES after Delete:", lines);
                }
              }}
              onMouseOver={(e)=>{
                if(isDrawing.current===true)
                  {console.log("ONMOUSEOVER", e)
                  lineSelect(e)}}}
              /*onMouseMove={(e)=>{
                if(isDrawing.current===true)
                {console.log("ONMOUSEMOVE", e)
                lineSelect(e)}}}*/
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
