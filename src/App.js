import logo from './logo.svg';
import './App.css';
import Katakana from './Pages/Katakana';
import Hiragana from './Pages/Hirahana';
import Vocavolary1 from './Pages/Vocavolary1';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Lession10Vocavolary from './Pages/Lession10Vocavolary';
function App() {
  return (


    <>
      <Router>


        <Routes>
          {/* <Route path="/home" element={<Home />} />
          <Route path="/" element={<Home />} /> */}
          <Route path="/katakana" element={<Katakana />} />
          <Route path="/hiragana" element={<Hiragana />} />
          <Route path="/v10" element={<Lession10Vocavolary />} />

        </Routes>

      </Router>

      <div className="App">
        <div className="row container text-center">

          <div className='col-12 my-5'>
            <div> <h1>Katakana</h1>
              <Katakana></Katakana></div>
          </div>
          <div className='col-12 my-5'>
            <div>
              <h1>Hiragana</h1>
              <Hiragana></Hiragana>
            </div>
            <div>
              <h1>Vocabulary </h1>
              <Vocavolary1></Vocavolary1>
            </div>
          </div>

        </div>
      </div ></>
  );
}

export default App;
