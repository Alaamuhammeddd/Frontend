import React , { useState,useRef} from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from "../../helper/Storage";
import axios from "axios";
import { useParams } from "react-router-dom";

const UpdateAuctions = () => {
 let {id} = useParams();
 const [message, setMessage] = useState("");
  const auth = getAuthUser();
  const [auction, setAuction] = useState({
    name: "",
    description: "",
    start_date:"",
    end_date:"", 
    category:"", 
    current_bid:"", 
    saller_id: auth.id,
    err: [],
    loading: false,
    success: null,
  });
  const image_url = useRef(null);

  const updateNewAuction = (e) => {
    e.preventDefault();

    setAuction({ ...auction, loading: true, image_url: e.target.value });
    setAuction({ ...auction, loading: true, name: e.target.value });
    setAuction({ ...auction, loading: true, description: e.target.value });
    setAuction({ ...auction, loading: true, start_date: e.target.value });
    setAuction({ ...auction, loading: true, end_date: e.target.value });
    setAuction({ ...auction, loading: true, category: e.target.value });
    setAuction({ ...auction, loading: true, current_bid: e.target.value });
  
    const formData = new FormData();
    formData.append("name", auction.name);
    formData.append("description", auction.description);
    formData.append("start_date", auction.start_date);
    formData.append("end_date", auction.end_date);
    formData.append("category", auction.category);
    formData.append("current_bid", auction.current_bid);
    formData.append("saller_id", auction.saller_id);
    if (image_url.current.files && image_url.current.files[0]) {
      formData.append("image_url", image_url.current.files[0]);
    }


    axios
    .put("http://localhost:4000/auction/"+ id, formData,
    {
      headers: {
      token: auth.token,
      },
    },)
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
        image_url.current.files = null;
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

 

      <Form className="Form-Container" onSubmit={updateNewAuction}>
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
        {/* <Form.Group className="mb-3">
          <Form.Control
            type="text" name="seller_id"
            value={auction.saller_id}
            onChange={(e) => setAuction({ ...auction, saller_id: e.target.value })}
            required
            placeholder="Auction Seller ID"
          />
        </Form.Group> */}
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
          Update New Auction
        </Button>
      </Form>
    </div>

  </>
    
    
  );
};




export default UpdateAuctions;
