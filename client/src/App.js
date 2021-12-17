import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import LandingPage from './components/LandingPage'; 
import Home from './components/Home';

function App() {
 
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
       <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
