import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
// import grabity from 'grabity';
// import { Container, Row, Col } from 'reactstrap';
import Spinner from './spinner';
import Box from '@material-ui/core/Box';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';

import { getLinkPreview } from 'link-preview-js';

// const theme = createMuiTheme({
//   palette: {
//     primary: {
//       // Purple and green play nicely together.
//       main: purple[500],
//     },
//     secondary: {
//       // This is green.A700 as hex.
//       main: '#11cb5f',
//     },
//   },
// });

// let grabity = require('grabity');

// (async () => {
//   let it = await grabity.grabIt(
//     'https://hacker-news.firebaseio.com/v0/item/24061224.json?print=pretty'
//   );

//   console.log(it);
// })();

const BlogItem = ({ itemID }) => {
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    // (async () => {
    //   let it = await grabity.grab(
    //     `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
    //   );

    //   console.log(it);
    // })();
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
        setPost(result);
      });
  }, []);
  if (!loaded) return <Spinner />;
  return (
    <Col style={{ marginBottom: 10 }} xs={12} sm={6} md={4}>
      {/* <ThemeProvider theme={theme}> */}
      <Box
        style={{ padding: 10, height: `100%` }}
        bgcolor="primary.background"
        color="primary.main"
      >
        <div>{post.title}</div>
        <div>{post.text}</div>
      </Box>
      {/* </ThemeProvider> */}
    </Col>
  );
};

export default BlogItem;
