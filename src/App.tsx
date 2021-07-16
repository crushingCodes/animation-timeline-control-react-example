import React from 'react';
import './App.css';
import ReactTimeline from './components/ReactTimeline/ReactTimeline';
import {rows} from './testData';

function App() {
    return (
        <div className="App">
            <ReactTimeline rows={rows}></ReactTimeline>
        </div>
    );
}

export default App;
