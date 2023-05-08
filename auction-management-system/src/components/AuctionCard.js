import React from "react";
import Card from 'react-bootstrap/Card';
import '../style/AuctionCard.css'
import { Link } from "react-router-dom";

const AuctionCard = (props) =>
{

    return (
      <>
      <Card>
      <Card.Img 
      className="card-img" 
      variant="top" 
      src= {props.image_url} />
      <Card.Body>
        <Card.Title>{props.name}</Card.Title>
        <Card.Text> {props.description}
        </Card.Text>
        <Card.Text className="category"> Auction Category : {props.category}
        </Card.Text>
        <Card.Text className="auction-startDate"> {new Date(props.start_date).toLocaleString()}
        </Card.Text>
        <Card.Text className="auction-endDate"> {new Date(props.end_date).toLocaleString()}
        </Card.Text>
        <Card.Text className="price"> ${props.current_bid}
        </Card.Text>
        <Link className="btn btn-dark w-100" to={'/auctions/'+props.id}>View</Link>
        
      </Card.Body>
    </Card></>
        
      
    );
};
export default AuctionCard;