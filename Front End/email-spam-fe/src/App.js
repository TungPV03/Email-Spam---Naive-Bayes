import React, { useEffect, useState } from 'react';
import './App.css';
import Envelope from './Envelope';
import axios from 'axios';

function App() {
  const [metrics, setMetrics] = useState({
    accuracy: 0,
    precision: 0,
    recall: 0,
    f1_score: 0
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:5000/metrics");
        const data = res.data;
        setMetrics({
          accuracy: (data.accuracy * 100).toFixed(2),
          precision: (data.precision * 100).toFixed(2),
          recall: (data.recall * 100).toFixed(2),
          f1_score: (data.f1_score * 100).toFixed(2)
        });
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);
  return (
    <div className="app" id="app">
      <div className='accuray'>
        <p>The accuracy of model: <span style={{color: "#04AA6D", display: "inline-block"}}>{metrics.accuracy}%</span></p>
        <p>The precision of model: <span style={{color: "#04AA6D", display: "inline-block"}}>{metrics.precision}%</span></p>
        <p>The recall of model: <span style={{color: "#04AA6D", display: "inline-block"}}>{metrics.recall}%</span></p>
        <p>The f1-score of model: <span style={{color: "#04AA6D", display: "inline-block"}}>{metrics.f1_score}%</span></p>
      </div>
      <Envelope/>
    </div>
  );
}

export default App;
