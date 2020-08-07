import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Spinner from './spinner';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import grabity from 'grabity';

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
