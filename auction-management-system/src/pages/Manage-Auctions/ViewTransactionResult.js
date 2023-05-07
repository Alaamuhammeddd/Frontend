import React ,{  useState  ,useEffect} from "react";
import Table from 'react-bootstrap/Table';
//import Button from "react-bootstrap/Button";
//import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";

const  ViewTransactionResult= () =>{
  const [transactions, setTransactions] = useState(
    {
      loading:false,
      results:null,
      err:[],
    }
  );
  
  useEffect(() => {
    setTransactions({...transactions, loading: true, err:[]});
    axios
     .get("http://localhost:4000/result", transactions)
     .then((resp) => { 
      console.log(resp);
      setTransactions ({...transactions, results:resp.data, loading:false, err:[]})
    })
    .catch((err) => {
      setTransactions({
        ...transactions,
        loading:false,
        err: [{ message: err.response.data.error }]
      });
    });
  }, [transactions.reload]);
  return (

        <div className="Manage-Auctions p-5" >
          <div className="header mb-5">
          {transactions.err.length > 0 && transactions.err.map((error, index) => (
          <Alert key={index} variant="danger" className="alert">
          {error.message}
        </Alert>
      ))}
         </div>
         <div className="table-container">
         {transactions.results && (
          <Table striped bordered hover variant="dark" >
      <thead>
        <tr>
          <th>#</th>
          <th>Bidder_id </th>
          <th>Auction_id </th>
          <th> Amounts</th>
          <th> Date</th>


        </tr>
      </thead>
      <tbody>
      {transactions.results && transactions.results.map((item, index) => (
        <tr key={index}>
         <td >{item.id}</td>  
          <td>{item.bidder_id}</td>
          <td>{item.auction_id}</td>
          <td>{item.amount}</td>
          <td>{new Date(item.data).toLocaleString()}</td>
          
          
        </tr>


      ))}
        
       
       
      </tbody>
    </Table>

         )}
         
         </div>
    
      
        </div>
    );
};

export default ViewTransactionResult;