import {MDBBtn} from "mdb-react-ui-kit";
import { createPortal } from 'react-dom';
import Loading from "./Loading";
import { useState } from "react";
 
const Button = ({handleEnvelopeClick,setPredictResult, mailText}) =>{
    const [isPredicting, setIsPredicting] = useState(false);
    const app = document.getElementById('app');

    const handleSubmit = () => {
        setIsPredicting(true);
        setTimeout(() => {
            fetch('http://127.0.0.1:5000/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: mailText }) 
            })
            .then(response => response.json())
            .then(data => {
                // Xử lý kết quả trả về từ server
                setPredictResult(data.prediction);
                console.log(data);
                setIsPredicting(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setIsPredicting(false);
            });
        }, 2000);
        handleEnvelopeClick();
    }

    const handleCloseDialog = () => {
        setIsPredicting(false)
    }
    return app && createPortal(
        <div className="btn-wrapper">
            <MDBBtn className='me-1' color='success' onClick={handleSubmit}>
                send
            </MDBBtn>
            {isPredicting && (
                <div className="dialog show">
                    <Loading />
                    <MDBBtn className='me-1 close-btn' color='danger' onClick={handleCloseDialog}>
                        Close
                    </MDBBtn>
                </div>
            )}
        </div>, app
    )
}

export default Button;
