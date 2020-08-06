import React, { useState, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import { Container } from 'react-bootstrap';

const BlogHeader = ({ changeTheme, isDark }) => {
  return (
    <Box
      style={{
        height: 325,
        fontFamily: 'DM Sans, sans-serif',
        flexDirection: 'column',
        display: 'flex',
        justifyContent: 'center ',
        alignItems: 'center',
        paddingBottom: 30,
        paddingTop: 30,
      }}
      color="primary.titleColor"
      bgcolor="primary.card"
    >
      <Container>
        <FormGroup style={{ float: 'right' }}>
          <FormControlLabel
            control={
              <Switch
                checked={isDark}
                onChange={changeTheme}
                name="lightSwitch"
              />
            }
            label="Dark theme"
          />
        </FormGroup>
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
      </Container>
    </Box>
  );
};

export default BlogHeader;
