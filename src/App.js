import logo from './logo.svg';
import './App.css';
import Test from './components/Test'
import Overview from './components/Overview';
import Profile from './components/Profile';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'


function App() {
  return (
      <Router>
        <Routes>
          <Route exact path='/overview' element={<Overview />} />
          <Route exact path='/profile' element={<Profile />}/>
        </Routes>
      </Router>
  );
}

export default App;
