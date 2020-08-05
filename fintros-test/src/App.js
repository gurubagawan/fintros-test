import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import { AppBar } from '@material-ui/core';
import BlogItem from './components/blog-card';
import { Row, Container } from 'react-bootstrap';
import Spinner from './components/spinner';
import { TextField } from '@material-ui/core';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#212121',
      background: '#F0F0F0',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

function App() {
  const [postIDs, setIDs] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let loadposts = [];
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        // setIDs(result);
        // setLoaded(true);
        result.map((id, i) => {
          fetch(
            `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
          )
            .then((res) => res.json())
            .then((answer) => {
              // console.log(answer);
              loadposts.push(answer);
              // console.log(loadposts);
              setPosts(loadposts);
              setLoaded(true);
              // console.log(posts);
            });
        });
      });
    // return () => {
    //   cleanup;
    // };
  }, []);

  useBottomScrollListener(() => setPage(page + 1));

  console.log(posts[0]);

  const displayPosts = posts.map((post, i) => {
    console.log(post);
    if (i < 30 * page) return <BlogItem post={post} />;
  });
  if (!loaded) return <Spinner />;
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar>
            {' '}
            <TextField color="#FFFFFF" /> Blog posts
          </AppBar>
          <Row>{displayPosts}</Row>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default App;
