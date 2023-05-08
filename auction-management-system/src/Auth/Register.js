import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import axios from "axios";
import { setAuthUser } from "../helper/Storage";
import { useNavigate } from "react-router-dom";
import '../style/Register.css'

const Register = () => {
  const navigate = useNavigate();
  const [register, setRegister] = useState({
    email: "",
    password: "",
    phone:"",
    type:"",
    loading: false,
    err: [],
  });

  const RegisterFun = (e) => {
    e.preventDefault();
    setRegister({ ...register, loading: true, err: [] });
    axios
      .post("http://localhost:4000/registration", {
        email: register.email,
        password: register.password,
        phone: register.phone,
        type: register.type,
      })
      .then((resp) => {
        setRegister({ ...register, loading: false, err: [] });
        setAuthUser(resp.data);
        navigate("/");
      })
      .catch((errors) => {
        console.log(errors.response);
        setRegister({
          ...register,
          loading: false,
          err:[{ message: errors.response.data.error }],
        });
      })
  };
  

  return (
    <div className="register-container">
      <h1>Registration Form</h1>

      {register.err && register.err.map((error, index) => (
        <Alert key={index} variant="danger" className="p-2">
          {error.message}
        </Alert>
      ))}

      <Form onSubmit={RegisterFun}>
        
        <Form.Group className="mb-3">
          <Form.Control
          style={{ width: "700px" }}
            type="email"
            placeholder="Email"
            value={register.email}
            onChange={(e) =>
              setRegister({ ...register, email: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="phone"
            placeholder="phone"
            value={register.phone}
            onChange={(e) =>
              setRegister({ ...register, phone: e.target.value })
            }
          />
        </Form.Group>


        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </Form.Group>


          <Form.Group className="mb-3">
          <Form.Select
            value={register.type}
                  onChange={(e) => setRegister({ ...register, type: e.target.value })}
                aria-label="Select user type"
                  >
              <option >Select user type</option>
              <option value="seller">Seller</option>
              <option value="bidder">Bidder</option>
          </Form.Select>
          </Form.Group>


        <Button
          className="btn btn-dark w-100"
          variant="primary"
          type="submit"
          disabled={register.loading === true}>
          register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
