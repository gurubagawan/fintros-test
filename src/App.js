import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import BlogItem from './components/blog-card';
import { Row, Container } from 'react-bootstrap';
import Box from '@material-ui/core/Box';
import Spinner from './components/spinner';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import BlogHeader from './components/header';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#212121',
      background: '#f4f1ee',
      card: '#FFFFFF',
      titleColor: '#21313C',
      tag: '#212121',
      tagText: '#FFFFFF',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#FFFFFF',
      background: '#192428',
      card: '#2d383c',
      titleColor: '#f4f1ee',
      tag: '#192428',
      tagText: '#FFFFFF',
    },
    secondary: {
      main: '#11cb5f',
    },
  },
});

function App() {
  const [postIDs, setIDs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [isDark, setTheme] = useState(false);
  const [page, setPage] = useState(1);
  const [postView, setView] = useState(0);
  useEffect(() => {
    fetch('https://hacker-news.firebaseio.com/v0/jobstories.json?print=pretty')
      .then((res) => res.json())
      .then((result) => {
        setIDs(result);
        setLoaded(true);
      });
  }, []);

  useBottomScrollListener(() => setPage(page + 1));

  const displayAllPosts = postIDs.map((id, i) => {
    if (i == 0) return <BlogItem key={i} itemID={id} mainPost={true} />;
    else if (i < 30 * page) return <BlogItem key={i} itemID={id} />;
  });

  const displayOddPosts = postIDs.map((id, i) => {
    if (i == 0) return <BlogItem key={i} itemID={id} mainPost={true} />;
    else if (i < 60 * page && i % 2 === 1)
      return <BlogItem key={i} itemID={id} />;
  });

  const displayEvenPosts = postIDs.map((id, i) => {
    if (i == 0) return <BlogItem key={i} itemID={id} mainPost={true} />;
    else if (i < 60 * page && i % 2 === 0)
      return <BlogItem key={i} itemID={id} />;
  });

  const displayPosts = () => {
    if (postView === 0) return displayAllPosts;
    else if (postView === 1) return displayOddPosts;
    else if (postView === 2) return displayEvenPosts;
  };

  if (!loaded) return <Spinner />;
  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <BlogHeader changeTheme={() => setTheme(!isDark)} isDark={isDark} />
      <Box style={{ paddingTop: 50 }} bgcolor="primary.background">
        <Container>
          <FormControl
            variant="filled"
            style={{ marginBottom: 25, width: 100 }}
            color="primary.main"
          >
            <InputLabel color="primary.main" id="demo-simple-select-label">
              Post View
            </InputLabel>
            <Select
              color="primary.main"
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={postView}
              onChange={(e) => setView(e.target.value)}
            >
              <MenuItem value={0}>All</MenuItem>
              <MenuItem value={1}>Even</MenuItem>
              <MenuItem value={2}>Odd</MenuItem>
            </Select>
          </FormControl>
          <div className="App">
            <Row>{displayPosts()}</Row>
          </div>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App;
