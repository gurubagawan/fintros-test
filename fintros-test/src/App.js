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
import Box from '@material-ui/core/Box';
import Spinner from './components/spinner';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import BlogHeader from './components/header';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#212121',
      background: '#f4f1ee',
      card: '#FFFFFF',
      titleColor: '#21313C',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#11cb5f',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#212121',
      background: '#21313C',
      card: '#FFFFFF',
      titleColor: '#f4f1ee',
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
    if (i == 0) return <BlogItem key={i} itemID={id} mainPost={true} />;
    else if (i < 30 * page) return <BlogItem key={i} itemID={id} />;
  });
  if (!loaded) return <Spinner />;
  return (
    <ThemeProvider theme={darkTheme}>
      <BlogHeader />
      <Box bgcolor="primary.background">
        <Container>
          <div className="App">
            <Row>{displayPosts}</Row>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
