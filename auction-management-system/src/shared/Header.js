import React from "react";
import '../style/Header.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";
import { removeAuthUser, getAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";

const Header = () =>
{
  const navigate = useNavigate();
  const auth = getAuthUser();
  console.log("auth:", auth);
  
  const Logout = () => {
    removeAuthUser();
    navigate("/");
  };

    return (
 
<>
<Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand >
          <Link className="nav-link" to={'/home'}>Elite Auctions</Link></Navbar.Brand>
          <Nav className="me-auto">

          {!auth && (
              <>
                <Link className="nav-link" to={"/login"}>
                  Login
                </Link>
                <Link className="nav-link" to={"/register"}>
                  Register
                </Link>
              </>
            )}

            {auth && auth.type === "seller" && (
              <>
              <Link className="nav-link" to={'/activity-history/' + auth.id }> Activity History</Link>
              <Link className="nav-link" 
              to={'/manageauctions'}>
                  Manage Auctions
              </Link>
              </>
            )}

            {auth && auth.type === "bidder" && (
              <>
              <Link className="nav-link" to={'/auctions'}> All Auctions</Link>
              <Link className="nav-link" to={'/won-auctions'}> Won Auctions</Link>

        
              </>
            )}

            {auth && auth.type === "admin" && (
              <>
              <Link className="nav-link" 
              to={'/ManageAccounts'}>
                Manage  Accounts
                </Link>
                <Link className="nav-link" 
                to={'/ViewTransactionResult'}>
                View Transaction Result
                </Link>
              </>
              
            )}

          </Nav>

          <Nav className="ms-auto">
            {/* Authenticated Routes  */}
            {auth && <Nav.Link onClick={Logout}>Logout</Nav.Link>}
    
          </Nav>
        </Container>
      </Navbar>
</>
    ); 
        
    
};

export default Header;