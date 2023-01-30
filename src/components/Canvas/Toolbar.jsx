import React, { Component } from 'react'
import { Rect, Ellipse, RegularPolygon } from 'react-konva';
import {Konva} from 'konva';
//at start, two same rectangles at one place
//at the end of drag, note the x and y of the dragged rectangle, append it to GraphicsMain
//return the dragged rectangle to original
<script src="https://cdn.jsdelivr.net/npm/canvg/dist/browser/canvg.min.js"></script>

const ToolBar = () => (
    <Rect
        x={30}
        y={80}
        width={77.5}
        height={355}
        cornerRadius={15}
        fill={"#F5F4F2"}
        stroke={"black"}
        strokeWidth={1}
    />
)

export default class Toolbar extends Component {
    state = {
        arrowDraggable: false,
        previousShape: undefined,
        count: 0,
        isDragging: false
    }


    render() {
        return (
            <React.Fragment>
                
                        <ToolBar />

        {/* Bottom ellipse */}
                        <Ellipse
                            radiusX={30}
                            radiusY={15}
                            stroke="black"
                            strokeWidth={1.5}
                            x={67.5}
                            y={120}
                        />
        {/* Top ellipse */}
                        <Ellipse
                          name="draggableEllipse"
                          x={67.5}
                          y={120}
                          draggable={this.props.tool==='dragger'?true:false}
                          radiusX={30}
                          radiusY={15}
                          fill="green"
                          onDragEnd={(e) => this.props.apendEllipse(e)}
                        />
        {/* Bottom circle */}
                       <Ellipse
                            radiusX={20}
                            radiusY={20}
                            stroke="black"
                            strokeWidth={1.5}
                            x={67.5}
                            y={160}
                        />
        {/* Top circle */}
                        <Ellipse
                          name="draggableCircle"
                          x={67.5}
                          y={160}
                          draggable={this.props.tool==='dragger'?true:false}
                          radiusX={20}
                          radiusY={20}
                          fill="green"
                          onDragEnd={(e) => this.props.apendCircle(e)}
                        />
        {/* Bottom rectangle */}
                        <Rect
                            width={35}
                            height={35}
                            stroke="black"
                            strokeWidth={1.5}
                            x={50}
                            y={200}
                            fill="white"
                        />
        {/* Top rectangle */}
                        <Rect
                            name="draggableRect"
                            width={35}
                            height={35}
                            stroke="black"
                            strokeWidth={1.5}
                            x={50}
                            y={200}
                            draggable={this.props.tool==='dragger'?true:false}
                            fill="green"
                            ref="draggableRect"
                            onDragEnd={(e) => this.props.apendRect(e, "rect")}
                        />
        {/* Bottom rounded edges Rect */}
                        <Rect
                            cornerRadius={10}
                            width={35}
                            height={35}
                            stroke="black"
                            strokeWidth={1.5}
                            x={50}
                            y={250}
                            fill="white"
                        />
        {/* Top rounded edges Rect */}
                        <Rect
                            name="draggableRoundedRect"
                            cornerRadius={10}
                            width={35}
                            height={35}
                            stroke="black"
                            strokeWidth={1.5}
                            x={50}
                            y={250}
                            draggable={this.props.tool==='dragger'?true:false}
                            fill="green"
                            ref="draggableRect"
                            onDragEnd={(e) => this.props.apendRoundedRect(e, "rect")}
                        />
        {/* Bottom triangle */}
            
        {/* Top triangle */}
                    
            </React.Fragment>
        )
    }
}
