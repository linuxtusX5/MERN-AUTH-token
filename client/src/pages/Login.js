import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import TextField from "@mui/material/TextField";

function Login() {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  async function loginUser(event) {
    event.preventDefault();

    const response = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        pass,
      }),
    });

    const data = await response.json();
    if(data.user) {
       localStorage.setItem('token', data.user)
       alert('Login Successful')
       window.location.href = '/Inside'
    }else {
      alert('Check your Username and Password')
    }

    console.log(data);
  }
  return (
    <div className="App">
      <Card style={{ margin: "30%", marginTop: "5%" }} border="warning">
        <Card.Header>Login</Card.Header>
        <Card.Body>
          <Card.Title className="text-center">
            Login your first Account
          </Card.Title>
          <Card.Text>
            <Form onSubmit={loginUser}>
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
                  value="Login"
                >
                  Submit
                </Button>
              </div>
            </Form>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
