import React, { useState, useEffect } from 'react';

const BlogItem = ({ itemID }) => {
  const [loaded, setLoaded] = useState(false);
  const [post, setPost] = useState({});

  useEffect(() => {
    fetch(
      `https://hacker-news.firebaseio.com/v0/item/${itemID}.json?print=pretty`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoaded(true);
        setPost(result);
      });
  }, {});
  console.log(itemID, post);
  return <div>{post.title}</div>;
};

export default BlogItem;
