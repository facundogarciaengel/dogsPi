import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import LandingPage from './components/LandingPage'; 
import Home from './components/Home';
import DogsCreated from './components/DogsCreated';
import Detail from './components/Detail'; 

function App() {
 
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
       <Route exact path='/' element={<LandingPage/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/dog' element={<DogsCreated/>}/>
          <Route exact path='/home/:id' element={<Detail/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
