
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import MoreCard from './components/more/MoreCard';

import './App.css';

function App() {

  return(
    <BrowserRouter>    
    <Navbar />  
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/more" element={<MoreCard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
