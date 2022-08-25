import {Line} from 'react-konva';
function mapLines(lines, line, i){
lines.map((line, i) => (
    <Line
      key={i}
      points={line.points}
      stroke="#df4b26"
      strokeWidth={5}
      tension={0.5}
      lineCap="round"
      lineJoin="round"
      globalCompositeOperation={
        line.tool === 'eraser' ? 'destination-out' : 'source-over'
      }
    />
  ))}

  export default mapLines;