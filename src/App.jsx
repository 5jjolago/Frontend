import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import Main from './pages/Main';
import BookmarkPage from './pages/bookmark.jsx';
import SignUpIn from './pages/SignUpIn.jsx';

const App = () => {
  return (
    <Router> 
      <div className='w-screen h-screen'>
        <Routes> 
          <Route exact path="/" element={<Main />} /> 
          <Route path="/bookmark" element={<BookmarkPage />} /> 
          <Route path="/login" element={<SignUpIn />} /> 
        </Routes>
      </div>
    </Router>
  );
};

export default App;
