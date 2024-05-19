import React, {  useState } from 'react';
import './Envelope.css';
import { MDBBtn, MDBTextArea } from "mdb-react-ui-kit";
import Button from './Button';

const Envelope = () => {
  const [isFlapOpen, setIsFlapOpen] = useState(false);
  const [mailText, setMailText] = useState("");
  const [predictResult, setPredictResult] = useState('');

  const handleEnvelopeClick = () => {
    setIsFlapOpen(!isFlapOpen);
  };

  const handleTextAreaChange = (e) => {
    setMailText(e.target.value);
  };

  const closeDialog = () => {
    setPredictResult('');
    setMailText('');
  }

  return (
    <div className={`envelope-wrapper ${isFlapOpen ? 'flap' : ''}`}>
      <div className="envelope">
        <div className="letter">
          <div className="text">
            <div className='textarea'>
                <MDBTextArea label="Message" id="textAreaExample" rows="{6}" onChange={handleTextAreaChange} value={mailText}/>
                <Button handleEnvelopeClick={handleEnvelopeClick} setPredictResult={setPredictResult} mailText={mailText}/>
            </div>
          </div>
        </div>
        {predictResult !== '' && 
          <div className='result-dialog'>
            <div className='result'>
              <p style={{fontSize: '1.2rem'}}>Your email with content: </p>
              <p style={{fontStyle: 'italic', fontSize: '1rem'}}>"{mailText}" </p>
              <h2 className={predictResult === 'Spam' ? 'spam' : 'not-spam'}>
                Is {predictResult}
              </h2>
              <MDBBtn color='danger' onClick={closeDialog} >
                close
              </MDBBtn>
            </div>
          </div>
        }
      </div>
      <div className="heart" onClick={handleEnvelopeClick}></div>
    </div>
  );
};

export default Envelope;
