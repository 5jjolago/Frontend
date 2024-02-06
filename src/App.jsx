import React from 'react';
import LifestyleBox from './components/LifestyleBox';
import Main from './pages/Main';
import Mid from './pages/Mid';
import './styles.js';
import { GlobalStyle } from './styles.js';
const App = () => {
  return (
    <div className='w-screen h-screen'>
      <GlobalStyle/>
      <Main></Main>
    </div>
  );
};

export default App;