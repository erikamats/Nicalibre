import React from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import "./Menu.css";


export default class Menu extends React.Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: "1"
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab

      });
    }
  }
  render() {
    return (
      <div>
        <Nav tabs className="nav-tabs">
          <NavItem className="nav-item">
            <Link to="/" >
              <NavLink
                className={classnames({ active: this.state.activeTab === "1" })}
                onClick={() => {
                  this.toggle("1");
                }}
              >

                HOME &nbsp; &nbsp;
              <i className="fas fa-home" />

              </NavLink>
            </Link>
          </NavItem>

          <NavItem className=".nav-item">
            <Link to="/forum">
              <NavLink
                className={classnames({ active: this.state.activeTab === "2" })}
                onClick={() => {
                  this.toggle("2");
                }}
              >

                BLOG &nbsp;&nbsp;
              <i className="fas fa-comments" />

              </NavLink>
            </Link>
          </NavItem>

          <NavItem className=".nav-item">
            <Link to="/gallery">
              <NavLink
                className={classnames({ active: this.state.activeTab === "3" })}
                onClick={() => {
                  this.toggle("3");
                }}
              >

                GALLERY &nbsp;
              <i className="fas fa-camera" />

              </NavLink>
            </Link>
          </NavItem>
          <NavItem className=".nav-item">
            <Link to="/contact">
              <NavLink
                className={classnames({ active: this.state.activeTab === "4" })}
                onClick={() => {
                  this.toggle("4");
                }}
              >

                SUPPORT &nbsp;
              <i className="fas fa-hands-helping" />

              </NavLink>
            </Link>
          </NavItem>

          {/* <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === "2" })}
              onClick={() => {
                this.toggle("2");
              }}
            >
              Moar Tabs
            </NavLink>
          </NavItem> */}
        </Nav>

        {/* <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            <Row>
              <Col sm="12">
                <h4>Tab 1 Contents</h4>
              </Col>
            </Row>
          </TabPane>
          <TabPane tabId="2">
            <Row>
              <Col>
              <h4>Tab 2 Contents</h4>
              </Col>
            </Row>
          </TabPane>
        </TabContent> */}
      </div>
    );
  }
}
