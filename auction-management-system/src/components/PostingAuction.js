import React, {  useState, useRef} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import '../style/PostingAuction.css';
 import { getAuthUser } from "../helper/Storage";


const PostingAuction = () => {
  const auth = getAuthUser();
  const [message, setMessage] = useState("");
  const [auction, setAuction] = useState({
    name: "",
    description: "",
    start_date:"",
    end_date:"", 
    category:"", 
    current_bid:"", 
    saller_id: auth.id,
    err: null,
    loading: false,
    success: null,
  });
  const image_url = useRef(null);

  const createAuction = (e) => {
    e.preventDefault();

  setAuction({ ...auction, loading: true, image_url: e.target.value });
  setAuction({ ...auction, loading: true, name: e.target.value });
  setAuction({ ...auction, loading: true, description: e.target.value });
  setAuction({ ...auction, loading: true, start_date: e.target.value });
  setAuction({ ...auction, loading: true, end_date: e.target.value });
  setAuction({ ...auction, loading: true, category: e.target.value });
  setAuction({ ...auction, loading: true, current_bid: e.target.value });
  // const file = image_url.current.files[0];

    axios
    .post("http://localhost:4000/posting", auction,
    {
      headers: {
      token: auth.token,
      },
    })
    .then((response) => {
      setMessage(response.data.message)
        setAuction({
          name: "",
          description: "",
          start_date:"",
          end_date:"", 
          category:"", 
          current_bid:"",
          saller_id: auth.id,
          err: null,
          loading: false,
        });
      })
      .catch((error) => {
        setMessage(error.response.data.message)
        setAuction({
          ...auction,
          loading: false,
          err: "",
        });
      });
  };

  return ( 
  <>
    {message && (
      <Alert variant={message.includes("Invalid") || message.includes("Failed")  ? "danger" : "success"} className="p-2">
        {message}
      </Alert>
    )}
    <div className="Auction-container">

 

      <Form className="Form-Container" onSubmit={createAuction}>
        <Form.Group className="mb-3">
          <Form.Control
            style={{ width: "700px" }}
            value={auction.name}
            onChange={(e) => setAuction({ ...auction, name: e.target.value })}
            type="text"
            required
            placeholder="Auction Name"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={auction.category}
            onChange={(e) => setAuction({ ...auction, category: e.target.value })}
            type="text"
            required
            placeholder="Auction Category"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={auction.current_bid}
            onChange={(e) => setAuction({ ...auction, current_bid: e.target.value })}
            type="text"
            required
            placeholder="Auction Price"
          />
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Control
          value={auction.start_date}
          onChange={(e) => setAuction({ ...auction, start_date: e.target.value, })}
          type="date"
          required
          placeholder="Auction Start Date"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            value={auction.end_date}
            onChange={(e) => setAuction({ ...auction, end_date: e.target.value })}
            type="date"
            required
            placeholder="Auction End Date"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <input type="file" className="form-control"
          ref={image_url}
          required 
          onChange={(e) => setAuction({ ...auction, image_url: e.target.value, })}
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <textarea
            className="form-control"
            placeholder="Description"
            value={auction.description}
            required
            onChange={(e) =>
              setAuction({ ...auction, description: e.target.value })
            }
            rows={5}></textarea>
        </Form.Group>
        <Button className="btn btn-dark w-100" variant="primary" type="submit" >
          Add New Auction
        </Button>
      </Form>
    </div>

  </>
    
    
  );
};


export default PostingAuction;

