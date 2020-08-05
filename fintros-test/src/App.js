import React from 'react';
import logo from './logo.svg';
import './App.css';
import BlogItem from './components/blog-card';

function App() {
  return (
    <div className="App">
      <BlogItem itemID={8863} />
    </div>
  );
}

export default App;
