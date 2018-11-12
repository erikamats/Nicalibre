import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import "./NewFixed.css";

export default class Example extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  render() {
    const loggedIn = this.props.auth.isAuthenticated();
    const canWrite = this.props.auth.userHasScopes(["write:blog"]);
    const homeLocation = "/";
    const location = document.location.pathname;


    return (
      <div>
        <Navbar light expand="md" >
          <NavbarBrand href="/" >
        
            <img
              src={require("../Nav/freenicalogo.png")}
              className="logo"
              alt="logo"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle}  className="mr-2" />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink to="/">
                  {location === homeLocation ? (
                    ""
                  ) : (
                    <NavLink href="/">
                      <button className="btn">Home</button>
                    </NavLink>
                  )}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/forum">Our Impact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/gallery">Media</NavLink>
              </NavItem>
              <NavItem className="donate">
                <NavLink href="/donate" className="donatefont">
                  DONATE
                </NavLink>
              </NavItem>

              <NavItem>
                {!loggedIn ? (
                  <button className="btn" onClick={this.props.auth.login}>
                    LOG IN
                  </button>
                ) : (
                  <button className="btn" onClick={this.props.auth.logout}>
                    LOG OUT
                  </button>
                )}
                {loggedIn && canWrite ? (
                  <NavLink to="/createpost">
                    <div className="btn">Create a Post&nbsp; </div>
                  </NavLink>
                ) : (
                  ""
                )}
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}
