import logo from './logo.svg';
import './App.css';
import Katakana from './Pages/Katakana';
import Hiragana from './Pages/Hirahana';

function App() {
  return (
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
        </div>

      </div>
    </div >
  );
}

export default App;
