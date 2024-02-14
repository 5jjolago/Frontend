import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

import Main from './pages/Main';
import BookmarkPage from './pages/bookmark.jsx';
import Login from './pages/Login.jsx';
import SignUp from './pages/SignUp.jsx';
import { CognitoProvider } from './context/CognitoProvider.jsx';

const App = () => {
  return (
    <Router> 
      <CognitoProvider>
        <div className='w-screen h-screen'>
          <Routes> 
            <Route exact path="/" element={<Main />} /> 
            <Route path="/bookmark" element={<BookmarkPage />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            {/* <Route path="/login" element={<SignUpIn />} />  */}
          </Routes>
          <div style={{position:"absolute", top:"25px", left:"500px", display:"flex"}}>
            <p>Please <Link to="/login">Login</Link> or <Link to="/signup">Sign Up</Link></p>
          </div>
        </div>
      </CognitoProvider>
    </Router>
  );
};

export default App;
