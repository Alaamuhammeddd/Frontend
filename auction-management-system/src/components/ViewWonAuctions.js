import React from 'react';
import { getAuthUser } from '../helper/Storage';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Alert from 'react-bootstrap/Alert';
import Table from 'react-bootstrap/Table';
import '../style/ViewWonAuctions.css'
const ViewWonAuctions = () => {
    const auth = getAuthUser();
  const [history, setHistory] = useState(
    {
      loading:false,
      results:null,
      err:[],
    }
  );
  const [won, setWon] = useState(
    {
      loading:false,
      results:null,
      err:[],
    }
  );
  
  useEffect(() => {
    setHistory({...history, loading: true, err:[]});
    axios
     .get("http://localhost:4000/won-auctions/" + auth.id, 
     {
      headers: {
      token: auth.token,
      },
    },
    history)
     .then((resp) => { 
      console.log(resp);
      const { won, history } = resp.data;
      setWon(won);
      setHistory(history);
    })
    .catch((err) => {
      setHistory({
        ...history,
        loading:false,
        err: [{ message: err.response.data.message }]
      });
    });
  }, [history.reload]);
  return (
    <div className="user-profile">
      <div className="won-auctions p-5">
      <h2 style={{ textAlign: "center" }}>Won Auctions</h2>
        {Array.isArray(history.err) && history.err.length > 0 && history.err.map((error, index) => (
          <Alert key={index} variant="danger" className="alert">
          {error.message}
        </Alert>
      ))}
      {Array.isArray(won.err) && won.err.length > 0 && won.err.map((error, index) => (
          <Alert key={index} variant="danger" className="alert">
          {error.message}
        </Alert>
      ))}
      
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Image</th>
              <th>Auction Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Winning Bid</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(won) && won.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td><img 
                src={item.image_url} 
                alt={item.name}
                className='image-avatar' /></td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{new Date(item.start_date).toLocaleString()}</td>
                <td>{new Date(item.end_date).toLocaleString()}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <div className="purchase-history p-5" >
        <h2 style={{ textAlign: "center" }}>Purchase History</h2>
        <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Auction ID</th>
              <th>Image</th>
              <th>Auction Name</th>
              <th>Description</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Category</th>
              <th>Amount Paid</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(history) && history.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td><img 
                src={item.image_url} 
                alt={item.name}
                className='image-avatar' /></td>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{new Date(item.start_date).toLocaleString()}</td>
                <td>{new Date(item.end_date).toLocaleString()}</td>
                <td>{item.category}</td>
                <td>{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default ViewWonAuctions;