
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import More from './components/More';

import './App.css';

function App() {

  return(
    <BrowserRouter>    
    <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<More />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
