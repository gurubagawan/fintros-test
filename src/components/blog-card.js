import React, { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
// import grabity from 'grabity';
// import { Container, Row, Col } from 'reactstrap';
import Spinner from './spinner';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import { purple } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import grabity from 'grabity';
// import grabFunction from './grabbity';

const grabFunction = async (url) => {
  try {
    let metaData = await grabity.grabIt('');
    console.log(metaData);
  } catch (error) {
    console.log(error);
  }
};

// import { getLinkPreview } from 'link-preview-js';

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

const BlogItem = ({ itemID, mainPost }) => {
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState({});
  const [postMeta, setMeta] = useState({});

  useEffect(() => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((result) => {
        setLoaded(true);
        setPost(result);
        // console.log(result);
      });
  }, []);
  if (!loaded) return <Spinner />;
  (async () => {
    try {
      let metaData = await grabity.grabIt(post.url);
      setMeta(metaData);
    } catch (error) {
      console.error(error);
    }
  })();
  return (
    <Col
      style={{ marginBottom: 30 }}
      xs={12}
      sm={mainPost ? 12 : 6}
      md={mainPost ? 12 : 4}
    >
      <a href={post.url} style={{ textDecoration: 'none' }}>
        <Box
          style={{ padding: 10, height: `100%`, borderRadius: 5 }}
          bgcolor="primary.card"
          color="primary.main"
          overflow="hidden"
        >
          {postMeta.image && (
            <CardMedia
              style={{
                height: mainPost ? 300 : 150,
                marginLeft: -10,
                marginRight: -10,
                marginTop: -10,
              }}
              image={postMeta.image}
              title="Paella dish"
              height="150"
            />
          )}
          <div style={{ paddingTop: 10 }} className="card-text">
            <Box
              bgcolor="primary.tag"
              color="primary.tagText"
              style={{
                padding: 2.5,
                maxWidth: 50,
                marginBottom: 10,
                fontSize: 12.5,
              }}
            >
              {post.type}
            </Box>
            <div style={{ fontSize: 20, fontWeight: 500 }}>{post.title}</div>
            <div>{post.text}</div>
          </div>
        </Box>
      </a>
    </Col>
  );
};

export default BlogItem;
