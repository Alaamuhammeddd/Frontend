import React, {useState, useEffect} from "react";
import '../style/ChosenAuction.css';
import InputGroup from 'react-bootstrap/InputGroup';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { useParams } from "react-router-dom";
import axios from "axios";
import Button from 'react-bootstrap/Button';
// import { getAuthUser } from "../helper/Storage";

const ChosenAuction = () =>
{ 
  // const auth = getAuthUser();
  let {id} = useParams();
  const [bid, setBid] = useState("");

  const [auction, setAuction] = useState(
  {
    result:[],
    loading: false,
    err: [],
    success:null,
  });

  useEffect(() => {
    setAuction({ ...auction, loading: true });
    axios
      .get("http://localhost:4000/auctions/" + id)
      .then((response) => {
        setAuction({ ...auction, loading: false, result: response.data});
      })
      .catch((errors) => {
        setAuction({
          ...auction,
          loading: false,
          err: [{ message: errors.response.data.error }],
        });
      });
  }, [auction.reload]);

  const handleBid = () => {
    setAuction({ ...auction, loading: true, err: [] });
    if (bid === "") {
      setAuction({ ...auction, loading: false, err: [{ message: "Please enter a bid amount" }] });
      return;
    }
    axios
      .put('http://localhost:4000/auctions/' + id,
      
      { current_bid: bid })
      .then((response) => {
        console.log(response); 
        setAuction({ ...auction,
        success: "Auction Updated",
        reload: auction.reload + 1,
       });
       if (!response.data.error) {
        window.location.reload()
      }
      })
      .catch((errors) => {
        console.log(errors);
        setAuction({
          ...auction,
          loading: false,
          err: [{ message: errors.response.data.error }]
        });
      });
  };


    return (
 <div className="auction-container p-5">

      {auction.err && auction.loading === false && auction.err.map((error, index) => (
       <Alert key={index} variant="danger" className="p-2">
         {error.message}
       </Alert>
     ))}
      {auction.success && (
     <Alert variant="success" className="p-2"> Bid Updated
    </Alert>
      )}

          <>
          <div className="row">
        <div className="col-3">
        <img className="auction-image" src="https://picsum.photos/200/300" alt="Auction"/>
        </div>
        <div className="col-9">
            <h3 className="title"> {auction.result.name} </h3>
            <br/>
            <p> {auction.result.description} </p>
            <br/>
            <p className="auction-category">Category : {auction.result.category} </p>
            <br/>
            <h5 className="auction-time"> Auction Time: {auction.result.start_date} - {auction.result.end_date}</h5>
            <br/>
            <h4 className="auction-current-price"> ${auction.result.current_bid}</h4>


        </div>
    </div>
    <InputGroup className="inputgroup-container w-5 p-5">
        <Form.Control aria-label="Dollar amount (with dot and two decimal places)"
        type="number"
        id="bid"
        value={bid}
        onChange={(event) => setBid(event.target.value)} />
        <InputGroup.Text>$</InputGroup.Text><Button variant="dark" className="bid-now-btn" onClick={handleBid}> Bid Now </Button>
        
      </InputGroup>
          </>
          
   

        {/* ERROR HANDLING
        {auction.loading === false && auction.err != null  && (
          <Alert variant="danger" className="p-2">
          {auction.err}
        </Alert>
        )} */}

     
    
      
 </div>
    );

}

export default ChosenAuction;

