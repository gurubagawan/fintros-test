import React, { useState, useEffect } from 'react';
import { Col } from 'react-bootstrap';
import Spinner from './spinner';
import Box from '@material-ui/core/Box';
import CardMedia from '@material-ui/core/CardMedia';
import grabity from 'grabity';
import styled from 'styled-components';

const TypeBox = styled.div`
  padding: 2.5px;
  max-width: 50px;
  margin-bottom: 10px;
  font-size: 12.5px;
`;

const TitleBox = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

const MediaBox = styled.div`
  height: ${(props) => (props.mainPost ? '300px' : '150px')};
  margin-left: -10px;
  margin-right: -10px;
  margin-top: -10px;
`;

const LinkTag = styled.a`
  text-decoration: none;
`;

const TextBox = styled.div`
  padding-top: 10px;
`;

const BlogBox = styled.div`
  padding: 10px;
  height: 100%;
`;

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
      <LinkTag href={post.url}>
        <Box
          bgcolor="primary.card"
          color="primary.main"
          style={{ height: '100%' }}
          overflow="hidden"
        >
          <BlogBox>
            {postMeta.image && (
              <MediaBox>
                <CardMedia image={postMeta.image} />
              </MediaBox>
            )}
            <TextBox>
              <TypeBox>
                <Box bgcolor="primary.tag" color="primary.tagText">
                  {post.type}
                </Box>
              </TypeBox>
              <TitleBox>{post.title}</TitleBox>
              <div>{post.text}</div>
            </TextBox>
          </BlogBox>
        </Box>
      </LinkTag>
    </Col>
  );
};

export default BlogItem;
