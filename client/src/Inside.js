import React, {useEffect, useState} from 'react'
import jwt  from 'jsonwebtoken'
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

export default function Inside() {
    
        const history = useNavigate();
        const [quote, setQuote] = useState('')

        async function populate() {
            const req = await fetch("http://localhost:1337/api/Inside", {
              headers: {
                "x-access-token": localStorage.getItem("token"),
              },
            });
            const data = await req.json()
            if(data.status === 'ok') {
              setQuote(data.quote)
            }else {
              alert(data.error)
            }
        }

    useEffect(() => {
        const token = localStorage.getItem('token')

        if(token) {
            const user = jwt.decode(token)
            console.log(user)
            if(!user) {
                localStorage.removeItem('token')
                history.replace('/Login')
            }else {
                populate()
            }
        }
    }, [])
  return (
    <Navbar bg="dark" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Brand href="#">MERN Stack</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Logout
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
