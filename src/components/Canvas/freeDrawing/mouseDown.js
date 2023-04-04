import { nanoid } from "nanoid";

const handleMouseDown = (e, [lines, setLines], tool, isDrawing, size) => {
  if(tool!=='pen' && tool!=='eraser' && tool!=='str8Line') {return;}
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  const id = nanoid();
  setLines([...lines, { id:nanoid(), tool, size, points: [pos.x, pos.y] }]);
};

export default handleMouseDown;