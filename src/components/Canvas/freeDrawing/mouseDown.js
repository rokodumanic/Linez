const handleMouseDown = (e, [lines, setLines], tool, isDrawing) => {
  if(tool!=='pen' && tool!=='eraser') {return;}
  isDrawing.current = true;
  const pos = e.target.getStage().getPointerPosition();
  setLines([...lines, { tool, points: [pos.x, pos.y] }]);
};

export default handleMouseDown;