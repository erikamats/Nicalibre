import React from "react";
import "./Header.css";
import Home from "../../pages/Home";
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from "reactstrap";

import API from "../../utils/API";
import Iframe from "react-iframe";

import { Link } from "react-router-dom";
import * as moment from "moment";

let now = moment().format("YYYY-MM-DD");
let then = moment("2018-04-18", "YYYY-MM-DD");
let numDay = Math.abs(moment.duration(then.diff(now)).asDays());
let numDays = Math.round(numDay);

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activeIndex: 0,
  
    };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  componentWillMount() {
    API.getArticles()
      .then(res => {
        this.setState({ items: res.data });
      })
      .catch(err => console.log(err));
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === this.state.items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? this.state.items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const slides = this.state.items.map(item => {
      return (
        <CarouselItem
          className="custom-tag"
          tag="div"
          key={item._id}
          onExiting={this.onExiting}
          onExited={this.onExited}
        >
          <a href={item.link} target="_blank">
            <img className="slideimage" src={item.src} alt={item.altText} />
            <CarouselCaption
              className="caption"
              captionText={item.caption}
              captionHeader={item.header}
              href={this.href}
            />
          </a>
        </CarouselItem>
      );
    });

    return (
      <div>
        <div  className="container-fluid">
          <div className="row">
            <div className="mobile-menu-donate show">
              <button className="orange">
                <Link to="/donate"> DONATE </Link>
              </button>
              <button >
              <Link to="/contact"> TAKE ACTION </Link>               
              </button>
            </div>

            <div className="main-placeholder">
              <div
                className="placeholder"
                style={{
                  backgroundImage: `url(https://www.telemundo.com/sites/nbcutelemundo/files/styles/article_cover_image/public/images/article/cover/2018/04/24/nicaragua.jpg?itok=XIkI_VeA)`,
        
                 objectFit:"50% 50%",
                  width: "100%", 
                
                }}
              />
              <div className="placeholder-text">
                <h3>
                  FREENICA IS FIGHTING FOR .... <em> *insert purpose here*</em>
                </h3>
                <button className="orange">
                  <Link to="/contact"> DONATE NOW</Link>
                </button>
              </div>
            </div>

            <div className="stats-container">
              <div className="stats-title">
                <span>{numDays} DAYS SINCE PROTEST</span>
              </div>
              <div className="stats">
                <div className="stat" >
                  {" "}
                  <span>318</span> 
                  <p>people murdered </p>
                </div>
                <div className="stat">
                  {" "}
                  <span>2,000</span> 
                  <p>people injured </p>
                </div>
                <div className="stat">
                  {" "}
                  <span>300</span>      
                   <p>people missing </p>
                </div>
              </div>
            </div>

            <div id="video-container"
              className="col-sm-12 col-md-12 col-lg-10 video"
              // style={{ position: "relative", paddingTop: "190px" }}
            >
            <div className="video-title">
                <span>HAPPENING NOW</span>
              </div>

              <Iframe
                url="https://www.facebook.com/plugins/video.php?href=https%3A%2F%2Fwww.facebook.com%2FIntervaloNicaragua%2Fvideos%2F1930482583921600%2F&show_text=0"
                data-autoplay="true"
                position="relative"
                id="video"
              />
            </div>

            {/* <div className="col-sm-12 col-md-6 col-lg-4">
              <header id="countdown">
                <h6 className="h1i">¡{numDays} Days Since Protest !</h6>

                <h5 className="h2i">
                  <em>Happening Now</em>
                </h5>

                <ul>
                  <li>481 People Murdered</li>
                  <li>3,962 People Injured</li>
                  <li>1,338 Kidnapped or Missing</li>
                </ul>
              </header>
            </div> */}
            <div className="col-sm-12 col-md-6 col-lg-6 carousel-main">
            temp for carousel - mongo
              <Carousel
                activeIndex={activeIndex}
                next={this.next}
                previous={this.previous}
              >
                <CarouselIndicators
                  items={this.state.items}
                  activeIndex={activeIndex}
                  onClickHandler={this.goToIndex}
                />
                {slides}
                <CarouselControl
                  direction="prev"
                  directionText="Previous"
                  onClickHandler={this.previous}
                />
                <CarouselControl
                  direction="next"
                  directionText="Next"
                  onClickHandler={this.next}
                />
              </Carousel>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Header;

/*<div>

 <Carousel
  activeIndex={activeIndex}
  next={this.next}
  previous={this.previous}
>
  <CarouselIndicators items={this.state.items} activeIndex={activeIndex} onClickHandler={this.goToIndex} />
  {slides}
  <CarouselControl direction="prev" directionText="Previous" onClickHandler={this.previous} />
  <CarouselControl direction="next" directionText="Next" onClickHandler={this.next} />
</Carousel>
</div> */
