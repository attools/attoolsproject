import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import celebrate from '../assets/celebrate_fill.svg';

function Carditems(props) {
  const { title, icon, description, enabled, path, isicon } = props.carditem;

  return (
    <div className="">
      <Link to={path} state={props.carditem}>
        <Card
          className={
            enabled
              ? "custom-card custom-cursor-pointer"
              : "custom-card custom-opacity"
          }
        >
          <Card.Text>
            {isicon ? <span className={icon}></span> : <img src={celebrate} width="48" alt="img"></img>}

          </Card.Text>
          <Card.Body className="p-a-0">
            <Card.Title className="card-title-e">{title}</Card.Title>
            <Card.Text className="card-sub-title">{description}</Card.Text>
          </Card.Body>
        </Card>
      </Link>
    </div>
  );
}

export default Carditems;