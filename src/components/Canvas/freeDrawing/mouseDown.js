const handleMouseDown = (e, [lines, setLines], tool, isDrawing, size) => {
  if(tool!=='pen' && tool!=='eraser') {return;}
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  const id = lines.length;
  setLines([...lines, { id, tool, size, points: [pos.x, pos.y] }]);
};

export default handleMouseDown;