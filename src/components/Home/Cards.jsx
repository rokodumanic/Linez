import React from "react";
import {Card, Button} from "react-bootstrap";
import {Link} from "react-router-dom";

function Cards(props) {
  
  return (
    <div className="col-sm-6 col-md-4 col-lg-3 pt-4">
      <Card style={{height: "180px"}}>
        {props.img ? <Card.Img className="border border-2 border-dark h-50" variant="top" src={props.img} />: null}
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          {props.text ? <Card.Text>{props.text}</Card.Text>: null}
          {props.lastUpdate ? (<Card.Text>Last updated: {props.lastUpdate}</Card.Text>):null}
          {(props.btn && props.to) ? 
            (<Button variant="dark" >
              <Link to={"/workspace"}
                state={{projectId: (props.to)}}
                className="whiteLink" >{props.btn}</Link>
            </Button>):null}
            {(props.btn && !props.to) ? 
            (<Button variant="dark" >
              <Link to={"/workspace"}
                className="whiteLink" >{props.btn}</Link>
            </Button>):null}
        </Card.Body>
      </Card>
    </div>
  );
}

export default Cards;
