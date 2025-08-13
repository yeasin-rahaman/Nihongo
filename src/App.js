import logo from './logo.svg';
import './App.css';
import Katakana from './Pages/Katakana';
import Hiragana from './Pages/Hirahana';
import Vocavolary1 from './Pages/Vocavolary1';

function App() {
  return (


    //  <Router>


    //       <Routes>
    //         <Route path="/home" element={<Home />} />
    //         <Route path="/" element={<Home />} />
    //         <Route path="/katakana" element={<Katakana />} />
    //         <Route path="/hiragana" element={<Hiragana />} />

    //       </Routes>

    //     </Router>

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
            <h1>Vocavolary</h1>
            <Vocavolary1></Vocavolary1>
          </div>
        </div>

      </div>
    </div >
  );
}

export default App;
