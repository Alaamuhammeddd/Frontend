import React from "react";
import AuctionCard from "./AuctionCard";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from "react";
import axios from "axios";
import Spinner from 'react-bootstrap/Spinner';
import Alert from 'react-bootstrap/Alert';
// import { getAuthUser } from "../helper/Storage";

const AuctionList = () =>
{  // const auth = getAuthUser();
   const [auctions, setAuctions] = useState(
  {
    loading:true,
    results:[],
    err:null,
    reload:0,
  }
);
const [search, setSearch] = useState("");

useEffect(() => {
  setAuctions({...auctions, loading:true});
  axios
   .get("http://localhost:4000/auctions", 
   {
      params: {
      search:search
    }
   })
   .then((resp) => { 
    console.log(resp);
    setAuctions ({...auctions, results:resp.data, loading:false, err:null})
  })
  .catch((err) => {
    setAuctions({
      ...auctions,
      loading:false,
      err:"something went wrong"
    });
  });
}, [auctions.reload])

const searchAuctions = (e) => {
  e.preventDefault();
  setAuctions({...auctions, reload: auctions.reload + 1})

}
    return (

        <div className="list-container p-5">
        {/* LOADER */}
        {auctions.loading === true && (
          <div className="text-center">
          <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
          </Spinner>
          </div>

        )}

        {auctions.loading === false && auctions.err == null  && (
        <>
        {/* SEARCH */}
        <Form onSubmit={searchAuctions}>       
       <Form.Group className="mb-3 d-flex" >
        <Form.Control 
        type="text"
        placeholder="Search"
        value={search}
        onChange={(e)=> setSearch(e.target.value)}
         />
        <Button className="btn btn-dark" variant="primary" type="submit">
        Search
      </Button>
      </Form.Group>
      </Form>
        {/*LIST AUCTIONS*/}
        <div className="row">
        {
          auctions.results.map (auction => (
            <div className="col-3 auction-card-container"  key = {auction.id}>

            <AuctionCard 
            id = {auction.id}
            image_url = {auction.image_url}
            name={auction.name}
            description={auction.description}
            start_date={new Date(auction.start_date).toLocaleString()}
            end_date={new Date(auction.end_date).toLocaleString()}
            category={auction.category}
            current_bid={auction.current_bid}
            saller_id={auction.saller_id}/>
            </div>
          ))
        }
        </div>
        </>
        )}
        {/* ERROR HANDLING */}
        {auctions.loading === false && auctions.err != null  && (
          <Alert variant="danger" className="p-2">
          {auctions.err}
        </Alert>
        )}

        {auctions.loading === false && auctions.err == null && auctions.results.length === 0  && (
          <Alert variant="danger" className="p-2">
            No Auctions Found
          </Alert>
        )}
        </div>
    );

}

export default AuctionList;