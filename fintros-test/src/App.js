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
  const [loaded, setLoaded] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
      .then((res) => res.json())
      .then((result) => {
        // console.log(result);
        setIDs(result);
        setLoaded(true);
      });
    // return () => {
    //   cleanup;
    // };
  }, []);

  useBottomScrollListener(() => setPage(page + 1));

  const displayPosts = postIDs.map((id, i) => {
    if (i < 30 * page) return <BlogItem key={i} itemID={id} />;
  });
  if (!loaded) return <Spinner />;
  return (
    <Container>
      <ThemeProvider theme={theme}>
        <div className="App">
          <AppBar> Blog posts</AppBar>
          <Row>{displayPosts}</Row>
        </div>
      </ThemeProvider>
    </Container>
  );
}

export default App;
