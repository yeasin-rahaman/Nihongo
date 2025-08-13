import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (

        <div className="App">
            <h1 className="my-4">Japanese Characters</h1>

            {/* Navigation Buttons */}
            <div className="d-flex justify-content-center gap-3 my-4">
                <Link to="/katakana" className="btn btn-primary btn-lg">Katakana</Link>
                <Link to="/hiragana" className="btn btn-success btn-lg">Hiragana</Link>
            </div>
        </div>
    );
};

export default Home;