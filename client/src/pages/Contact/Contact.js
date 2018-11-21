import React, { Component } from "react";

import Iframe from "react-iframe";
import "./Contact.css";

class Contact extends Component {
  render() {
    return (
      <div className="container-contact">
        <row>
          <div className="contributions col-5 ">
            <div className="donate-title">
              <span>JOIN THE FIGHT</span>
            </div>
            <p className="generous"> Your generous contribution will ....</p>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>Donate securely, below.</p>
          </div>

          <div className="frame row col-6 ">
            <Iframe
              url="https://www.gofundme.com/mvc.php?route=widgets/mediawidget&fund=apoyar-a-nicaragua&image=1&coinfo=0&preview=1"
              width="100%"
              // height="550px"
              // id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </div>
        </row>

        <div className="contact col-10 ">
       
         <div className="row justify-content-between"> 
         <form className="form col-5  ">
            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="contactFirstName">First Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="contactFirstName"
                  placeholder="First Name"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="contactLastName">Last Name:</label>
                <input
                  type="text"
                  className="form-control"
                  id="contacctLastName"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group col-md-6">
                <label htmlFor="inputEmail4">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                />
              </div>
              <div className="form-group col-md-6">
                <label htmlFor="inputPhone">Phone Number</label>
                <input
                  className="form-control"
                  type="tel"
                  id="contactPhone"
                  placeholder="(555)-555-5555"
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="Message">Message:</label>
              <textarea
                className="form-control"
                rows="5"
                id="contactMessage"
                placeholder="Don't be shy, drop us a few lines! We'd love to hear from you!"
              />
            </div>
            <div className="form-group">
              <button type="submit" className="btn submit-button">
                SUBMIT
              </button>
            </div>
          </form>
      
          <div className="form-text col-6">
            <h1>CONTACT US</h1>
            <p>
              {" "}
              Have a question or want to share your feedback? Let us know!{" "}
            </p>
            <i className="fab fa-facebook-square fa-2x"></i>
            <i className="fab fa-twitter fa-2x"></i>
            <i className="fab fa-instagram fa-2x"></i>
            <br />
          </div>
        
         </div>
 
        
        </div>
        
      </div>
    );
  }
}
export default Contact;
