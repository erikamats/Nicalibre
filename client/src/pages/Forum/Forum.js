import React, { Component } from "react";
import firebase from "../../firebase";

import {
  Card,
  Button,
  CardHeader,
  CardBody,
  CardFooter,
  CardText,
  CardImg,
  Collapse,
  Form,
  Input,
  Label
} from "reactstrap";

import "../../pages/Forum/Forum.css";

class Forum extends Component {
  constructor() {
    super();
    this.state = {
      blogContent: "",
      title: "",
      allBlogs: [],
      created: "",
      imageUrl: "",
      collapse: false,
      editOn: false
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const allBlogsRef = firebase.database().ref("allBlogs");

    // pushing  new created post to Firebase
    const blog = {
      title: this.state.title,
      blogContent: this.state.blogContent,
      created: firebase.database.ServerValue.TIMESTAMP,
      imageUrl: this.state.imageUrl
    };

    allBlogsRef.push(blog);
    this.setState({
      title: "",
      blogContent: "",
      created: "",
      imageUrl: ""
    });
    // ** end pushing new created post to Firebase **
  }

  componentDidMount() {
    const allBlogsRef = firebase
      .database()
      .ref("allBlogs")
      .orderByChild("published");

    // .limitToLast(5);
    allBlogsRef.on("value", snapshot => {
      let allBlogs = snapshot.val();

      let newState = [];
      for (let blog in allBlogs) {
        newState.push({
          id: blog,
          title: allBlogs[blog].title,
          blogContent: allBlogs[blog].blogContent,
          created: allBlogs[blog].created,
          imageUrl: allBlogs[blog].imageUrl
        });
      }

      this.setState({
        allBlogs: newState
      });
    });
  }

  removeItem(blogId) {
    const blogRef = firebase.database().ref(`/allBlogs/${blogId}`);
    blogRef.remove();
  }

 updateItem(blogId) {
    const blogRef = firebase.database().ref(`/allBlogs/${blogId}`);
    blogRef.update();
  }

  render() {
    const loggedIn = this.props.auth.isAuthenticated();

    return (
      <div className="app">
        <div className="wrapper-forum">
          <h1>Blogs: Worth a Read</h1>

          <div className="container-forum">
            {loggedIn ? (
              <div>
                <form onSubmit={this.handleSubmit}>
                  <div />

                  <label htmlFor="post-title">Add Title</label>
                  <div>
                    <input
                      type="text"
                      name="title"
                      placeholder="Attention-Grabber"
                      onChange={this.handleChange}
                      value={this.state.title}
                    />
                    <br />
                  </div>

                  <div>
                    <label htmlFor="post-blogContent">Add Blog Content:</label>
                    <br />
                    <input
                      type="text"
                      name="blogContent"
                      placeholder="What are we sharing?"
                      onChange={this.handleChange}
                      value={this.state.blogContent}
                    />
                  </div>

                  <div>
                    <label htmlFor="post-blogImage">Add Image URL:</label>
                    <br />
                    <input
                      type="text"
                      name="imageUrl"
                      placeholder="Insert image URL with http://..."
                      value={this.state.imageUrl}
                      onChange={this.handleChange}
                    />
                  </div>

                  <br />
                  <br />
                  <button>Add Item</button>
                </form>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>

        <div className="wrapper-container ">
          {/* <CardDeck> */}
          {this.state.allBlogs
            .slice(0)
            .reverse()
            .map(post => {
              return (
                <div key={post.id} className="row">
                  <Card>
                    <CardHeader>
                    {loggedIn ? (
                        <Button
                          onClick={() => this.updateItem(post.id)}
                          className="updatePost"
                        >
                           Edit Post &nbsp; <i className="fa fa-edit" />
                        </Button>
                      ) : (
                        ""
                      )}

                    <div className="blogTitle">
                    {post.title}
                    </div>
                     
                      {loggedIn ? (
                        <Button
                          onClick={() => this.removeItem(post.id)}
                          className="deletePost"
                        >
                          Delete Post &nbsp; <i className="far fa-trash-alt" />
                        </Button>
                      ) : (
                        ""
                      )}
                    </CardHeader>
                    <CardImg
                      top
                      width="100%"
                      src={post.imageUrl} 
                      alt={post.title} 
                    />
                    <CardBody>
                      <CardText>{post.blogContent}</CardText>
                    </CardBody>

                    <CardFooter>
                      {loggedIn ? (
                        <div>
                          <Button className="float-left">
                            <i className="far fa-thumbs-up" />
                          </Button>
                          <Button className="float-left">
                            <i className="far fa-thumbs-down" />
                          </Button>
                          <Button className="float-right" onClick={this.toggle}>
                            Comment <i className="far fa-comment-dots " />
                          </Button>
                          <Collapse isOpen={this.state.collapse}>
                            <Card>
                              <CardHeader>
                                <Label for="exampleText">Comment:</Label>
                              </CardHeader>
                              <CardBody>
                                <Form>
                                  <Input
                                    type="textarea"
                                    name="text"
                                    id="exampleText"
                                    autoFocus
                                    defaultValue={this.props.commentText}
                                  />
                                  <CardFooter>
                                    <Button>
                                      {" "}
                                      Submit{" "}
                                      <i className="fas fa-paper-plane" />
                                    </Button>
                                  </CardFooter>
                                </Form>
                              </CardBody>
                            </Card>
                          </Collapse>
                        </div>
                      ) : (
                        ""
                      )}
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          {/* </CardDeck> */}
        </div>
      </div>
    );
  }
}

export default Forum;
