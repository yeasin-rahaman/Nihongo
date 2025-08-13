import React from 'react';
import { Link } from 'react-router-dom';
import Katakana from './Katakana';
import Hiragana from './Hirahana';
import Vocavolary1 from './Vocavolary1';


const Home = () => {
    return (

        <div className="App">


            {/* Navigation Buttons */}
            {/* <div className="d-flex justify-content-center gap-3 my-4">
                <Link to="/katakana" className="btn btn-primary btn-lg">Katakana</Link>
                <Link to="/hiragana" className="btn btn-success btn-lg">Hiragana</Link>
            </div> */}

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
        </div>
    );
};

export default Home;