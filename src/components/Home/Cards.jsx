import React from "react";
import Card from "react-bootstrap/Card";

function Cards() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img className="border border-2 border-dark" variant="top" src="https://www.kfc.gr/admin/files/3190.svg" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>Last updated: INSERTdate</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Cards;
