import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Nav.css";


class Nav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedNavKey: "/"
    };
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
    const loggedIn = this.props.auth.isAuthenticated();
    const canWrite = this.props.auth.userHasScopes(["write:blog"]);
    const homeLocation = "/";
    const location = document.location.pathname;

    return (
      <div>
      <div className="signup"> Stay Informed! <span className="sign"> &nbsp; SIGN UP NOW &nbsp;</span> for email Updates!</div>
        <nav className="navbar navbar-expand-lg ">
          <div className="nav-left-text">
            <header className="header-container">
              <img src={require("../Nav/freenicalogo.png")} className="logo" />

              {/* <h6 className="header-item h1i">¡ FreeNica !</h6>

              <h5 className="header-item h2i">
                {" "}
                <em>Happening Now</em> 
              </h5>*/}
            </header>
          </div>

          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse shift" id="navbarNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item nav-link">
                {location === homeLocation ? (
                  ""
                ) : (
                  <Link to="/">
                    <button className="btn">Home</button>
                  </Link>
                )}
              </li>

              <li className="nav-item nav-link">
                <Link to="/forum">
                  <button className="btn">Blog</button>
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link to="/gallery">
                  <button className="btn">Gallery</button>
                </Link>
              </li>
              <li className="nav-item nav-link">
                <Link to="/help">
                  <button className="btn orange">Donate</button>
                </Link>
              </li>

              <li className="nav-item nav-link">
                {!loggedIn ? (
                  <button className="btn" onClick={this.props.auth.login}>
                    Log In
                  </button>
                ) : (
                  <button className="btn" onClick={this.props.auth.logout}>
                    Log Off
                  </button>
                )}

                {loggedIn && canWrite ? (
                  <Link to="/createpost">
                    <div className="btn">Create a Post&nbsp; </div>
                  </Link>
                ) : (
                  ""
                )}
                {/* 
                {loggedIn ? <Link to="/profile">Profile&nbsp;</Link> : ""} */}
              </li>
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}

export default Nav;
