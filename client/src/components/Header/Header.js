import React from "react";
import { Link } from "react-router-dom";
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
import * as moment from "moment";
import CountUp from 'react-countup';
import "./Header.css";

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
            <div className="mobile-menu-donate shows">
              <button className="crimson">
                <Link to="/donate"> DONATE </Link>
              </button>
              <button className="white">
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
                  FREENICA IS FIGHTING FOR PEACE AND JUSTICE!
                </h3>
                <button className="crimson">
                  <Link to="/contact"> DONATE NOW</Link>
                </button>
              </div>
            </div>

            <div className="stats-container">
              <div className="stats-title">
                <span>IN JUST {numDays} DAYS </span>
              </div>
              <div className="stats">
                <div className="stat" >
                  {" "}
                  <span><CountUp end={318} duration={1.5} /></span> 
                  <p>people murdered </p>
                </div>
                <div className="stat">
                  {" "}
                  <span><CountUp end={2000} duration={3} /></span> 
                  <p>people injured </p>
                </div>
                <div className="stat">
                  {" "}
                  <span><CountUp end={300} duration={2} /></span>      
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
                height= "100%"
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
            <div className="col-sm-12 col-md-12 col-lg-12 carousel-main">
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
