import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import Alert from "react-bootstrap/Alert";
import { getAuthUser } from '../../helper/Storage';
const ManageAccounts = () =>{
  const auth = getAuthUser();
  const [accounts, setAccounts] = useState(
    {
      loading:false,
      results:null,
      err:[],
    }
);

  useEffect(() => {
  setAccounts({...accounts, loading: true, err:[]});
  axios
   .get("http://localhost:4000/update",
   {
    headers: {
    token: auth.token,
    },
  }, accounts)
   .then((resp) => { 
    console.log(resp);
    setAccounts ({...accounts, results:resp.data, loading:false, err:[]})
  })
  .catch((err) => {
    setAccounts({
      ...accounts,
      loading:false,
      err: [{ message: err.response.data.message }]
    });
  });
}, [accounts.reload]);

const rejectuser =(id) => {
  setAccounts({...accounts, loading: true, err: []})
  axios
     .put("http://localhost:4000/update/" + id,
     { reject: true },
     {
      headers: {
      token: auth.token,
      },
    },
   )
     .then((resp) => {
      setAccounts({ ...accounts, results: resp.data, success:"Account Rejected",
    reload: accounts.reload + 1
  },
  window.location.reload()
  );
    })
     .catch((err) => {
      const error = err.response ? err.response.data.message : 'Something went wrong';
     setAccounts({
          ...accounts,
         loading: false,
         err: [{ message: error }],
        });
      });
}
const acceptUser = (id) =>
{
  setAccounts({...accounts, loading: true, err: []})
  axios
     .put("http://localhost:4000/update/" + id, { accept: true },
     {
      headers: {
      token: auth.token,
      },
    },
   )
     .then((resp) => {
      setAccounts({ ...accounts, results: resp.data, success:"Account Rejected",
    reload: accounts.reload + 1
   },
   window.location.reload()
  );
    })
     .catch((err) => {
      const error = err.response ? err.response.data.message : 'Something went wrong';
     setAccounts({
          ...accounts,
         loading: false,
         err: [{ message: error }],
        });
      });
}
    
        return (
          <div className="Manage-Accounts p-5" >
          <div className="header mb-5">

          {accounts.err.length > 0 && accounts.err.map((error, index) => (
          <Alert key={index} variant="danger" className="alert">
          {error.message}
        </Alert>
        ))}

      {accounts.success && (
        <Alert variant="success" className="p-2">
          Account Status Updated
        </Alert>
      )}

         </div>
         <div className="table-container">
         {Array.isArray(accounts.results) && accounts.results && (
          <Table striped bordered hover variant="dark" >
      <thead>
        <tr>
          <th>#</th>
          <th>E-mail</th>
          <th>Type</th>
          <th> Status</th>
          <th>Action</th>


        </tr>
      </thead>
      <tbody>
      {accounts.results && accounts.results.map((user, index) => (
        <tr key={index}>
         <td >{user.id}</td>  
          <td>{user.email}</td>
          <td>{user.type}</td>
          <td>{user.status}</td>
          <td>
          <button
                  className="btn btn-sm btn-danger"
                  onClick={(e) => {
                    rejectuser(user.id);
                      }}>
                      Rejected
                    </button>
                    <button
                  className="btn btn-sm btn-success"
                  onClick={(e) => {
                    acceptUser(user.id);
                      }}>
                      Accept
                    </button>
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

export default ManageAccounts;