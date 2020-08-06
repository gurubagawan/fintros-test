import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';

const BlogHeader = () => {
  return (
    <Box
      style={{
        height: 400,
        fontFamily: 'DM Sans, sans-serif',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center ',
        alignItems: 'center',
      }}
      color="primary.titleColor"
      bgcolor="primary.card"
    >
      <div
        style={{
          fontSize: 88,
          fontWeight: 700,
        }}
      >
        Hacker News
      </div>
      <div
        style={{
          fontSize: 18,
          fontWeight: 400,
        }}
      >
        The Hacker Blog
      </div>
    </Box>
  );
};

export default BlogHeader;
