const handleMouseMove = (e, [lines, setLines], isDrawing) => {
  // no drawing - skipping
  if (!isDrawing.current) {
    return;
  }
  const stage = e.target.getStage();
  const point = stage.getPointerPosition();
  let lastLine = lines[lines.length - 1];
  // add point
  lastLine.points = lastLine.points.concat([point.x, point.y]);

  // replace last
  lines.splice(lines.length - 1, 1, lastLine);
  setLines(lines.concat());
  console.log(lines[0].points);
};

export default handleMouseMove;