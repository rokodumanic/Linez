import { render } from "@testing-library/react";
import React from "react";
import {Card, Button} from "react-bootstrap";
import Workspace from "../Canvas/Workspace";

function Cards(props) {
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 pt-4">
      <Card style={{height: "180px"}}>
        {props.img ? <Card.Img className="border border-2 border-dark h-50" variant="top" src={props.img} />: null}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          {props.text ? <Card.Text>{props.text}</Card.Text>: null}
          {props.lastUpdate ? (<Card.Text>Last updated: {props.lastUpdate}</Card.Text>):null}
          {props.btn ? (<Button variant="dark" onClick={props.handleCardBtn}>{props.btn}</Button>):null}

        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
