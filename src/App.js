import logo from './logo.svg';
import './App.css';
import Katakana from './Pages/Katakana';
import Hiragana from './Pages/Hirahana';
import Vocavolary1 from './Pages/Vocavolary1';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lession10Vocavolary from './Pages/Lession10Vocavolary';
import Home from './Pages/Home';
import Lession14Vocab from './Pages/Lession14Vocab';
function App() {
  return (


    <>
      <Router>


        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/katakana" element={<Katakana />} />
          <Route path="/hiragana" element={<Hiragana />} />
          <Route path="/v10" element={<Lession10Vocavolary />} />
          <Route path="/v1" element={<Vocavolary1 />} />
          <Route path="/v14" element={<Lession14Vocab />} />

        </Routes>

      </Router>

      <div className="App">

      </div ></>
  );
}

export default App;
