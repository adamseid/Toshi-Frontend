import logo from './logo.svg';
import './App.css';
import Test from './components/Test'
import Overview from './components/Overview';
import Profile from './components/Profile';
import Mobile from './components/Mobile';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {

  return (
      <Router>
        <Routes>
          <Route exact path='/' element={<Overview />} />
          <Route exact path='/profile' element={<Profile />}/>
          <Route exact path='/mobile' element={<Mobile />}/>
        </Routes>
      </Router>
  );
}

export default App;
