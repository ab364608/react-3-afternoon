import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Header from './Header/Header';
import Compose from './Compose/Compose';
import Post from './Post/Post'

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: [],
      errorMess: ""
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get("https://practiceapi.devmountain.com/api/posts")
    .then(response => {
      console.log(response)
      this.setState({posts: response.data})
    })
    .catch(error => {
      this.setState({errorMess: error.message})
    })
  }

  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${id}`, {text})
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(error => {
      this.setState({errorMess: error.message})
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?${id}`)
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(error => {
      this.setState({errorMess: error.message})
    })
  }

  createPost(text) {
    axios.post("https://practiceapi.devmountain.com/api/posts?", {text})
    .then(response => {
      this.setState({posts: response.data})
    })
    .catch(error => {
      this.setState({errorMess: error.message})
    })
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          
        {
          posts.map(element => (
              <Post key={element.id}
                    text={element.text}
                    date={element.date}
                    id={element.id}
                    updatePostFn={this.updatePost}
                    deletePostFn={this.deletePost} />
          ))
        }
        </section>
      </div>
    );
  }
}

export default App;
