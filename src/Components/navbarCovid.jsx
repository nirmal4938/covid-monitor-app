import React,{Component} from "react";
import {Link} from "react-router-dom";
import * as ReactBootStap from "react-bootstrap";
class Navbar extends Component
{
state={};

render()
{
    return(<React.Fragment>
        <ReactBootStap.Navbar collapseOnSelect expand="lg" bg="danger" variant="dark">
  <ReactBootStap.Container>
  <ReactBootStap.Navbar.Brand href="#"><Link to="/all"  className="nav-link text-white text-bold" >Home</Link></ReactBootStap.Navbar.Brand>
  <ReactBootStap.Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <ReactBootStap.Navbar.Collapse id="responsive-navbar-nav">
    <ReactBootStap.Nav className="me-auto">

    </ReactBootStap.Nav>
    <ReactBootStap.Nav>
      <ReactBootStap.Nav.Link href="#deets"><Link to={`/all/:country`}  className="nav-link text-white  me-2">Show Current Cases</Link></ReactBootStap.Nav.Link>
    </ReactBootStap.Nav>
  </ReactBootStap.Navbar.Collapse>
  </ReactBootStap.Container>
</ReactBootStap.Navbar>
    </React.Fragment>);
}
}
export default Navbar;