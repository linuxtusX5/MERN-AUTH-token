import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const history = useNavigate();

     async function registerUser(event){
       event.preventDefault()

       const response = await fetch("http://localhost:1337/api/register", {
         method: "POST",
         headers: {
           "Content-Type": "application/json",
         },
         body: JSON.stringify({
           name,
           email,
           pass,
         }),
       });

       const data = await response.json()

       if(data.status === 'ok') {
         history('/Login')
       }
     }

  return (
    <Card style={{ margin: "30%", marginTop: "5%" }} border="warning">
      <Card.Header>Register</Card.Header>
      <Card.Body>
        <Card.Title className="text-center">
          Register your first Account
        </Card.Title>
        <Card.Text>
          <Form onSubmit={registerUser}>
            <div className="text-center">
              <TextField
                value={name}
                required
                id="outlined-required"
                style={{ width: "70%", marginTop: "50px" }}
                label="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="text-center">
              <TextField
                required
                value={email}
                id="outlined-required"
                style={{ width: "70%", marginTop: "20px" }}
                label="Email address"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="text-center">
              <TextField
                required
                value={pass}
                id="outlined-required"
                style={{ width: "70%", marginTop: "20px" }}
                label="Password"
                type="password"
                onChange={(e) => setPass(e.target.value)}
              />
            </div>

            <div className="text-center">
              <Button
                variant="primary"
                type="submit"
                style={{
                  width: "70%",
                  marginTop: "20px",
                  marginBottom: "50px",
                }}
                value="Register"
              >
                Submit
              </Button>
            </div>
          </Form>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Register;