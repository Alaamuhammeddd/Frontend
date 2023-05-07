import React , { useEffect, useState} from "react";
import Table from 'react-bootstrap/Table';
import '../../style/ManageAuctions.css';
import { Link } from "react-router-dom";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { getAuthUser } from "../../helper/Storage";
const ManageAuctions = () =>{ 
  const auth = getAuthUser();
  const [auction, setAuction]= useState({
    image_url: '',
    name : '' ,
    description: '',
    start_date: '',
    end_date:'' ,
    category:'' ,
    current_bid: '',
    saller_id: '',
    err:[],
    loading: false,
    success: null,
    results: [],
 });

 useEffect(() => {
  setAuction({ ...auction, loading: true });
  axios
    .get("http://localhost:4000/auction/" + auction.saller_id)
    .then((resp) => {
      setAuction({ ...auction,
      results: resp.data,
      loading: false,
     });
    })
    .catch((err) => {
      setAuction({
        ...auction,
        loading: false,
        err: [{ message: err.response.data.error }],
      });
    });
}, [auction.reload]);

 const deleteAuction =(id) => {
  setAuction({...auction, loading: true, err: []})
  axios
     .delete("http://localhost:4000/auction/" + id,
     {
      headers: {
      token: auth.token,
      },
    } )
     .then((resp) => {
      setAuction({ ...auction, results: resp.data, success:"Auction Deleted",
    reload: auction.reload + 1
  });
    })
     .catch((err) => {
      const error = err.response ? err.response.data.error : 'Something went wrong';
     setAuction({
          ...auction,
         loading: false,
         err: [{ message: error }],
        });
      });
}
    return (
      <div className="Manage-Auctions p-5" >
          <div className="header mb-5">
          
        <Link to="add" className="btn btn-success"> Add New Auction + </Link>
            </div> 
          
        {auction.err.length > 0 && auction.err.map((error, index) => (
          <Alert key={index} variant="danger" className="alert">
          {error.message}
        </Alert>
      ))}

      {auction.success && (
        <Alert variant="success" className="p-2">
          Auction Deleted
        </Alert>
      )}

      <div className="Table-container">
          {auction.results && (
            <Table striped bordered hover variant="dark" >
          <thead>
            <tr>
              <th>#</th>
              <th> ID</th>
              <th>name</th>
              <th>description</th>
              <th>Start Date</th>
              <th>End date</th>
              <th> Category </th>
              <th>current_bid</th>
              <th>saller_id</th>
              <th>Action</th>


            </tr>
          </thead>
          <tbody>
          {Array.isArray(auction.results) && auction.results.map((item, index) => (
            <tr key= {index}>
            <td></td>  
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.description}</td>
              <td>{new Date(item.start_date).toLocaleString()}</td>
              <td>{new Date(item.end_date).toLocaleString()}</td>
              <td>{item.category}</td> 
              <td>{item.current_bid}</td> 
              <td>{item.saller_id}</td>  
              <td>
              <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    deleteAuction(item.id);
                      }}>
                      Delete
                    </button>
                <Link to ={"/manageauctions/" + item.id} className="btn btn-sm btn-primary mx-2">Update</Link>
              </td>
              
            </tr>
          ))}
    
          
          
          </tbody>
        </Table>
          )}
      </div>

    
      
        </div>
    );
};

export default ManageAuctions;