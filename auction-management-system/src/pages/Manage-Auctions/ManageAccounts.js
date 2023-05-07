import React, { useState, useEffect } from 'react';
import axios from 'axios';
//import { Table } from 'react-bootstrap';
import { Form, } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const ManageAccounts = () =>{
        const [userId, setUserId] = useState('');
      
        useEffect(() => {
          if (userId) {
            axios.get("hhttp://localhost:4000/update" + userId )
              .then(response => {
                
              })
              .catch(error => {
                console.error(error);
              });
          }
        }, [userId]);
      
        const handleUserIdChange = (event) => {
          event.preventDefault();
          setUserId(event.target.value);
          
        };
        return (
          <>
          <div className='form-container'>
          <Form onSubmit={handleUserIdChange} >
              <Form.Group controlId="formUserId">
                <Form.Label>Enter User ID:</Form.Label>
                <Form.Control type="text" value={userId} onChange={handleUserIdChange} />
              </Form.Group>
              <br/>
              <Link className="btn btn-dark w-100" to={`/manage_account/${userId}` }>submit</Link>
            </Form>
          </div>
      
          
          
          </>
        );
      };

export default ManageAccounts;