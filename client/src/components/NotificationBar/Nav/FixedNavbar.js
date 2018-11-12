import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarNav,
  NavbarToggler,
  Collapse,
  NavItem,
  NavLink
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";
import "./FixedNavbar.css";

class FixedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      selectedNavKey: "/"
    };
    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse
    });
  }

  componentDidMount() {
    this.checkPage();
    window.addEventListener("hashchange", () => {
      this.setState({ selectedNavKey: document.location.hash || "/" });
    });
  }

  checkPage() {
    const homeLocation = "/";
    const location = document.location.pathname;

    if (location !== homeLocation) {
      console.log(`This is your Route location: ${location}`);
    } else {
      console.log(`this is the home route --> ${homeLocation}`);
    }
  }

  render() {
    const bgBlue = { backgroundColor: "#2654ab" };
    // const container = {height: 1300}

    const loggedIn = this.props.auth.isAuthenticated();
    const canWrite = this.props.auth.userHasScopes(["write:blog"]);
    const homeLocation = "/";
    const location = document.location.pathname;
    return (
      <div>
        <Router>
          <Navbar style={bgBlue} dark expand="md" scrolling fixed="top">
            <NavbarBrand href="/">
              <img
                src={require("../Nav/freenicalogo.png")}
                className="logo"
                alt="logo"
              />
            </NavbarBrand>
            {!this.state.isWideEnough && (
              <NavbarToggler onClick={this.onClick} />
            )}
            <Collapse isOpen={this.state.collapse} navbar>
              <NavbarNav right>
                <NavItem active>
                  <NavLink to="/">
                    {location === homeLocation ? (
                      ""
                    ) : (
                      <NavLink to="/">
                        <button className="btn">Home</button>
                      </NavLink>
                    )}
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/forum">OUR IMPACT</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/forum">NEWSROOM</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink to="/gallery">GALLERY</NavLink>
                </NavItem>
                <NavItem className="donate">
                  <NavLink to="/contact" className="donatefont">
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
              </NavbarNav>
            </Collapse>
          </Navbar>
        </Router>
        {/* <Container style={container} className="text-center mt-5">
          <h2>This Navbar is fixed</h2>
          <h5>It will always stay visible on the top, even when you scroll do </h5>
          <br/>
          <p>Full page intro with background image will be always displayfull screen mode, regardless of device </p>
        </Container> */}
      </div>
    );
  }
}

export default FixedNavbar;
