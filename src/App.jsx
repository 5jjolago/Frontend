import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import awsconfig from "./aws-exports";
import '@aws-amplify/ui-react/styles.css';

import Main from './pages/Main';
import BookmarkPage from './pages/bookmark.jsx';
import SignUpIn from './pages/SignUpIn.jsx';

const App = () => {
  return (

    <Router> 
      <div className='w-screen h-screen'>
      <Authenticator variation="modal">
      {({ signOut, user }) => (
        <main>
        <Routes> 
          <Route exact path="/" element={<Main />} /> 
          <Route path="/bookmark" element={<BookmarkPage />} /> 
          {/* <Route path="/login" element={<SignUpIn />} />  */}
          
        </Routes>
        <div style={{position:"absolute", top:"25px", left:"500px", display:"flex"}}>
        <Link to="/bookmark" style={{backgroundColor:"pink", fontSize:"20px"}}>{user.username}님의 마이페이지</Link>
        <button onClick={signOut} style={{backgroundColor:"yellow", fontSize:"20px"}}>로그아웃</button>
        </div>
      </main>
              )}
        </Authenticator>
      </div>
    </Router>
  );
};

export default App;
