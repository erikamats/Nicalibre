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

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
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
          <NavbarBrand href="/" className="mr-auto">
            <img
              src={require("../Nav/freenicalogo.png")}
              className="logo"
              alt="logo"
            />
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar}  />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav className="ml-auto" navbar>
                             
                  {location === homeLocation ? (
                    ""
                  ) : (
                    <NavItem>
                    <NavLink href="/">
                    Home
                    </NavLink>
                    </NavItem>
                  )}
                          
              <NavItem>
                <NavLink href="/forum">Our Impact</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="/gallery">Media</NavLink>
              </NavItem>
              <NavItem className="donate">
                <NavLink href="/donate" className="donatefont">
                  Donate
                </NavLink>
              </NavItem>

              <NavItem>
                {!loggedIn ? (
                  <NavLink className="login" onClick={this.props.auth.login}>
                    Login
                  </NavLink>
                ) : (
                  <NavLink className="logout" onClick={this.props.auth.logout}>
                    Logout
                  </NavLink>
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
