import React, { Component } from 'react'
import { Rect, Ellipse, RegularPolygon } from 'react-konva';
import {Konva} from 'konva';
//at start, two same rectangles at one place
//at the end of drag, note the x and y of the dragged rectangle, append it to GraphicsMain
//return the dragged rectangle to original
<script src="https://cdn.jsdelivr.net/npm/canvg/dist/browser/canvg.min.js"></script>

const MenuBar = () => (
    <Rect
        x={30}
        y={30}
        width={355}
        height={77.5}
        cornerRadius={15}
        fill={"#F5F4F2"}
        stroke={"black"}
        strokeWidth={1}
    />
)

export default class Menubar extends Component {
    state = {
        arrowDraggable: false,
        previousShape: undefined,
        count: 0,
        isDragging: false,
    }

}
