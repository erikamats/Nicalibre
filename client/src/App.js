import React, { Component } from "react";
import { Router, Route, Redirect } from "react-router-dom";
import "./App.css";
import Auth from "./auth/Auth";
import history from "./history";
import ControlledCarousel from "./components/Header";
// import Nav from "./components/Nav";
import FixedNavbar from "./components/Nav/FixedNavbar";
import Home from "./pages/Home";
import Gallery from "./pages/Gallery";
// import Donations from "./pages/Donations";
import Contact from "./pages/Contact";
import CreatePost from "./pages/CreatePost";
import Forum from "./pages/Forum";
import Footer from "./components/Footer"

import Callback from "./pages/Callback";
import Profile from "./pages/Profile"

// Snag the initial state that was passed from the server side
// var initialState = JSON.parse(document.getElementById('initial-state').innerHTML)

const auth = new Auth();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <FixedNavbar auth={auth} />
          {/* Header File */}
          <ControlledCarousel />

          {/* <Menu /> */}
          <div>
            {/* <Route exact path="/" component={Home} /> */}
            <Route
              exact
              path="/"
              render={props => {
                return <Home auth={auth} {...props} />;
              }}
            />
            <Route
              exact
              path="/home"
              render={props => {
                return <Home auth={auth} {...props} />;
              }}
            />
            <Route
              path="/createpost"
              render={props => {
                return auth.isAuthenticated() &&
                  auth.userHasScopes(["write:blog"]) ? (
                  <CreatePost auth={auth} {...props} />
                ) : (
                  <Home auth={auth} {...props} />
                );
              }}
            />

            <Route
              exact
              path="/forum"
              render={props => {
                return <Forum auth={auth} {...props} />;
              }}
            />

            {/* <Route
              path="/editforum"
              render={props => {
                return auth.isAuthenticated() &&
                  auth.userHasScopes(["write:blog"]) ? (
                  <EditForum auth={auth} {...props} />
                ) : (
                  <Redirect to="/forum" />
                );
              }}
            /> */}

            <Route
              exact
              path="/gallery"
              render={props => {
                return <Gallery auth={auth} {...props} />;
            
              }}
            />

            <Route
              exact
              path="/help"
              render={props => {
                  return <Contact auth={auth} {...props} />;
              }}
            />
            <Route
              exact
              path="/profile"
              render={props => {
                return auth.isAuthenticated() ? (
                  <Profile auth={auth} {...props} />
                ) : (
                  <Redirect to="/" />
                );
              }}
            />

            {/* <Route
              exact
              path="/contact"
              render={props => {
                return <Contact auth={auth} {...props} />;

              }}
            /> */}

            <Route
              path="/callback"
              render={props => {
                auth.handleAuthentication(props);
                return <Callback {...props} />;
              }}
            />
          </div>
          <Footer/>
        </div>
      </Router>
      
    );
 
  }
}
export default App;
