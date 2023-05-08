import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import { getAuthUser } from "../helper/Storage";
import '../style/ActivityHistory.css';
import Alert from "react-bootstrap/Alert";

const ActivityHistory = () => {
  const auth = getAuthUser();
  const [history, setHistory] = useState({
    result: null,
    loading : false,
    err: [],
  });

  useEffect(() => {
    setHistory({ ...history, loading: true, err: [] });
    axios.get("http://localhost:4000/show/" + auth.id)
      .then(response => {
        setHistory ({...history, result: response.data, loading: false, err: []})
      })
      .catch(error => {
        setHistory({
          ...history,
          loading: false,
          err: [{ message: error.response.data.error }],
        });
      });
  }, [history.reload]);

  return (
    <div>
    
    {history.err.length > 0 && history.err.map((error, index) => (
        <Alert key={index} 
          style={{ padding: '2px', height: '10vh', alignItems: 'center', justifyContent: 'center', display: 'flex', margin:'20px'}}
          variant="danger" className="alert">
          {error.message}
        </Alert>
      ))}

      
      
        <div className='table-container'>
        <h2 style={{ textAlign: "center" }}>Activity History</h2>
        {history.result && (
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>Auction Name</th>
                <th>Bidder ID</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            {history.result && history.result.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>{item.bidder_id}</td>
                <td>{item.amount}</td>
                <td>Winner</td>
              </tr>
            ))}
            </tbody>
          </Table>
          )}
        </div>
      
    </div>
  );
};

export default ActivityHistory;

